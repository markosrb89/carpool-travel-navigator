import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Dialog, DialogContent } from "@/components/ui/dialog";

// Fix for default marker icons in React Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface RouteMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  startPoint: { lat: number; lng: number; name: string };
  endPoint: { lat: number; lng: number; name: string };
}

// Component to handle route drawing
function RouteLayer({ startPoint, endPoint }: { startPoint: { lat: number; lng: number }; endPoint: { lat: number; lng: number } }) {
  const map = useMap();
  const [routeGeometry, setRouteGeometry] = useState<[number, number][]>([]);

  useEffect(() => {
    if (!map) return;

    const fetchRoute = async () => {
      try {
        // Using OSRM demo server - for production, you should use your own OSRM server or a commercial service
        const response = await fetch(
          `https://router.project-osrm.org/route/v1/driving/${startPoint.lng},${startPoint.lat};${endPoint.lng},${endPoint.lat}?overview=full&geometries=geojson`
        );
        const data = await response.json();
        
        if (data.routes && data.routes[0]) {
          const coordinates = data.routes[0].geometry.coordinates.map(
            (coord: [number, number]) => [coord[1], coord[0]] as [number, number]
          );
          setRouteGeometry(coordinates);

          // Create a polyline with the route geometry
          const routeLine = L.polyline(coordinates, { 
            color: '#3b82f6', 
            weight: 4,
            opacity: 0.8,
            lineCap: 'round',
            lineJoin: 'round'
          });

          routeLine.addTo(map);

          // Fit bounds to show the entire route
          const bounds = L.latLngBounds(coordinates);
          map.fitBounds(bounds, { padding: [50, 50] });

          return () => {
            map.removeLayer(routeLine);
          };
        }
      } catch (error) {
        console.error('Error fetching route:', error);
        // Fallback to straight line if route fetching fails
        const routeLine = L.polyline([
          [startPoint.lat, startPoint.lng],
          [endPoint.lat, endPoint.lng]
        ], { color: '#3b82f6', weight: 4 });

        routeLine.addTo(map);
        
        const bounds = L.latLngBounds([
          [startPoint.lat, startPoint.lng],
          [endPoint.lat, endPoint.lng]
        ]);
        map.fitBounds(bounds, { padding: [50, 50] });

        return () => {
          map.removeLayer(routeLine);
        };
      }
    };

    fetchRoute();
  }, [map, startPoint, endPoint]);

  return null;
}

export function RouteMapModal({ isOpen, onClose, startPoint, endPoint }: RouteMapModalProps) {
  const center = {
    lat: (startPoint.lat + endPoint.lat) / 2,
    lng: (startPoint.lng + endPoint.lng) / 2,
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] h-[600px]">
        <div className="h-full w-full">
          <MapContainer
            center={[center.lat, center.lng]}
            zoom={13}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[startPoint.lat, startPoint.lng]}>
              <Popup>{startPoint.name}</Popup>
            </Marker>
            <Marker position={[endPoint.lat, endPoint.lng]}>
              <Popup>{endPoint.name}</Popup>
            </Marker>
            <RouteLayer startPoint={startPoint} endPoint={endPoint} />
          </MapContainer>
        </div>
      </DialogContent>
    </Dialog>
  );
} 
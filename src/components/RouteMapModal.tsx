import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// Custom marker icons
const startIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const endIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

interface RouteMapModalProps {
    isOpen: boolean;
    onClose: () => void;
    startPoint: { lat: number; lng: number; name: string };
    endPoint: { lat: number; lng: number; name: string };
}

// Component to handle route drawing
function RouteLayer({ startPoint, endPoint, onRouteData }: { 
    startPoint: { lat: number; lng: number }; 
    endPoint: { lat: number; lng: number };
    onRouteData: (duration: number, distance: number) => void;
}) {
    const map = useMap();
    const [routeGeometry, setRouteGeometry] = useState<[number, number][]>([]);

    useEffect(() => {
        if (!map) return;

        const fetchRoute = async () => {
            try {
                const response = await fetch(
                    `https://router.project-osrm.org/route/v1/driving/${startPoint.lng},${startPoint.lat};${endPoint.lng},${endPoint.lat}?overview=full&geometries=geojson`
                );
                const data = await response.json();

                if (data.routes && data.routes[0]) {
                    const coordinates = data.routes[0].geometry.coordinates.map(
                        (coord: [number, number]) => [coord[1], coord[0]] as [number, number]
                    );
                    setRouteGeometry(coordinates);

                    // Pass duration and distance to parent component
                    onRouteData(data.routes[0].duration, data.routes[0].distance);

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
    }, [map, startPoint, endPoint, onRouteData]);

    return null;
}

export function RouteMapModal({ isOpen, onClose, startPoint, endPoint }: RouteMapModalProps) {
    const center = {
        lat: (startPoint.lat + endPoint.lat) / 2,
        lng: (startPoint.lng + endPoint.lng) / 2,
    };
    const [estimatedDuration, setEstimatedDuration] = useState<number | null>(null);
    const [distance, setDistance] = useState<number | null>(null);

    const formatDuration = (seconds: number): string => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        
        if (hours > 0) {
            return `${hours} hr ${minutes} min`;
        }
        return `${minutes} min`;
    };

    const formatDistance = (meters: number): string => {
        const km = Math.round(meters / 100) / 10;
        return `${km} km`;
    };

    const handleRouteData = (duration: number, distance: number) => {
        setEstimatedDuration(duration);
        setDistance(distance);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[800px] h-[600px] flex flex-col">
                <div className="flex-1 w-full -z-10">
                    <MapContainer
                        center={[center.lat, center.lng]}
                        zoom={13}
                        style={{ height: '100%', width: '100%' }}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[startPoint.lat, startPoint.lng]} icon={startIcon}>
                            <Popup>
                                <strong>A:</strong> {startPoint.name}
                            </Popup>
                        </Marker>
                        <Marker position={[endPoint.lat, endPoint.lng]} icon={endIcon}>
                            <Popup>
                                <strong>B:</strong> {endPoint.name}
                            </Popup>
                        </Marker>
                        <RouteLayer startPoint={startPoint} endPoint={endPoint} onRouteData={handleRouteData} />
                    </MapContainer>
                </div>
                <div className="mt-4 space-y-1 text-sm">
                    <div className="flex items-center">
                        <span className="font-semibold mr-2">A:</span>
                        <span>{startPoint.name}</span>
                    </div>
                    <div className="flex items-center">
                        <span className="font-semibold mr-2">B:</span>
                        <span>{endPoint.name}</span>
                    </div>
                    {estimatedDuration !== null && distance !== null && (
                        <div className="space-y-1 mt-2">
                            <div className="flex items-center text-blue-600">
                                <span className="font-semibold mr-2">Estimated travel time:</span>
                                <span>{formatDuration(estimatedDuration)}</span>
                            </div>
                            <div className="text-xs text-gray-500">
                                Distance: {formatDistance(distance)}
                            </div>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
} 
import React from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import { LatLng } from 'leaflet';
import { LocationData } from './types';
import 'leaflet/dist/leaflet.css';
import './leaflet-icons';

interface LocationMapProps {
  center: [number, number];
  markerPosition: LocationData | null;
  onMarkerDrag: (position: { lat: number; lng: number }) => void;
  onMapCenter: (center: [number, number]) => void;
}

// Map event handler component
const MapEventHandler: React.FC<{
  onMarkerDrag: (position: { lat: number; lng: number }) => void;
  onMapCenter: (center: [number, number]) => void;
}> = ({ onMarkerDrag, onMapCenter }) => {
  useMapEvents({
    click(e) {
      const position = { lat: e.latlng.lat, lng: e.latlng.lng };
      onMarkerDrag(position);
      onMapCenter([position.lat, position.lng]);
    },
  });
  return null;
};

// Map center handler component
const MapCenterHandler: React.FC<{
  center: [number, number];
}> = ({ center }) => {
  const map = useMap();
  React.useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
};

const LocationMap: React.FC<LocationMapProps> = ({
  center,
  markerPosition,
  onMarkerDrag,
  onMapCenter,
}) => {
  return (
    <div className="h-[300px] w-full rounded-lg overflow-hidden mt-2">
      <MapContainer
        center={center}
        zoom={13}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapEventHandler onMarkerDrag={onMarkerDrag} onMapCenter={onMapCenter} />
        <MapCenterHandler center={center} />
        {markerPosition && (
          <Marker
            position={new LatLng(markerPosition.lat, markerPosition.lng)}
            draggable={true}
            eventHandlers={{
              dragend: (e) => {
                const marker = e.target;
                const position = marker.getLatLng();
                onMarkerDrag({ lat: position.lat, lng: position.lng });
                onMapCenter([position.lat, position.lng]);
              },
            }}
          />
        )}
      </MapContainer>
    </div>
  );
};

export default LocationMap; 
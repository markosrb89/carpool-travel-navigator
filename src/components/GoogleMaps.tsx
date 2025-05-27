import React, { useCallback, useEffect, useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
  borderRadius: "1rem",
};

const center = {
  lat: 40.712776, // Example: New York
  lng: -74.005974,
};

type Coordinates = {
  lat: number;
  lng: number;
  label?: string;
};

type GoogleMapComponentProps = {
  markers?: Coordinates[];
  showRoute?: boolean;
  origin?: Coordinates;
  destination?: Coordinates;
};

const GoogleMapComponent: React.FC<GoogleMapComponentProps> = ({
  markers,
  showRoute = false,
  origin,
  destination,
}) => {
  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string,
    libraries: ["places"],
  });

  const onMapLoad = useCallback((map: google.maps.Map) => {
    setMapInstance(map);
  }, []);

  useEffect(() => {
    if (isLoaded && showRoute && origin && destination && mapInstance) {
      const directionsService = new google.maps.DirectionsService();

      directionsService.route(
        {
          origin: { lat: origin.lat, lng: origin.lng },
          destination: { lat: destination.lat, lng: destination.lng },
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            setDirections(result);

            // Fit the map to the route
            if (result && result.routes[0] && mapInstance) {
              const bounds = new google.maps.LatLngBounds();
              result.routes[0].legs.forEach((leg) => {
                leg.steps.forEach((step) => {
                  step.path.forEach((point) => {
                    bounds.extend(point);
                  });
                });
              });
              mapInstance.fitBounds(bounds);
            }
          } else {
            console.error(`Directions request failed due to ${status}`);
          }
        }
      );
    }
  }, [isLoaded, showRoute, origin, destination, mapInstance]);

  if (loadError)
    return <div className="text-red-500">Map cannot be loaded</div>;
  if (!isLoaded)
    return <div className="animate-pulse text-gray-500">Loading map...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={12}
      onLoad={onMapLoad}
      options={{
        disableDefaultUI: false,
        zoomControl: true,
        styles: [], // You can customize the map style here
      }}>
      {!directions &&
        markers &&
        markers.map((marker, idx) => (
          <Marker
            key={idx}
            position={{ lat: marker.lat, lng: marker.lng }}
            label={marker.label}
          />
        ))}
      {directions && <DirectionsRenderer directions={directions} />}
    </GoogleMap>
  );
};

export default React.memo(GoogleMapComponent);

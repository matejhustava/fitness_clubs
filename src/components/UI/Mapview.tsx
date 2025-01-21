import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { GeoLocation } from "../../data/GeoLocation";

export default function Mapview(props: { markers: MapMarker[], center: GeoLocation, zoom: number }) {
  return (
    <MapContainer center={[props.center.latitude, props.center.longitude]} zoom={props.zoom} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {props.markers.map((marker) => (
        <Marker key={marker.id} position={[marker.geolocation.latitude, marker.geolocation.longitude]}>
          <Popup>{marker.text}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export interface MapMarker {
  id: number;
  text: string;
  geolocation: GeoLocation;
}
import { GeoLocation } from './GeoLocation';

export interface Club {
  id: number;
  name: string;
  listName: string;
  address: Address;
  geoLocation: GeoLocation;
}

interface Address {
  address1: string;
  address2: string;
  city: string;
  country: string;
  postalCode: string;
}

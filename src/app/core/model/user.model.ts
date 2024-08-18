interface Address {
  addressLocation: string;
}

export interface UserData {
  name: string;
  phone: string;
  email: string;
  longitude: string;
  latitude: string;
  address: Address[];
}

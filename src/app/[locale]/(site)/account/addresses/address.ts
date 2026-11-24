export const ADDRESSES_PATH = "/account/addresses"; // adjust to your route
export const ADDRESSES_API = "/api/address";

export interface Address {
  id: string;
  city: string;
  street: string;
  isDefault: boolean;
}

export type FormState = {
  error?: string;
  // returned on error so React 19's automatic form reset doesn't wipe the input
  values?: {
    city: string;
    street: string;
    isDefault: boolean;
  };
};
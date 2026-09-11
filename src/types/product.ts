type BaseProduct = {
 id: string;
  productType: "scooter" | "accessory" | "parts";
  name: string;
  price: string;
  oldPrice?: string;
  discount?: string;
  year?: string;
  installment?: string;
  imagePath: { mobile: string; desktop: string };
  images: string;
  imageLabel?: string;
  // Filter fields
  brand?: string;
  enginePower?: string;
  releaseDate?: string;
  chargingTime?: string;
  weight?: string;
  category?: string;
  size?: string;
  gender?: string;
};

export type ScooterProduct = BaseProduct & {
  productType: "scooter";
  year: string;
  installment: string;
};

export type AccessoryProduct = BaseProduct & {
  productType: "accessory";
};

export type PartsProduct = BaseProduct & {
  productType: "parts";
  partType:string;
};

export type Product = ScooterProduct | AccessoryProduct | PartsProduct;

export type AccessoryCategory =
  | "SAFETY_GEAR"
  | "PROTECTION_MAINTENANCE"
  | "STORAGE_CARRYING"
  | "LIGHTING"
  | "COMFORT_UPGRADES"
  | "CHARGING_POWER"
  | "SPARE_PARTS";

export type Gender = "MEN" | "WOMEN" | "UNISEX";

export type SparePartCategory =
  | "BRAKE_PADS"
  | "TIRES_TUBES"
  | "MOTOR_PARTS"
  | "BATTERY_CELLS"
  | "WHEELS"
  | "BEARINGS"
  | "CABLES_WIRING"
  | "CONTROLLER"
  | "DISPLAY_PANEL"
  | "SUSPENSION_PARTS"
  | "SCREWS_BOLTS"
  | "OTHER";

export type ProductType = "scooter" | "accessory" | "parts";

export interface Scooter {
  id: string;
  name: string;
  brand: string;
  price: string; // Decimal serialized as string; use `number` if backend converts it

  // Specs
  engine: string;
  maxSpeed: number;
  maxRange: number;
  weight: number;
  releaseDate: string; // ISO date string
  warranty: string;
  inclineAngle: string;
  chargingTime: string;
  maxRiderWeight: number;
  recommendedRiderWeight: number;
  motorCount: number;
  wheelSize: string;
  driveType: string;
  battery: string;
  suspension: string;
  antiSlipSystem: boolean;
  brakeType: string;
  connectivity: string;
  ipRating: string;

  stock: number;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Accessory {
  id: string;
  name: string;
  brand: string;
  size?: string | null;
  sex: Gender;
  category: AccessoryCategory;
  price: string;
  description?: string | null;
  stock: number;
  images: string[];
  compatibleWith: string[];
  createdAt: string;
}

export interface SparePart {
  id: string;
  name: string;
  sku: string;
  category: SparePartCategory;
  price: string;
  description?: string | null;
  stock: number;
  images: string[];
  compatibleModels?: Pick<Scooter, "id" | "name">[];
  material?: string | null;
  weight?: number | null;
  color?: string | null;
  manufacturer?: string | null;
  createdAt: string;
  updatedAt: string;
}

interface BaseCardFields {
  imagePath: { mobile: string; desktop: string };
  imageLabel?: string;
  oldPrice?: string;
  discount?: string;
  installment?: string;
}

export interface ScooterCardProduct
  extends
    BaseCardFields,
    Pick<
      Scooter,
      | "id"
      | "name"
      | "brand"
      | "price"
      | "images"
      | "releaseDate"
      | "weight"
      | "chargingTime"
      | "driveType"
      | "antiSlipSystem"
      | "engine"
      | "maxSpeed"
      | "maxRange"
      | "warranty"
    > {
  productType: "scooter";
}

export interface AccessoryCardProduct
  extends
    BaseCardFields,
    Pick<
      Accessory,
      "id" | "name" | "brand" | "price" | "images" | "category" | "size" | "sex"
    > {
  productType: "accessory";
}

export interface PartsCardProduct
  extends
    BaseCardFields,
    Pick<SparePart, "id" | "name" | "price" | "images" | "category"> {
  productType: "parts";
}

// Discriminated union — must stay `type`, interfaces can't express `|`
export type Product =
  | ScooterCardProduct
  | AccessoryCardProduct
  | PartsCardProduct;

export interface ProductUnits {
  w: string;
  kmH: string;
  y: string;
  km:string;
  kg: string;
}

// type BaseProduct = {
//  id: string;
//   productType: "scooter" | "accessory" | "parts";
//   name: string;
//   price: string;
//   oldPrice?: string;
//   discount?: string;
//   year?: string;
//   installment?: string;
//   imagePath: { mobile: string; desktop: string };
//   images: string;
//   imageLabel?: string;
//   // Filter fields
//   brand?: string;
//   enginePower?: string;
//   releaseDate?: string;
//   chargingTime?: string;
//   weight?: string;
//   category?: string;
//   size?: string;
//   gender?: string;
// };

// export type ScooterProduct = BaseProduct & {
//   productType: "scooter";
//   year: string;
//   installment: string;
// };

// export type AccessoryProduct = BaseProduct & {
//   productType: "accessory";
// };

// export type PartsProduct = BaseProduct & {
//   productType: "parts";
//   partType:string;
// };

// export type Product = ScooterProduct | AccessoryProduct | PartsProduct;

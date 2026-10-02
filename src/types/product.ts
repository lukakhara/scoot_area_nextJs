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
  brand: string;
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
  imagePath?: string;
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
    > {}

export interface AccessoryCardProduct
  extends
    BaseCardFields,
    Pick<
      Accessory,
      "id" | "name" | "brand" | "price" | "images" | "category" | "size" | "sex"
    > {}

export interface PartsCardProduct
  extends
    BaseCardFields,
    Pick<
      SparePart,
      "id" | "name" | "price" | "images" | "category" | "brand"
    > {}

export interface BlogCardProduct {
  id: string;
  title: string;
  slug: String;
  excerpt: String;
  publishedAt: Date;
  coverImage?: string;
}

// Discriminated union — must stay `type`, interfaces can't express `|`
export type Product =
  | ({ productType: "scooter" } & ScooterCardProduct)
  | ({ productType: "accessory" } & AccessoryCardProduct)
  | ({ productType: "blog" } & BlogCardProduct)
  | ({ productType: "parts" } & PartsCardProduct);

export interface ProductUnits {
  w: string;
  kmH: string;
  y: string;
  km: string;
  kg: string;
}

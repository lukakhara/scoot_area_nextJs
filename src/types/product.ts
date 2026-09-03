type BaseProduct = {
  id:string;
  title: string;
  price: string;
  oldPrice?: string;
  discount?: string;
  imagePath: {
    mobile: string;
    desktop: string;
  };
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
};

export type Product = ScooterProduct | AccessoryProduct | PartsProduct;

import { type Product } from "../types/product";


export const SCOOTER_ITEMS: Product[] = Array.from({ length: 10 }, (_, i) => ({
  id: `scooter-${i}`,
  productType: "scooter",
  title: "Ninebot by Segway - F30 Plus",
  price: "750.00₾",
  ...(i === 0 ? { oldPrice: "900.00₾", discount: "10% ფასდაკლება" } : {}),
  year: "2025",
  installment: "თვეში 55 ლარიდან",
  imagePath: {
    mobile: "/scooterMobile.png",
    desktop: "/scooterDesktop.png",
  },
}));

export const ACCESSORY_ITEMS: Product[] = Array.from(
  { length: 12 },
  (_, i) => ({
     id: `accessory-${i}`,
    productType: "accessory",
    title: "Ninebot by Segway - F30 Plus",
    price: "750.00₾",
    ...(i < 2 ? { oldPrice: "900.00₾", discount: "10% ფასდაკლება" } : {}),
    imagePath: {
      mobile: "/helmetMobile.png",
      desktop: "/helmetDesktop.png",
    },
  }),
);

export const PARTS_ITEMS: Product[] = Array.from({ length: 12 }, (_, i) => ({
   id: `part-${i}`,
  productType: "parts",
  title: "Ninebot by Segway - F30 Plus",
  price: "750.00₾",
  imagePath: {
    mobile: "/productBatteryMob.png",
    desktop: "/productBatteryDesk.png",
  },
  imageLabel: "battery",
}));

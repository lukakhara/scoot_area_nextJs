import { type Product } from "../types/product";
import scooterDesktop from "../../public/scooterDesktop.png";
import scooterMobile from "../../public/scooterMobile.png";
import helmetDesktop from "../../public/helmetDesktop.png";
import helmetMobile from "../../public/helmetMobile.png";
import batteryDesk from "../../public/productBatteryDesk.png";
import batteryMobile from "../../public/productBatteryMob.png";

export const SCOOTER_ITEMS: Product[] = Array.from({ length: 10 }, (_, i) => ({
  id: `scooter-${i}`,
  productType: "scooter",
  title: "Ninebot by Segway - F30 Plus",
  price: "750.00₾",
  ...(i === 0 ? { oldPrice: "900.00₾", discount: "10% ფასდაკლება" } : {}),
  year: "2025",
  installment: "თვეში 55 ლარიდან",
  imagePath: {
    mobile: scooterMobile,
    desktop: scooterDesktop,
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
      mobile: helmetMobile,
      desktop: helmetDesktop,
    },
  }),
);

export const PARTS_ITEMS: Product[] = Array.from({ length: 12 }, (_, i) => ({
   id: `part-${i}`,
  productType: "parts",
  title: "Ninebot by Segway - F30 Plus",
  price: "750.00₾",
  imagePath: {
    mobile: batteryMobile,
    desktop: batteryDesk,
  },
  imageLabel: "battery",
}));

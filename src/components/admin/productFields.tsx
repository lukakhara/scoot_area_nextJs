export type ProductKind = "scooter" | "accessory" | "part";
export type ProductField = {
  key: string;
  label: string;
  type?: string;
  options?: string[];
  readOnly?: boolean;
};
export type ProductRow = {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: string;
  stock: string;
  values: Record<string, string>;
  image?: string | null;
};
export const kinds: { key: ProductKind; label: string }[] = [
  { key: "scooter", label: "სკუტერები" },
  { key: "accessory", label: "აქსესუარები" },
  { key: "part", label: "სათადარიგო ნაწილები" },
];
export const accessoryCategories = [
  "SAFETY_GEAR",
  "PROTECTION_MAINTENANCE",
  "STORAGE_CARRYING",
  "LIGHTING",
  "COMFORT_UPGRADES",
  "CHARGING_POWER",
  "SPARE_PARTS",
];
export const partCategories = [
  "BRAKE_PADS",
  "TIRES_TUBES",
  "MOTOR_PARTS",
  "BATTERY_CELLS",
  "WHEELS",
  "BEARINGS",
  "CABLES_WIRING",
  "CONTROLLER",
  "DISPLAY_PANEL",
  "SUSPENSION_PARTS",
  "SCREWS_BOLTS",
  "OTHER",
];
export const commonFields: ProductField[] = [
  { key: "price", label: "ფასი (₾)", type: "number" },
  { key: "stock", label: "მარაგი", type: "number" },
  { key: "discountPrice", label: "ფასდაკლებული ფასი (₾)", type: "number" },
  {
    key: "discountEndsAt",
    label: "ფასდაკლების დასრულება",
    type: "datetime-local",
  },
];
export const modelFields: Record<ProductKind, ProductField[]> = {
  scooter: [
    { key: "name", label: "მოდელის სახელი" },
    { key: "brand", label: "ბრენდი" },
    { key: "engine", label: "ძრავი" },
    { key: "maxSpeed", label: "მაქს. სიჩქარე (კმ/სთ)", type: "number" },
    { key: "maxRange", label: "მაქს. მანძილი (კმ)", type: "number" },
    { key: "weight", label: "წონა (კგ)", type: "number" },
    { key: "releaseDate", label: "გამოშვების თარიღი", type: "date" },
    { key: "warranty", label: "გარანტია" },
    { key: "inclineAngle", label: "აღმართის კუთხე" },
    { key: "chargingTime", label: "დატენვის დრო" },
    {
      key: "maxRiderWeight",
      label: "მგზავრის მაქს. წონა (კგ)",
      type: "number",
    },
    {
      key: "recommendedRiderWeight",
      label: "რეკომენდებული წონა (კგ)",
      type: "number",
    },
    { key: "motorCount", label: "ძრავების რაოდენობა", type: "number" },
    { key: "wheelSize", label: "ბორბლის ზომა" },
    { key: "driveType", label: "წამყვანი თვალი" },
    { key: "battery", label: "ბატარეა" },
    { key: "suspension", label: "ამორტიზაცია" },
    {
      key: "antiSlipSystem",
      label: "მოცურების საწინააღმდეგო სისტემა",
      type: "checkbox",
    },
    { key: "brakeType", label: "მუხრუჭი" },
    { key: "connectivity", label: "კავშირი" },
    { key: "ipRating", label: "IP რეიტინგი" },
  ],
  accessory: [
    { key: "brand", label: "ბრენდი" },
    { key: "size", label: "ზომა" },
    { key: "sex", label: "სქესი", options: ["MEN", "WOMEN", "UNISEX"] },
    { key: "category", label: "კატეგორია", options: accessoryCategories },
  ],
  part: [
    { key: "sku", label: "SKU / ნაწილის კოდი" },
    { key: "category", label: "კატეგორია", options: partCategories },
    { key: "material", label: "მასალა" },
    { key: "weight", label: "წონა (კგ)", type: "number" },
    { key: "color", label: "ფერი" },
    { key: "manufacturer", label: "მწარმოებელი" },
  ],
};
export const sampleScooters = [
  { id: "scooter-01", name: "Ninebot F30 Plus" },
  { id: "scooter-02", name: "Xiaomi Pro 2" },
  { id: "scooter-03", name: "Kugoo Kirin M4" },
];
export const sampleRows: Record<ProductKind, ProductRow[]> = {
  scooter: [
    {
      id: "scooter-01",
      name: "Ninebot F30 Plus",
      brand: "Segway",
      category: "ელექტრო სკუტერი",
      price: "750.00",
      stock: "12",
      values: {
        name: "Ninebot F30 Plus",
        brand: "Segway",
        engine: "300W",
        maxSpeed: "25",
        maxRange: "30",
        weight: "15.1",
        releaseDate: "2025-01-01",
        warranty: "2 წელი",
        inclineAngle: "15%",
        chargingTime: "6 საათი",
        maxRiderWeight: "120",
        recommendedRiderWeight: "100",
        motorCount: "1",
        wheelSize: "10 inch",
        driveType: "უკანა",
        battery: "36V 10.2Ah",
        suspension: "არა",
        antiSlipSystem: "true",
        brakeType: "დისკური",
        connectivity: "Bluetooth, App",
        ipRating: "IP54",
        discountPrice: "675.00",
      },
    },
    {
      id: "scooter-02",
      name: "Xiaomi Pro 2",
      brand: "Xiaomi",
      category: "ელექტრო სკუტერი",
      price: "1290.00",
      stock: "4",
      values: {
        name: "Xiaomi Pro 2",
        brand: "Xiaomi",
        engine: "300W",
        maxSpeed: "25",
        maxRange: "45",
        battery: "36V 12.8Ah",
        ipRating: "IP54",
      },
    },
    {
      id: "scooter-03",
      name: "Kugoo Kirin M4",
      brand: "Kugoo",
      category: "ელექტრო სკუტერი",
      price: "1590.00",
      stock: "0",
      values: {
        name: "Kugoo Kirin M4",
        brand: "Kugoo",
        engine: "500W",
        maxSpeed: "45",
        maxRange: "50",
      },
    },
  ],
  accessory: [
    {
      id: "accessory-01",
      name: "დამცავი ჩაფხუტი",
      brand: "Segway",
      category: "SAFETY_GEAR",
      price: "150.00",
      stock: "24",
      values: {
        brand: "Segway",
        size: "M",
        sex: "UNISEX",
        category: "SAFETY_GEAR",
        name_ka: "დამცავი ჩაფხუტი",
        name_en: "Safety helmet",
        description_ka: "მსუბუქი დამცავი ჩაფხუტი.",
        description_en: "Lightweight protective helmet.",
        compatibleWith: "scooter-01",
        discountPrice: "135.00",
      },
    },
    {
      id: "accessory-02",
      name: "სკუტერის ჩანთა",
      brand: "Xiaomi",
      category: "STORAGE_CARRYING",
      price: "85.00",
      stock: "8",
      values: {
        brand: "Xiaomi",
        sex: "UNISEX",
        category: "STORAGE_CARRYING",
        name_ka: "სკუტერის ჩანთა",
        name_en: "Scooter bag",
        compatibleWith: "scooter-02",
      },
    },
  ],
  part: [
    {
      id: "part-01",
      name: "სამუხრუჭე ხუნდები",
      brand: "Segway",
      category: "BRAKE_PADS",
      price: "45.00",
      stock: "18",
      values: {
        sku: "BRK-F30-001",
        category: "BRAKE_PADS",
        material: "კერამიკა",
        weight: "0.15",
        color: "შავი",
        manufacturer: "Segway",
        name_ka: "სამუხრუჭე ხუნდები",
        name_en: "Brake pads",
        compatibleModels: "scooter-01",
      },
    },
    {
      id: "part-02",
      name: "სკუტერის საბურავი",
      brand: "Xiaomi",
      category: "TIRES_TUBES",
      price: "65.00",
      stock: "6",
      values: {
        sku: "TYR-PRO2-002",
        category: "TIRES_TUBES",
        material: "რეზინი",
        manufacturer: "Xiaomi",
        name_ka: "სკუტერის საბურავი",
        name_en: "Scooter tire",
        compatibleModels: "scooter-02",
      },
    },
  ],
};

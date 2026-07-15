export type VehicleReferenceCategory =
  | "sedan"
  | "suv"
  | "pickup";

export type MockVehicleReference = {
  id: string;
  brand: string;
  model: string;
  category: VehicleReferenceCategory;
  yearFrom: number;
  yearTo: number;
  estimatedMinGTQ: number;
  estimatedMaxGTQ: number;
  imageUrl: string;
};

export const MOCK_VEHICLE_REFERENCES: MockVehicleReference[] = [
  {
    id: "toyota-corolla-2019",
    brand: "Toyota",
    model: "Corolla",
    category: "sedan",
    yearFrom: 2019,
    yearTo: 2021,
    estimatedMinGTQ: 82000,
    estimatedMaxGTQ: 96000,
    imageUrl: "/importadoras/estimates/toyota-corolla.jpg",
  },
  {
    id: "honda-civic-2020",
    brand: "Honda",
    model: "Civic",
    category: "sedan",
    yearFrom: 2020,
    yearTo: 2022,
    estimatedMinGTQ: 92000,
    estimatedMaxGTQ: 108000,
    imageUrl: "/importadoras/estimates/honda-civic.jpg",
  },
  {
    id: "mazda-3-2020",
    brand: "Mazda",
    model: "Mazda 3",
    category: "sedan",
    yearFrom: 2020,
    yearTo: 2022,
    estimatedMinGTQ: 98000,
    estimatedMaxGTQ: 114000,
    imageUrl: "/importadoras/estimates/mazda-3.jpg",
  },
  {
    id: "toyota-rav4-2019",
    brand: "Toyota",
    model: "RAV4",
    category: "suv",
    yearFrom: 2019,
    yearTo: 2021,
    estimatedMinGTQ: 112000,
    estimatedMaxGTQ: 128000,
    imageUrl: "/importadoras/estimates/toyota-rav4.jpg",
  },
  {
    id: "honda-crv-2019",
    brand: "Honda",
    model: "CR-V",
    category: "suv",
    yearFrom: 2019,
    yearTo: 2021,
    estimatedMinGTQ: 108000,
    estimatedMaxGTQ: 124000,
    imageUrl: "/importadoras/estimates/honda-crv.jpg",
  },
  {
    id: "mazda-cx5-2020",
    brand: "Mazda",
    model: "CX-5",
    category: "suv",
    yearFrom: 2020,
    yearTo: 2022,
    estimatedMinGTQ: 116000,
    estimatedMaxGTQ: 132000,
    imageUrl: "/importadoras/estimates/mazda-cx5.jpg",
  },
  {
    id: "hyundai-tucson-2020",
    brand: "Hyundai",
    model: "Tucson",
    category: "suv",
    yearFrom: 2020,
    yearTo: 2022,
    estimatedMinGTQ: 104000,
    estimatedMaxGTQ: 120000,
    imageUrl: "/importadoras/estimates/hyundai-tucson.jpg",
  },
  {
    id: "kia-sportage-2020",
    brand: "Kia",
    model: "Sportage",
    category: "suv",
    yearFrom: 2020,
    yearTo: 2022,
    estimatedMinGTQ: 102000,
    estimatedMaxGTQ: 118000,
    imageUrl: "/importadoras/estimates/kia-sportage.jpg",
  },
  {
    id: "ford-f150-2018",
    brand: "Ford",
    model: "F-150",
    category: "pickup",
    yearFrom: 2018,
    yearTo: 2020,
    estimatedMinGTQ: 148000,
    estimatedMaxGTQ: 172000,
    imageUrl: "/importadoras/estimates/ford-f150.jpg",
  },
  {
    id: "toyota-tacoma-2018",
    brand: "Toyota",
    model: "Tacoma",
    category: "pickup",
    yearFrom: 2018,
    yearTo: 2020,
    estimatedMinGTQ: 158000,
    estimatedMaxGTQ: 184000,
    imageUrl: "/importadoras/estimates/toyota-tacoma.jpg",
  },
  {
    id: "nissan-frontier-2020",
    brand: "Nissan",
    model: "Frontier",
    category: "pickup",
    yearFrom: 2020,
    yearTo: 2022,
    estimatedMinGTQ: 136000,
    estimatedMaxGTQ: 158000,
    imageUrl: "/importadoras/estimates/nissan-frontier.jpg",
  },
  {
    id: "chevrolet-colorado-2019",
    brand: "Chevrolet",
    model: "Colorado",
    category: "pickup",
    yearFrom: 2019,
    yearTo: 2021,
    estimatedMinGTQ: 142000,
    estimatedMaxGTQ: 166000,
    imageUrl: "/importadoras/estimates/chevrolet-colorado.jpg",
  },
];
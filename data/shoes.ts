export type Shoe = {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  brand: string;
};

export const dataShoes: Shoe[] = [
  {
    id: "1",
    name: "Nike Air Max",
    description: "A comfortable and stylish running shoe.",
    imageUrl: "https://example.com/nike-air-max.jpg",
    brand: "Nike",
  },
  {
    id: "2",
    name: "Adidas Ultraboost",
    description: "Highperformance running shoes with great cushioning.",
    imageUrl: "https://example.com/adidas-ultraboost.jpg",
    brand: "Adidas",
  },
  {
    id: "3",
    name: "Puma RS-X",
    description: "Retro-inspired sneakers with a bold design.",
    imageUrl: "https://example.com/puma-rs-x.jpg",
    brand: "Puma",
  },
  {
    id: "4",
    name: "Reebok Classic",
    description: "Timeless sneakers that never go out of style.",
    imageUrl: "https://example.com/reebok-classic.jpg",
    brand: "Reebok",
  },
  {
    id: "5",
    name: "New Balance 990",
    description:
      "Premium running shoes known for their comfort and durability.",
    imageUrl: "https://example.com/new-balance-990.jpg",
    brand: "New Balance",
  },
];

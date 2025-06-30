import z from "zod";

export const ShoeSchema = z.object({
  id: z.string(),
  name: z.string().min(3).max(100),
  description: z.string().min(3).max(100),
  imageUrl: z.string().url().optional(),
  brand: z.string().min(3).max(100),
});

export type Shoe = z.infer<typeof ShoeSchema>;

export const dataShoes: Shoe[] = [
  {
    id: "abc",
    name: "Nike Air Max",
    description: "A comfortable and stylish running shoe.",
    imageUrl: "https://example.com/nike-air-max.jpg",
    brand: "Nike",
  },
  {
    id: "def",
    name: "Adidas Ultraboost",
    description: "Highperformance running shoes with great cushioning.",
    imageUrl: "https://example.com/adidas-ultraboost.jpg",
    brand: "Adidas",
  },
  {
    id: "ghi",
    name: "Puma RS-X",
    description: "Retro-inspired sneakers with a bold design.",
    imageUrl: "https://example.com/puma-rs-x.jpg",
    brand: "Puma",
  },
  {
    id: "jkl",
    name: "Reebok Classic",
    description: "Timeless sneakers that never go out of style.",
    imageUrl: "https://example.com/reebok-classic.jpg",
    brand: "Reebok",
  },
  {
    id: "mno",
    name: "New Balance 990",
    description: "Premium running shoes known for their comfort and durability.",
    imageUrl: "https://example.com/new-balance-990.jpg",
    brand: "New Balance",
  },
];

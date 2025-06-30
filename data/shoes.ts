import { nanoid } from "nanoid";
import { z } from "zod";

export const ShoeSchema = z.object({
  id: z.string().min(1).max(1000),
  name: z.string().min(3).max(100),
  description: z.string().min(3).max(100),
  imageUrl: z.string().url().optional(),
  brand: z.string().min(3).max(100),
});

export type Shoe = z.infer<typeof ShoeSchema>;

export const dataShoes: Shoe[] = [
  {
    id: "hbNDaISSQ9b-ZJlqJNtyK",
    name: "Nike Air Max",
    description: "A comfortable and stylish running shoe.",
    imageUrl: "https://example.com/nike-air-max.jpg",
    brand: "Nike",
  },
  {
    id: "esUSa3NenbGCKGuy_wA0U",
    name: "Adidas Ultraboost",
    description: "Highperformance running shoes with great cushioning.",
    imageUrl: "https://example.com/adidas-ultraboost.jpg",
    brand: "Adidas",
  },
  {
    id: "jMlDWC-6ELN3MtvlzraoY",
    name: "Puma RS-X",
    description: "Retro-inspired sneakers with a bold design.",
    imageUrl: "https://example.com/puma-rs-x.jpg",
    brand: "Puma",
  },
  {
    id: "Ly368i4lDjW0WPVyC2VD_",
    name: "Reebok Classic",
    description: "Timeless sneakers that never go out of style.",
    imageUrl: "https://example.com/reebok-classic.jpg",
    brand: "Reebok",
  },
  {
    id: "dTlvQLiqYxxqzcI1gQB7Y",
    name: "New Balance 990",
    description:
      "Premium running shoes known for their comfort and durability.",
    imageUrl: "https://example.com/new-balance-990.jpg",
    brand: "New Balance",
  },
];

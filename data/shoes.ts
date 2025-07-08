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
    id: "xJ0lN8oS1pR5uA2iV7xB0z",
    name: "Salomon Speedcross 5",
    description:
      "Trail running shoes with aggressive lugs and protective toe cap.",
    imageUrl:
      "https://images.unsplash.com/photo-1606107557195-9e51e0b8b6c0?w=500&h=500&fit=crop",
    brand: "Salomon",
  },
  {
    id: "zL2nP0qU3rT7wC4kX9zD2b",
    name: "Asics Novablast 5",
    description:
      "The midsole geometry and NOVABLAST 5 running shoe outsole help produce energized ridicule. FF BLAST MAX pads help create softer landings and leg movements that are more energized during your workout. The construction of the tongue wing at the top helps increase conformity while reducing the movement of the tongue. Equipped with a technological upper mesh jacquard that offers more strain and ventilation.",
    imageUrl:
      "https://i0.wp.com/theruntesters.com/wp-content/uploads/2024/12/asics-novablast-5-review.jpg?fit=1200%2C675&ssl=1",
    brand: "Asics",
  },
  {
    id: "hbNDaISSQ9b-ZJlqJNtyK",
    name: "Nike Air Max 270",
    description:
      "Iconic running shoe with visible Air unit for maximum cushioning and style.",
    imageUrl:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
    brand: "Nike",
  },
  {
    id: "esUSa3NenbGCKGuy_wA0U",
    name: "Adidas Ultraboost 22",
    description:
      "Revolutionary running shoes with responsive Boost midsole and Primeknit upper.",
    imageUrl:
      "https://jdsports.id/_next/image?url=https%3A%2F%2Fimages.jdsports.id%2Fi%2Fjpl%2Fjd_GZ0127_b%3Fw%3D700%26resmode%3Dsharp%26qlt%3D70%26fmt%3Dwebp&w=1920&q=75",
    brand: "Adidas",
  },
  {
    id: "jMlDWC-6ELN3MtvlzraoY",
    name: "Puma RS-X³ Puzzle",
    description:
      "Chunky retro sneakers with bold color blocking and enhanced cushioning.",
    imageUrl:
      "https://images.unsplash.com/photo-1606107557195-9e51e0b8b6c0?w=500&h=500&fit=crop",
    brand: "Puma",
  },
  {
    id: "Ly368i4lDjW0WPVyC2VD_",
    name: "Reebok Classic Leather",
    description:
      "Timeless leather sneakers with clean design and superior comfort.",
    imageUrl:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=500&fit=crop",
    brand: "Reebok",
  },
  {
    id: "dTlvQLiqYxxqzcI1gQB7Y",
    name: "New Balance 990v5",
    description:
      "Made in USA premium running shoes with ENCAP midsole technology.",
    imageUrl:
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=500&h=500&fit=crop",
    brand: "New Balance",
  },
  {
    id: "kP9mN2xQ8vR4tY7wZ1aB3c",
    name: "ASICS Gel-Kayano 29",
    description:
      "Premium stability running shoes with Dynamic DuoMax Support System.",
    imageUrl:
      "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=500&h=500&fit=crop",
    brand: "ASICS",
  },
  {
    id: "mX5nL8qW2eR9tY4vB7cA1d",
    name: "Brooks Ghost 15",
    description:
      "Neutral running shoes with DNA LOFT v2 cushioning for smooth transitions.",
    imageUrl:
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&h=500&fit=crop",
    brand: "Brooks",
  },
  {
    id: "sF6hJ4kP7mN1qW8eR3tY6v",
    name: "Saucony Ride 16",
    description:
      "Versatile daily trainer with PWRRUN midsole for responsive cushioning.",
    imageUrl:
      "https://images.unsplash.com/photo-1606107557195-9e51e0b8b6c0?w=500&h=500&fit=crop",
    brand: "Saucony",
  },
  {
    id: "uG7iK5lQ8nO2rX9fS4uY7w",
    name: "Hoka Clifton 9",
    description:
      "Lightweight running shoes with plush cushioning and meta-rocker geometry.",
    imageUrl:
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=500&h=500&fit=crop",
    brand: "Hoka",
  },
  {
    id: "vH8jL6mR9oP3sY0gT5vZ8x",
    name: "Mizuno Wave Rider 26",
    description:
      "Neutral running shoes with Wave technology for smooth and stable ride.",
    imageUrl:
      "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=500&h=500&fit=crop",
    brand: "Mizuno",
  },
  {
    id: "wI9kM7nS0pQ4tZ1hU6wA9y",
    name: "Under Armour HOVR",
    description:
      "Innovative running shoes with HOVR technology for zero gravity feel.",
    imageUrl:
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&h=500&fit=crop",
    brand: "Under Armour",
  },
  {
    id: "yK1mO9pT2qS6vB3jW8yC1a",
    name: "Altra Torin 6",
    description:
      "Zero-drop running shoes with FootShape toe box for natural foot positioning.",
    imageUrl:
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=500&h=500&fit=crop",
    brand: "Altra",
  },
  {
    id: "aM3oQ1rV4sU8xD5lY0aE3c",
    name: "Merrell Trail Glove 6",
    description:
      "Minimalist trail running shoes with Vibram outsole for maximum ground feel.",
    imageUrl:
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&h=500&fit=crop",
    brand: "Merrell",
  },
];

import { z } from "zod";

export const ShoeSchema = z.object({
  brandId: z.string().min(3).max(100),
  slug: z.string().min(3).max(100),
  name: z.string().min(3).max(100),
  generation: z.number().int().positive(),
  releaseDate: z.date(),
  description: z.string().min(3).max(500).optional(),
  category: z.string().min(3).max(100).optional(),
  terrain: z.string().min(3).max(100).optional(),
  bestFor: z.string().min(3).max(100).optional(),
  imageUrl: z.string().url().optional(),
});

export const CreateShoeSchema = ShoeSchema.pick({
  name: true,
  slug: true,
  generation: true,
  description: true,
  category: true,
  terrain: true,
  bestFor: true,
  imageUrl: true,
}).extend({
  releaseDate: z.iso.date(),
});

export const SeedShoeSchema = ShoeSchema.pick({
  name: true,
  releaseDate: true,
  generation: true,
  description: true,
  category: true,
  terrain: true,
  bestFor: true,
  imageUrl: true,
}).extend({
  brandSlug: z.string().min(3).max(100),
});

export type Shoe = z.infer<typeof ShoeSchema>;
export type CreateShoe = z.infer<typeof CreateShoeSchema>;
export type SeedShoe = z.infer<typeof SeedShoeSchema>;

export const dataShoes: SeedShoe[] = [
  {
    brandSlug: "salomon",
    name: "Salomon Speedcross 5",
    generation: 5,
    releaseDate: new Date("2023-01-15"),
    description:
      "Trail running shoes with aggressive lugs and protective toe cap.",
    category: "Trail Running",
    terrain: "Trail",
    bestFor: "Trail running, hiking",
    imageUrl:
      "https://images.unsplash.com/photo-1606107557195-9e51e0b8b6c0?w=500&h=500&fit=crop",
  },
  {
    brandSlug: "asics",
    name: "Asics Novablast 5",
    generation: 5,
    releaseDate: new Date("2024-03-20"),
    description:
      "The midsole geometry and NOVABLAST 5 running shoe outsole help produce energized ridicule. FF BLAST MAX pads help create softer landings and leg movements that are more energized during your workout.",
    category: "Road Running",
    terrain: "Road",
    bestFor: "Daily training, long runs",
    imageUrl:
      "https://i0.wp.com/theruntesters.com/wp-content/uploads/2024/12/asics-novablast-5-review.jpg?fit=1200%2C675&ssl=1",
  },
  {
    brandSlug: "nike",
    name: "Nike Air Max 270",
    generation: 270,
    releaseDate: new Date("2018-02-01"),
    description:
      "Iconic running shoe with visible Air unit for maximum cushioning and style.",
    category: "Lifestyle Running",
    terrain: "Road",
    bestFor: "Casual running, lifestyle",
    imageUrl:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
  },
  {
    brandSlug: "adidas",
    name: "Adidas Ultraboost 22",
    generation: 22,
    releaseDate: new Date("2022-01-15"),
    description:
      "Revolutionary running shoes with responsive Boost midsole and Primeknit upper.",
    category: "Road Running",
    terrain: "Road",
    bestFor: "Long distance running, daily training",
    imageUrl:
      "https://jdsports.id/_next/image?url=https%3A%2F%2Fimages.jdsports.id%2Fi%2Fjpl%2Fjd_GZ0127_b%3Fw%3D700%26resmode%3Dsharp%26qlt%3D70%26fmt%3Dwebp&w=1920&q=75",
  },
  {
    brandSlug: "puma",
    name: "Puma RS-X³ Puzzle",
    generation: 3,
    releaseDate: new Date("2021-06-10"),
    description:
      "Chunky retro sneakers with bold color blocking and enhanced cushioning.",
    category: "Lifestyle",
    terrain: "Urban",
    bestFor: "Casual wear, street style",
    imageUrl:
      "https://images.unsplash.com/photo-1606107557195-9e51e0b8b6c0?w=500&h=500&fit=crop",
  },
  {
    brandSlug: "reebok",
    name: "Reebok Classic Leather",
    generation: 1,
    releaseDate: new Date("1983-01-01"),
    description:
      "Timeless leather sneakers with clean design and superior comfort.",
    category: "Lifestyle",
    terrain: "Urban",
    bestFor: "Casual wear, everyday use",
    imageUrl:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=500&fit=crop",
  },
  {
    brandSlug: "new-balance",
    name: "New Balance 990v5",
    generation: 5,
    releaseDate: new Date("2020-09-01"),
    description:
      "Made in USA premium running shoes with ENCAP midsole technology.",
    category: "Road Running",
    terrain: "Road",
    bestFor: "Daily training, stability",
    imageUrl:
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=500&h=500&fit=crop",
  },
  {
    brandSlug: "asics",
    name: "ASICS Gel-Kayano 29",
    generation: 29,
    releaseDate: new Date("2022-07-15"),
    description:
      "Premium stability running shoes with Dynamic DuoMax Support System.",
    category: "Road Running",
    terrain: "Road",
    bestFor: "Stability, overpronation",
    imageUrl:
      "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=500&h=500&fit=crop",
  },
  {
    brandSlug: "brooks",
    name: "Brooks Ghost 15",
    generation: 15,
    releaseDate: new Date("2023-08-01"),
    description:
      "Neutral running shoes with DNA LOFT v2 cushioning for smooth transitions.",
    category: "Road Running",
    terrain: "Road",
    bestFor: "Neutral runners, daily training",
    imageUrl:
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&h=500&fit=crop",
  },
  {
    brandSlug: "saucony",
    name: "Saucony Ride 16",
    generation: 16,
    releaseDate: new Date("2023-03-15"),
    description:
      "Versatile daily trainer with PWRRUN midsole for responsive cushioning.",
    category: "Road Running",
    terrain: "Road",
    bestFor: "Daily training, neutral runners",
    imageUrl:
      "https://images.unsplash.com/photo-1606107557195-9e51e0b8b6c0?w=500&h=500&fit=crop",
  },
  {
    brandSlug: "hoka",
    name: "Hoka Clifton 9",
    generation: 9,
    releaseDate: new Date("2023-06-01"),
    description:
      "Lightweight running shoes with plush cushioning and meta-rocker geometry.",
    category: "Road Running",
    terrain: "Road",
    bestFor: "Long distance, lightweight feel",
    imageUrl:
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=500&h=500&fit=crop",
  },
  {
    brandSlug: "mizuno",
    name: "Mizuno Wave Rider 26",
    generation: 26,
    releaseDate: new Date("2023-01-15"),
    description:
      "Neutral running shoes with Wave technology for smooth and stable ride.",
    category: "Road Running",
    terrain: "Road",
    bestFor: "Neutral runners, smooth transitions",
    imageUrl:
      "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=500&h=500&fit=crop",
  },
  {
    brandSlug: "under-armour",
    name: "Under Armour HOVR",
    generation: 1,
    releaseDate: new Date("2018-02-01"),
    description:
      "Innovative running shoes with HOVR technology for zero gravity feel.",
    category: "Road Running",
    terrain: "Road",
    bestFor: "Responsive cushioning, energy return",
    imageUrl:
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&h=500&fit=crop",
  },
  {
    brandSlug: "altra",
    name: "Altra Torin 6",
    generation: 6,
    releaseDate: new Date("2022-09-01"),
    description:
      "Zero-drop running shoes with FootShape toe box for natural foot positioning.",
    category: "Road Running",
    terrain: "Road",
    bestFor: "Natural running, zero-drop",
    imageUrl:
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=500&h=500&fit=crop",
  },
  {
    brandSlug: "merrell",
    name: "Merrell Trail Glove 6",
    generation: 6,
    releaseDate: new Date("2021-03-15"),
    description:
      "Minimalist trail running shoes with Vibram outsole for maximum ground feel.",
    category: "Trail Running",
    terrain: "Trail",
    bestFor: "Minimalist running, trail",
    imageUrl:
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&h=500&fit=crop",
  },
];

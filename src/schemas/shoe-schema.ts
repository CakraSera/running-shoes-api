import { z } from "@hono/zod-openapi";

export const ShoeSchema = z.object({
  id: z.string().openapi({
    example: "01K0YEKQF33PHHYPVX8KNH781V",
  }),
  brandId: z.string().min(3).max(100).openapi({
    example: "01K0F3N8B6VV3VHT949BRMN7KA",
  }),
  slug: z.string().min(3).max(100).openapi({
    example: "salomon-speedcross-10",
  }),
  name: z.string().min(3).max(100).openapi({
    example: "Salomon Speedcross 10",
  }),
  generation: z.number().int().positive().openapi({
    example: 5,
  }),
  releaseDate: z.date().openapi({
    example: "2023-01-04",
  }),
  description: z.string().min(3).max(500).optional().openapi({
    example: "Trail running shoes with aggressive lugs and protective toe cap.",
  }),
  category: z.string().min(3).max(100).optional().openapi({
    example: "Trail Running",
  }),
  terrain: z.string().min(3).max(100).optional().openapi({
    example: "Road",
  }),
  bestFor: z.string().min(3).max(100).optional().openapi({
    example: "Daily training, long runs",
  }),
  imageUrl: z.string().optional().openapi({
    example:
      "https://i0.wp.com/theruntesters.com/wp-content/uploads/2024/12/asics-novablast-5-review.jpg?fit=1200%2C675&ssl=1",
  }),
});

export const SlugShoeSchema = ShoeSchema.pick({
  slug: true,
});

export const ListArrayShoesSchema = z.array(ShoeSchema);

export const CreateShoeSchema = ShoeSchema.pick({
  name: true,
  generation: true,
  description: true,
  category: true,
  terrain: true,
  bestFor: true,
  imageUrl: true,
}).extend({
  brandId: z.string().min(3).max(100),
  releaseDate: z.iso.date().openapi({ example: "2023-01-04" }),
});

export const UpdateShoeSchema = ShoeSchema.pick({
  name: true,
  generation: true,
  releaseDate: true,
  description: true,
  category: true,
  terrain: true,
  bestFor: true,
  imageUrl: true,
}).extend({
  brandId: z.string().min(3).max(100),
  releaseDate: z.iso.date().openapi({ example: "2023-01-04" }),
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

export const ParamsByIdShoeSchema = ShoeSchema.pick({
  id: true,
});

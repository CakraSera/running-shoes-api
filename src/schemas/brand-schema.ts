import { z } from "@hono/zod-openapi";

export const BrandSchema = z.object({
  id: z
    .string()
    .min(3)
    .max(100)
    .openapi({ example: "01K0F3N8B6FQWPSRGDYF61784F" }),
  slug: z.string().min(3).max(100).openapi({ example: "910-running" }),
  name: z.string().min(1).max(100).openapi({ example: "Nike" }),
  description: z.string().min(1).max(500).nullable().openapi({
    example:
      "American multinational corporation that is engaged in the design, development, manufacturing, and worldwide marketing of footwear.",
  }),
  websiteUrl: z.string().optional().nullable().openapi({
    example: "https://www.nike.com",
  }),
  foundedYear: z.number().positive().optional().nullable().openapi({
    example: 1964,
  }),
  logoUrl: z.string().optional().nullable().openapi({
    example:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Nike_Logo.svg/1200px-Nike_Logo.svg.png",
  }),
});

export const BrandListSchema = z.array(BrandSchema);

export const SeedBrandSchema = BrandSchema.pick({
  slug: true,
  name: true,
  description: true,
  websiteUrl: true,
  foundedYear: true,
  logoUrl: true,
});

export const SlugBrandSchema = z.object({
  slug: z
    .string()
    .min(3)
    .openapi({
      param: {
        name: "slug",
        in: "path",
      },
      example: "asics",
    }),
});

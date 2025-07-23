import { OpenAPIHono } from "@hono/zod-openapi";
import { prisma } from "../lib/prisma";
import { BrandSchema, SlugBrandSchema } from "../schemas/brand-schema";

const app = new OpenAPIHono();

app.openapi(
  {
    method: "get",
    path: "/",
    responses: {
      200: {
        description: "List of brands",
      },
    },
    tags: ["Brands"],
  },
  async (c) => {
    const brands = await prisma.brand.findMany({
      orderBy: {
        name: "asc",
      },
      select: {
        id: true,
        slug: true,
        name: true,
        description: true,
        websiteUrl: true,
        foundedYear: true,
        logoUrl: true,
      },
    });
    if (!brands) return c.json(404);
    return c.json(brands);
  }
);

app.openapi(
  {
    method: "get",
    path: "/{slug}",
    description: "Get a brand by slug",
    request: {
      params: SlugBrandSchema,
    },
    responses: {
      200: {
        description: "Get a brand by slug",
        content: {
          "application/json": {
            schema: BrandSchema,
          },
        },
      },
      400: {
        description: "Invalid slug format",
      },
    },
    tags: ["Brands"],
  },
  async (c) => {
    const { slug } = c.req.valid("param");
    const brand = await prisma.brand.findUnique({
      where: {
        slug,
      },
      select: {
        id: true,
        slug: true,
        name: true,
        description: true,
        websiteUrl: true,
        foundedYear: true,
        logoUrl: true,
      },
    });
    if (!brand) return c.json(404);
    return c.json(brand, 200);
  }
);

app.openapi(
  {
    method: "get",
    path: "/{slug}/shoes",
    request: {
      params: SlugBrandSchema,
    },
    responses: {
      200: {
        description: "List of shoes for the brand",
      },
      400: {
        description: "Invalid slug format",
      },
    },
    tags: ["Brands"],
  },
  async (c) => {
    const slug = c.req.param("slug");
    const brand = await prisma.brand.findUnique({
      where: {
        slug,
      },
      include: {
        shoes: {
          orderBy: {
            name: "asc",
          },
        },
      },
    });
    return c.json(brand?.shoes || []);
  }
);

export default app;

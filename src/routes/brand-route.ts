import z from "zod";
import { OpenAPIHono } from "@hono/zod-openapi";
import { prisma } from "../lib/prisma";
import { BrandListSchema } from "../../data/brands";

const app = new OpenAPIHono();

app.openapi(
  {
    method: "get",
    path: "/",
    responses: {
      200: {
        description: "List of brands",
        content: {
          "application/json": {
            schema: BrandListSchema,
          },
        },
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

app.get("/:slug", async (c) => {
  const slug = c.req.param("slug");
  const brand = await prisma.brand.findUnique({
    where: {
      slug,
    },
  });
  return c.json(brand);
});

app.get("/:slug/shoes", async (c) => {
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
});

export default app;

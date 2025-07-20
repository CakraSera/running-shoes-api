import { Hono } from "hono";
import { prisma } from "../lib/prisma";

const app = new Hono();

app.get("/", async (c) => {
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
  return c.json(brands);
});

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

import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import slugify from "slugify";
import { getAllShoeWithBrand } from "./generated/prisma/sql";
import { zValidator } from "./validator-wrapper";
import { ShoeSchema } from "../data/shoes";
import { PrismaClient, Prisma } from "./generated/prisma";
const prisma = new PrismaClient({
  log: ["query"],
});

const app = new Hono();

app.onError((err, c) => {
  if (err instanceof HTTPException) {
    console.log("HTTPException", err);
    return c.json({ kind: "HTTPException", message: err.message }, err.status);
  }

  if (err instanceof Error) {
    console.log("Error", err);
    return c.json(
      { kind: "Error", message: err.message, stack: err.stack },
      500
    );
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    return c.json({ error: "Database error occurred" }, 500);
  }

  return c.json({ error: "An unexpected error occurred" }, 500);
});

app.get("/", (c) => {
  return c.json({
    ok: true,
    message: "Welcome to the Running Shoes API",
    runningShoes: "/shoes",
  });
});

app.get("/shoes", async (c) => {
  const shoes = await prisma.$queryRawTyped(getAllShoeWithBrand());
  return c.json(shoes);
});

app.get("/shoes/:slug", async (c) => {
  const slug = c.req.param("slug");
  const shoe = await prisma.shoe.findUnique({
    relationLoadStrategy: "join",
    include: {
      Brand: true, // Include brand information
    },
    where: {
      slug,
    },
  });
  if (!shoe) {
    return c.json(404);
  }
  return c.json(shoe);
});

app.post("/shoes", zValidator("json", ShoeSchema), async (c) => {
  try {
    const newShoeData = c.req.valid("json");
    const shoeSlug = slugify(newShoeData.name);
    const createdShoe = await prisma.shoe.create({
      data: {
        slug: shoeSlug,
        brandId: newShoeData.brandId,
        name: newShoeData.name,
        generation: newShoeData.generation,
        releaseDate: new Date(newShoeData.releaseDate),
        description: newShoeData.description,
        category: newShoeData.category,
        terrain: newShoeData.terrain,
        bestFor: newShoeData.bestFor,
        imageUrl: newShoeData.imageUrl,
      },
    });
    return c.json(createdShoe, 201);
  } catch (error) {
    console.error("Error creating shoe:", error);
    return c.json({ error: "Internal Server Error" }, 500);
  }
});

app.delete("/shoes", async (c) => {
  const deleteShoes = await prisma.shoe.deleteMany({});
  return c.json(deleteShoes);
});

app.delete("/shoes/:id", async (c) => {
  const id = c.req.param("id");
  const deleteShoes = await prisma.shoe.delete({
    where: {
      id,
    },
  });
  return c.json(deleteShoes);
});

app.patch("/shoes/:id", zValidator("json", ShoeSchema), async (c) => {
  const id = c.req.param("id") as string;
  const bodyJson = c.req.valid("json");
  const updateShoe = await prisma.shoe.update({
    where: { id },
    data: {
      brandId: bodyJson.brandId,
      name: bodyJson.name,
      generation: bodyJson.generation,
      releaseDate: new Date(bodyJson.releaseDate),
      description: bodyJson.description,
      category: bodyJson.category,
      terrain: bodyJson.terrain,
      bestFor: bodyJson.bestFor,
      imageUrl: bodyJson.imageUrl,
    },
  });
  return c.json(updateShoe);
});

app.get("/brands", async (c) => {
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

app.get("/brands/:slug", async (c) => {
  const slug = c.req.param("slug");
  const brand = await prisma.brand.findUnique({
    where: {
      slug,
    },
  });
  return c.json(brand);
});

app.get("/brands/:slug/shoes", async (c) => {
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

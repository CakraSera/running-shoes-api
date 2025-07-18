import { Hono } from "hono";
import { getAllShoeWithBrand } from "./generated/prisma/sql";
import { zValidator } from "./validator-wrapper";
import { ShoeSchema } from "../data/shoes";
import { PrismaClient } from "./generated/prisma";
import slugify from "slugify";
const prisma = new PrismaClient({
  log: ["query"],
});

const app = new Hono();

app.get("/", (c) => {
  return c.json({
    ok: true,
    message: "Welcome to the Running Shoes API",
    runningShoes: "/shoes",
  });
});

app.get("/shoes", async (c) => {
  const shoes = await prisma.$queryRawTyped(getAllShoeWithBrand());
  console.log("🚀 ~ app.get ~ shoes:", shoes);
  return c.json(shoes);
});

app.get("/shoes/:slug", async (c) => {
  const slug = c.req.param("slug");
  const shoe = await prisma.shoes.findUnique({
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
    const createdShoe = await prisma.shoes.create({
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
  const deleteShoes = await prisma.shoes.deleteMany({});
  return c.json(deleteShoes);
});

app.delete("/shoes/:id", async (c) => {
  const id = c.req.param("id");
  const deleteShoes = await prisma.shoes.delete({
    where: {
      id,
    },
  });
  return c.json(deleteShoes);
});

app.patch("/shoes/:id", zValidator("json", ShoeSchema), async (c) => {
  const id = c.req.param("id") as string;
  const bodyJson = c.req.valid("json");
  const updateShoe = await prisma.shoes.update({
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

export default app;

import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { nanoid } from "nanoid";
import { ShoeSchema } from "../data/shoes";
import { PrismaClient } from "./generated/prisma";
const prisma = new PrismaClient({
  log: ["query"],
});

const app = new Hono();

app.get("/", (c) => {
  return c.json({
    message: "Welcome to the Running Shoes API",
  });
});

app.get("/shoes", async (c) => {
  const shoes = await prisma.shoes.findMany();
  return c.json(shoes);
});

app.get("/shoes/:id", async (c) => {
  const id = c.req.param("id");
  const shoe = await prisma.shoes.findUnique({
    where: {
      id: id,
    },
  });
  if (!shoe) {
    return c.json(404);
  }
  return c.json(shoe);
});

app.post("/shoes", zValidator("json", ShoeSchema), (c) => {
  const newShoe = c.req.valid("json");
  console.log("🚀 ~ newShoe:", newShoe);
  const shoeData = prisma.shoes.create({
    data: {
      name: newShoe.name,
      brandId: newShoe.brandId,
      generation: newShoe.generation,
      releaseDate: newShoe.releaseDate,
      description: newShoe.description,
      category: newShoe.category,
      terrain: newShoe.terrain,
      bestFor: newShoe.bestFor,
      imageUrl: newShoe.imageUrl,
    },
  });
  return c.json(shoeData);
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

// TODO: Implement PATCH endpoint using zod validation and prisma
app.patch("/shoes/:id", zValidator("json", ShoeSchema), (c) => {
  const id = c.req.param("id") as string;
  return c.json(
    prisma.shoes.update({
      where: { id },
      data: c.req.valid("json"),
    })
  );
});

export default app;

import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { nanoid } from "nanoid";
import { dataShoes, ShoeSchema, Shoe } from "../data/shoes";
import { PrismaClient } from "./generated/prisma";
const prisma = new PrismaClient({
  log: ["query"],
});

let shoes = dataShoes;

const app = new Hono();

app.get("/", (c) => {
  return c.json({ message: "Hello, Hono!" });
});

app.get("/shoes", async (c) => {
  const shoes = await prisma.shoes.findMany();
  console.log("🚀 ~ app.get ~ shoes:", shoes);
  return c.json(shoes);
});

app.get("/shoes/:id", (c) => {
  const id = c.req.param("id");
  const shoe = shoes.find((shoe) => shoe.id === id);
  if (!shoe) {
    return c.json(404);
  }
  return c.json(shoe);
});

app.post(
  "/shoes",
  zValidator("json", ShoeSchema, (result, c) => {
    if (!result.success) {
      return c.text("Invalid!", 400);
    }
  }),
  (c) => {
    const newShoe = c.req.valid("json");
    const id = nanoid();
    const newShoes: Shoe[] = [
      ...shoes,
      {
        id,
        name: newShoe.name,
        description: newShoe.description,
        brand: newShoe.brand,
      },
    ];
    shoes = newShoes;
    return c.json(newShoes);
  }
);

app.delete("/shoes", (c) => {
  shoes = [];
  return c.json(shoes);
});

app.delete("/shoes/:id", (c) => {
  const id = c.req.param("id") as string;
  const bufferShoes = shoes.filter((shoe) => shoe.id !== id);
  shoes = bufferShoes;
  return c.json(shoes);
});

app.patch(
  "/shoes/:id",
  zValidator("json", ShoeSchema, (result, c) => {
    if (!result.success) {
      return c.text("Invalid!", 404);
    }
  }),
  (c) => {
    const id = c.req.param("id") as string;
    const shoe = shoes.filter((shoe) => shoe.id === id);
    if (!shoe) {
      return c.json(404);
    }
    const updatedShoe = c.req.valid("json");
    const updatedShoes = shoes.map((shoe) =>
      shoe.id === id ? { ...shoe, ...updatedShoe } : shoe
    );
    shoes = updatedShoes;
    return c.json(updatedShoes);
  }
);

export default app;

import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

import { ShoeSchema } from "../data/shoes";
import { PrismaClient } from "./generated/prisma";

const prisma = new PrismaClient({
  log: ["query"],
});

const app = new Hono();

app.get("/", (c) => {
  return c.json({ message: "Shoes API" });
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

app.post(
  "/shoes",
  zValidator("json", ShoeSchema, (result, c) => {
    if (!result.success) {
      return c.text("Invalid!", 400);
    }
  }),
  (c) => {
    const newShoe = c.req.valid("json");

    return c.json({});
  }
);

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
    const updatedShoes = shoes.map((shoe) => (shoe.id === id ? { ...shoe, ...updatedShoe } : shoe));
    shoes = updatedShoes;
    return c.json(updatedShoes);
  }
);

export default app;

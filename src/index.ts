import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { nanoid } from "nanoid";
import { dataShoes, ShoeSchema, Shoe } from "../data/shoes";

let shoes = dataShoes;

const app = new Hono();

app.get("/", (c) => {
  return c.json({ message: "Hello, Hono!" });
});

app.get("/shoes", (c) => {
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

app.patch("/shoes/:id", (c) => {
  const id = c.req.param("id") as string;
  const shoe = shoes.filter((shoe) => shoe.id === id);
});

export default app;

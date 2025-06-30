import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { nanoid } from "nanoid";
import { dataShoes, Shoe } from "../data/shoes";

let shoes = dataShoes;

const app = new Hono();

const createPostSchema = z.object({
  name: z.string().min(3).max(100),
  description: z.string().min(3).max(100),
  brand: z.string().min(3).max(100),
});

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
  zValidator("json", createPostSchema, (result, c) => {
    if (!result.success) {
      return c.text("Invalid!", 400);
    }
  }),
  async (c) => {
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

export default app;

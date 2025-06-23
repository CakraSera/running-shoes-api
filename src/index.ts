import { Hono } from "hono";
import { shoes } from "../data/shoes";

const app = new Hono();

app.get("/", (c) => {
  return c.json({ message: "Hello, Hono!" });
});

app.get("/shoes", (c) => {
  return c.json({ data: shoes });
});

app.get("/shoes/:id", (c) => {
  const id = parseInt(c.req.param("id"));
  const shoe = shoes.find((s) => s.id === id);
  if (!shoe) {
    return c.json({ message: "Shoe not found" }, 404);
  }
  return c.json({ data: shoe });
});

export default app;

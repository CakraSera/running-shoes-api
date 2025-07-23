import { Hono } from "hono";
import { zValidator } from "../validator-wrapper";
import { CreateShoeSchema } from "../schemas/shoe-schema";
import { prisma } from "../lib/prisma";
import { getAllShoeWithBrand } from "../generated/prisma/sql";
import { createSlug } from "../lib/slug";
import { appWithOpenApi } from "../lib/open-api";

const app = new Hono();

app.get("/", async (c) => {
  const shoes = await prisma.$queryRawTyped(getAllShoeWithBrand());
  return c.json(shoes);
});

app.get("/:slug", async (c) => {
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

app.post("/", zValidator("json", CreateShoeSchema), async (c) => {
  const newShoeData = c.req.valid("json");
  const shoeSlug = createSlug(newShoeData.name);
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
});

app.delete("/", async (c) => {
  const deleteShoes = await prisma.shoe.deleteMany({});
  return c.json(deleteShoes);
});

app.delete("/:id", async (c) => {
  const id = c.req.param("id");
  const deleteShoes = await prisma.shoe.delete({
    where: {
      id,
    },
  });
  return c.json(deleteShoes);
});

app.patch("/:id", zValidator("json", CreateShoeSchema), async (c) => {
  const id = c.req.param("id") as string;
  const bodyJson = c.req.valid("json");
  const updateShoe = await prisma.shoe.update({
    where: { id },
    data: {
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

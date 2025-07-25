import { OpenAPIHono } from "@hono/zod-openapi";
import {
  CreateShoeSchema,
  ParamsByIdShoeSchema,
  ShoeSchema,
  SlugShoeSchema,
  UpdateShoeSchema,
} from "../schemas/shoe-schema";
import { prisma } from "../lib/prisma";
import { getAllShoeWithBrand } from "../generated/prisma/sql";
import { createSlug } from "../lib/slug";

const TAGS = "Shoes";

export const shoeRoute = new OpenAPIHono({});

shoeRoute.openapi(
  {
    method: "get",
    path: "/",
    responses: {
      200: { description: "List of shoes" },
    },
    tags: [TAGS],
  },
  async (c) => {
    const shoes = await prisma.$queryRawTyped(getAllShoeWithBrand());
    return c.json(shoes);
  }
);

shoeRoute.openapi(
  {
    method: "get",
    path: "/{slug}",
    description: "Get shoes",
    request: {
      params: SlugShoeSchema,
    },
    responses: {
      200: { description: "Success get a shoe by slug" },
      400: { description: "Invalid slug format" },
    },
    tags: [TAGS],
  },
  async (c) => {
    const slug = c.req.param("slug");
    const shoe = await prisma.shoe.findUnique({
      relationLoadStrategy: "join",
      include: {
        brand: true, // Include brand information
      },
      where: {
        slug,
      },
    });
    if (!shoe) {
      return c.json(404);
    }
    return c.json(shoe);
  }
);

shoeRoute.openapi(
  {
    path: "/",
    method: "post",
    description: "Create a new shoe",
    request: {
      body: {
        content: { "shoeRoutelication/json": { schema: CreateShoeSchema } },
      },
    },
    responses: {
      201: {
        description: "Shoe created successfully",
        content: { "shoeRoutelication/json": { schema: CreateShoeSchema } },
      },
      400: { description: "Invalid request body" },
    },
    tags: [TAGS],
  },
  async (c) => {
    const newShoeData = await c.req.json();
    const createdShoe = await prisma.shoe.create({
      data: {
        ...newShoeData,
        slug: createSlug(newShoeData.name),
        releaseDate: new Date(newShoeData.releaseDate),
      },
    });
    if (!createdShoe) {
      return c.json({ error: "Failed to create shoe" }, 400);
    }
    return c.json(createdShoe, 201);
  }
);

shoeRoute.openapi(
  {
    method: "delete",
    path: "/",
    description: "Delete all shoes",
    responses: {
      200: { description: "Successfully deleted all shoes" },
      404: { description: "Failed to delete shoes" },
    },
    tags: [TAGS],
  },
  async (c) => {
    const deleteShoes = await prisma.shoe.deleteMany({});
    return c.json(deleteShoes);
  }
);

shoeRoute.openapi(
  {
    path: "/{id}",
    method: "delete",
    description: "Delete a shoe by ID",
    request: {
      params: ParamsByIdShoeSchema,
    },
    responses: {
      200: { description: "Shoe deleted successfully" },
      404: { description: "Shoe not found" },
    },
    tags: [TAGS],
  },
  async (c) => {
    const id = c.req.param("id");
    const deleteShoes = await prisma.shoe.delete({
      where: {
        id,
      },
    });
    return c.json(deleteShoes);
  }
);

shoeRoute.openapi(
  {
    path: "/{id}",
    method: "patch",
    description: "Update a shoe by ID",
    request: {
      params: ParamsByIdShoeSchema,
      body: {
        content: { "shoeRoutelication/json": { schema: UpdateShoeSchema } },
      },
    },
    responses: {
      200: {
        description: "Shoe updated successfully",
        content: { "application/json": { schema: ShoeSchema } },
      },
      404: { description: "Shoe not found" },
    },
    tags: [TAGS],
  },
  async (c) => {
    const id = c.req.param("id") as string;
    const body = await c.req.json();
    const updateShoe = await prisma.shoe.update({
      where: { id },
      data: {
        ...body,
        slug: createSlug(body.name),
        releaseDate: new Date(body.releaseDate),
      },
    });
    return c.json(updateShoe);
  }
);

import { OpenAPIHono } from "@hono/zod-openapi";
import { Hono } from "hono";
import { zValidator } from "../validator-wrapper";
import {
  CreateShoeSchema,
  ParamsByIdShoeSchema,
  SlugShoeSchema,
} from "../schemas/shoe-schema";
import { prisma } from "../lib/prisma";
import { getAllShoeWithBrand } from "../generated/prisma/sql";
import { createSlug } from "../lib/slug";

const TAGS = "Shoes";

const app = new OpenAPIHono({});

app.openapi(
  {
    method: "get",
    path: "/",
    responses: {
      200: {
        description: "List of shoes",
      },
    },
    tags: [TAGS],
  },
  async (c) => {
    const shoes = await prisma.$queryRawTyped(getAllShoeWithBrand());
    return c.json(shoes);
  }
);

app.openapi(
  {
    method: "get",
    path: "/{slug}",
    description: "Get shoes",
    request: {
      params: SlugShoeSchema,
    },
    responses: {
      200: {
        description: "Success get a shoe by slug",
      },
      400: {
        description: "Invalid slug format",
      },
    },
    tags: [TAGS],
  },
  async (c) => {
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
  }
);

app.openapi(
  {
    path: "/",
    method: "post",
    description: "Create a new shoe",
    request: {
      body: {
        content: {
          "application/json": {
            schema: CreateShoeSchema,
          },
        },
      },
    },
    responses: {
      201: {
        description: "Shoe created successfully",
        content: {
          "application/json": {
            schema: CreateShoeSchema,
          },
        },
      },
      400: {
        description: "Invalid request body",
      },
    },
    tags: [TAGS],
  },
  async (c) => {
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
    if (!createdShoe) {
      return c.json({ error: "Failed to create shoe" }, 400);
    }
    return c.json(createdShoe, 201);
  }
);

app.openapi(
  {
    method: "delete",
    path: "/{id}",
    description: "Delete a shoe by ID",
    request: {
      params: ParamsByIdShoeSchema,
    },
    responses: {
      200: {
        description: "Shoe deleted successfully",
      },
      404: {
        description: "Shoe not found",
      },
    },
  },
  async (c) => {
    const deleteShoes = await prisma.shoe.deleteMany({});
    return c.json(deleteShoes);
  }
);

app.openapi(
  {
    path: "/{id}",
    method: "delete",
    description: "Delete a shoe by ID",
    request: {
      params: ParamsByIdShoeSchema,
    },
    responses: {
      200: {
        description: "Shoe deleted successfully",
      },
      404: {
        description: "Shoe not found",
      },
    },
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

import { OpenAPIHono, z } from "@hono/zod-openapi";
import { WelcomeResponseSchema } from "../schemas/index-schema";

export const indexRoute = new OpenAPIHono();

indexRoute.openapi(
  {
    method: "get",
    path: "/",
    responses: {
      200: {
        description: "Welcome message",
        content: {
          "application/json": {
            schema: WelcomeResponseSchema,
          },
        },
      },
    },
    tags: ["Index"],
  },
  (c) => {
    return c.json({
      ok: true,
      message: "Welcome to the Running Shoes API",
      runningShoes: "/shoes",
      scalar: "/scalar",
    });
  }
);

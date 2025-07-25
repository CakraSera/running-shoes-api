import { z } from "@hono/zod-openapi";

export const WelcomeResponseSchema = z
  .object({
    ok: z.boolean(),
    message: z.string(),
    runningShoes: z.string(),
  })
  .openapi({
    example: {
      ok: true,
      message: "Welcome to the Running Shoes API",
      runningShoes: "/shoes",
      OpenApi: "/scalar",
    },
  });

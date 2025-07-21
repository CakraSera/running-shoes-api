import { OpenAPIHono } from "@hono/zod-openapi";
import { logger } from "hono/logger";
import { HTTPException } from "hono/http-exception";
import * as Sentry from "@sentry/bun";
import z, { ZodError } from "zod";
import { Prisma } from "./generated/prisma";
import { Scalar } from "@scalar/hono-api-reference";

// Route imports
import Shoe from "./routes/shoe-route";
import Brand from "./routes/brand-route";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
});

const app = new OpenAPIHono();

app.use(logger());

app.get("/", (c) => {
  return c.json({
    ok: true,
    message: "Welcome to the Running Shoes API",
    runningShoes: "/shoes",
  });
});

app.onError((error, c) => {
  if (error instanceof HTTPException) {
    return c.json({ kind: "hono", error: error }, 400);
  }

  if (error instanceof ZodError) {
    const zodErrorPretty = z.prettifyError(error);
    return c.json({ kind: "zod", error: zodErrorPretty }, 400);
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return c.json({ kind: "prisma", error: error }, 400);
  }

  Sentry.captureException(error);

  return c.json({ error: "An unexpected error occurred" }, 500);
});

app.route("/shoes", Shoe);
app.route("/brands", Brand);

// The OpenAPI documentation will be available at /doc
const description =
  "Running Shoes API - A RESTful API for managing running shoes and brands.";

app.doc("/docs", {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "Running Shoes API",
    description: description,
  },
});

// Use the middleware to serve the Scalar API Reference at /scalar
app.get(
  "/scalar",
  Scalar({ url: "/docs", theme: "keplerkepler", layout: "classic" })
);

export default app;

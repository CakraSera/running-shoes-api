import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import * as Sentry from "@sentry/bun";
import z from "zod";
import { Prisma } from "./generated/prisma";
import { ZodError } from "zod";

// Route imports
import Shoe from "./routes/shoe-route";
import Brand from "./routes/brand-route";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
});

const app = new Hono();

app.route("/shoes", Shoe);
app.route("/brands", Brand);

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

app.get("/", (c) => {
  return c.json({
    ok: true,
    message: "Welcome to the Running Shoes API",
    runningShoes: "/shoes",
  });
});

export default app;

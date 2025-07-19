// file: validator-wrapper.ts
import z, { ZodSchema } from "zod";
import type { ValidationTargets } from "hono";
import { zValidator as zv } from "@hono/zod-validator";

export const zValidator = <
  T extends ZodSchema,
  Target extends keyof ValidationTargets
>(
  target: Target,
  schema: T
) =>
  zv(target, schema, (result, c) => {
    if (!result.success) {
      const pretty = z.prettifyError(result.error);
      return c.text(pretty, 400);
    }
  });

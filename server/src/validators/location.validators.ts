import { z } from "zod";

const locationBodySchema = z.object({
  storeName: z.string().min(1, "Store name is required").trim(),
  address: z.string().min(1, "Address is required").trim(),
  squareLocationId: z.string().min(1, "Square location ID is required").trim(),
});

export const createLocationSchema = z.object({
  body: locationBodySchema,
});

export const updateLocationSchema = z.object({
  params: z.object({
    id: z.string().min(1, "Location ID is required"),
  }),
  body: locationBodySchema.partial(),
});

export const getLocationSchema = z.object({
  params: z.object({
    id: z.string().min(1, "Location ID is required"),
  }),
});

export const deleteLocationSchema = z.object({
  params: z.object({
    id: z.string().min(1, "Location ID is required"),
  }),
});

export const getLocationsQuerySchema = z.object({
  query: z.object({
    page: z.coerce.number().int().min(1, "Page must be at least 1").default(1),
    limit: z.coerce
      .number()
      .int()
      .min(1, "Limit must be at least 1")
      .max(500, "Limit must be at most 500")
      .default(10),
  }),
});

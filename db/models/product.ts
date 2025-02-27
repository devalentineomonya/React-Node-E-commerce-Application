import {
  pgTable,
  uuid,
  integer,
  varchar,
  jsonb,
  pgEnum,
  timestamp,
} from "drizzle-orm/pg-core";
import { z } from "zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const productLabelEnum = pgEnum("label", [
  "BestSelling",
  "Popular",
  "Featured",
  "Trending",
  "New",
  "MostSelling",
]);

export const productTable = pgTable("products", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  price: integer("price").notNull(),
  shortDescription: varchar("short_description", { length: 500 }),
  longDescription: varchar("long_description"),
  label: productLabelEnum().notNull(),
  type: varchar("type", { length: 100 }),
  additionalInfo: jsonb("additional_info"),
  sizes: jsonb("sizes").notNull(),
  images: jsonb("images").notNull(),
  colorVariants: jsonb("color_variants").notNull(),
  stock: integer("stock").notNull(),
  discount: integer("discount").default(0),
  brandIds: jsonb("brand_ids").notNull(),
  categoryIds: jsonb("category_ids").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const productInsertSchema = createInsertSchema(productTable);
export const productSelectSchema = createSelectSchema(productTable);

export type ProductInsert = z.infer<typeof productInsertSchema>;
export type ProductSelect = z.infer<typeof productSelectSchema>;

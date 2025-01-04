import { pgTable, uuid, integer, timestamp, jsonb } from "drizzle-orm/pg-core";
import { z } from "zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { productTable } from "./product";
import { userTable } from "./user";

export const cartItemType = {
  productId: uuid("product_id")
    .notNull()
    .references(() => productTable.id),
  quantity: integer("quantity").notNull(),
};

export const cartTable = pgTable("carts", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => userTable.id),
  items: jsonb("items").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const cartInsertSchema = createInsertSchema(cartTable);
export const cartSelectSchema = createSelectSchema(cartTable);

export type CartInsert = z.infer<typeof cartInsertSchema>;
export type CartSelect = z.infer<typeof cartSelectSchema>;

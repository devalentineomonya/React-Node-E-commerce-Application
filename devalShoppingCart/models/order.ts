import {
  pgTable,
  uuid,
  integer,
  varchar,
  jsonb,
  timestamp,
} from "drizzle-orm/pg-core";
import { z } from "zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { userTable } from "./user";
import { addressTable } from "./addresses";

export const orderTable = pgTable("orders", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => userTable.id),
  items: jsonb("items").notNull(),
  totalAmount: integer("total_amount").notNull(),
  status: varchar("status", { length: 50 }).default("Pending"),
  deliveryAddressId: uuid("delivery_address_id")
    .notNull()
    .references(() => addressTable.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const orderInsertSchema = createInsertSchema(orderTable);
export const orderSelectSchema = createSelectSchema(orderTable);

export type OrderInsert = z.infer<typeof orderInsertSchema>;
export type OrderSelect = z.infer<typeof orderSelectSchema>;

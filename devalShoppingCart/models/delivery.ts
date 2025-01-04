import { pgTable, uuid, integer, timestamp, varchar, jsonb } from "drizzle-orm/pg-core";
import { z } from "zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { orderTable } from "./order";
import { userTable } from "./user";
import { addressTable } from "./addresses";

export const deliveryTable = pgTable("deliveries", {
  id: uuid("id").primaryKey().defaultRandom(),
  orderId: uuid("order_id").notNull().references(() => orderTable.id),
  userId: uuid("user_id").notNull().references(() => userTable.id),
  items: jsonb("items").notNull(),
  totalAmount: integer("total_amount").notNull(),
  deliveryDate: timestamp("delivery_date").defaultNow(),
  deliveryAddressId: uuid("delivery_address_id").notNull().references(() =>addressTable.id),
  status: varchar("status", { length: 50 }).default("Delivered"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});


export const deliveryInsertSchema = createInsertSchema(deliveryTable);
export const deliverySelectSchema = createSelectSchema(deliveryTable);


export type DeliveryInsert = z.infer<typeof deliveryInsertSchema>;
export type DeliverySelect = z.infer<typeof deliverySelectSchema>;

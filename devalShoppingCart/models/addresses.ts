import { z } from "zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { pgTable, uuid, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { userTable } from "./user";


export const addressTable = pgTable("addresses", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull().references(() =>userTable.id),
  street: text("street").notNull(),
  city: text("city").notNull(),
  state: text("state").notNull(),
  postalCode: varchar("postal_code", { length: 20 }).notNull(),
  country: text("country").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const addressInsertSchema = createInsertSchema(addressTable, {
  userId: z.string().uuid(),
});

export const addressSelectSchema = createSelectSchema(addressTable, {
  userId: z.string().uuid(),
});

export type AddressInsert = z.infer<typeof addressInsertSchema>;
export type AddressSelect = z.infer<typeof addressSelectSchema>;

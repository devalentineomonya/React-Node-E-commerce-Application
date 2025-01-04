import {
  pgTable,
  uuid,
  varchar,
  integer,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";
import { z } from "zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const couponTable = pgTable("coupons", {
  id: uuid("id").primaryKey().defaultRandom(),
  code: varchar("code", { length: 255 }).notNull().unique(),
  discount: integer("discount").notNull(),
  validFrom: timestamp("valid_from"),
  validTo: timestamp("valid_to"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const couponInsertSchema = createInsertSchema(couponTable);
export const couponSelectSchema = createSelectSchema(couponTable);

export type CouponInsert = z.infer<typeof couponInsertSchema>;
export type CouponSelect = z.infer<typeof couponSelectSchema>;

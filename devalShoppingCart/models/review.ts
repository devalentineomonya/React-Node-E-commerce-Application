import {
  pgTable,
  uuid,
  integer,
  varchar,
  timestamp,
} from "drizzle-orm/pg-core";
import { z } from "zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { userTable } from "./user";
import { productTable } from "./product";
// import { relations } from "drizzle-orm";

export const reviewTable = pgTable("reviews", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => userTable.id),
  productId: uuid("product_id")
    .notNull()
    .references(() => productTable.id),
  rating: integer("rating").notNull(),
  comment: varchar("comment", { length: 1000 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const reviewInsertSchema = createInsertSchema(reviewTable);
export const reviewSelectSchema = createSelectSchema(reviewTable);

export type ReviewInsert = z.infer<typeof reviewInsertSchema>;
export type ReviewSelect = z.infer<typeof reviewSelectSchema>;

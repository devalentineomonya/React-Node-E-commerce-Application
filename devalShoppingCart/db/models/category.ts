import { pgTable, uuid, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { z } from "zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const categoryTable = pgTable("categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  description: text("description"),
  imageUrl: varchar("image_url", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const categoryInsertSchema = createInsertSchema(categoryTable);
export const categorySelectSchema = createSelectSchema(categoryTable);

export type CategoryInsert = z.infer<typeof categoryInsertSchema>;
export type CategorySelect = z.infer<typeof categorySelectSchema>;

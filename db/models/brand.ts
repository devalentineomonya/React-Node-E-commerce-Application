import { pgTable, uuid, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { z } from "zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";


export const brandTable = pgTable("brands", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(), 
  description: text("description"), 
  logoUrl: varchar("logo_url", { length: 255 }), 
  productImage: varchar("product_image", { length: 255 }), 
  website: varchar("website", { length: 255 }), 
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});


export const brandInsertSchema = createInsertSchema(brandTable);

export const brandSelectSchema = createSelectSchema(brandTable);


export type BrandInsert = z.infer<typeof brandInsertSchema>;
export type BrandSelect = z.infer<typeof brandSelectSchema>;

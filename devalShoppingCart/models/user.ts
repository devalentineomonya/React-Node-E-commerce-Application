import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  jsonb,
  pgEnum,
  date,
} from "drizzle-orm/pg-core";
import { z } from "zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

const genderEnum = pgEnum("gender", ["Male", "Female", "Others"]);

export const userTable = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  googleId: varchar("google_id", { length: 255 }),
  firstName: varchar("first_name", { length: 255 }).notNull(),
  middleName: varchar("middle_name", { length: 255 }),
  lastName: varchar("last_name", { length: 255 }).notNull(),
  gender: genderEnum("gender"),
  dateOfBirth: date("date_of_birth"),
  password: varchar("password", { length: 255 }),
  primaryPhoneNumber: varchar("primary_phone_number", { length: 20 }),
  secondaryPhoneNumber: varchar("secondary_phone_number", { length: 20 }),
  addresses: jsonb("addresses"),
  recentItems: jsonb("recent_items"),
  likedItems: jsonb("liked_items"),
  orders: jsonb("orders"),
  deliveries: jsonb("deliveries"),
  vouchers: jsonb("vouchers"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const userInsertSchema = createInsertSchema(userTable);
export const userSelectSchema = createSelectSchema(userTable);

export type UserInsert = z.infer<typeof userInsertSchema>;
export type UserSelect = z.infer<typeof userSelectSchema>;

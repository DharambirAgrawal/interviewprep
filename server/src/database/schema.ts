import { pgTable, serial, varchar, text, boolean, timestamp, uuid } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(), 
  userId: uuid("user_id").defaultRandom().notNull().unique(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: text("password").notNull(), 
  accessToken: text("access_token"),
  resetToken: text("reset_token"),
  isEmailVerified: boolean("is_email_verified").default(false).notNull(),
  firstName: varchar("first_name", { length: 100 }).notNull(),
  lastName: varchar("last_name", { length: 100 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

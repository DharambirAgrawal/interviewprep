import { pgTable, serial, varchar, text, boolean, timestamp } from "drizzle-orm/pg-core";

// Auth table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: text("password").notNull(), // hashed password
  accessToken: text("access_token"),
  resetToken: text("reset_token"),
  isEmailVerified: boolean("is_email_verified").default(false).notNull(),
  firstName: varchar("first_name", { length: 100 }).notNull(),
  lastName: varchar("last_name", { length: 100 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

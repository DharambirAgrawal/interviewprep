import {
  pgTable,
  serial,
  varchar,
  text,
  boolean,
  timestamp,
  uuid,
  integer,
} from "drizzle-orm/pg-core";

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

export const profiles = pgTable("profiles", {
  id: serial("id").primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.userId)
    .unique(),
  jobTitle: varchar("job_title", { length: 200 }),
  company: varchar("company", { length: 200 }),
  bio: text("bio"),
  profileImageUrl: text("profile_image_url"),
  resumeUrl: text("resume_url"),
  targetIndustry: varchar("target_industry", { length: 100 }),
  interviewDifficulty: varchar("interview_difficulty", { length: 50 }),
  interviewType: varchar("interview_type", { length: 50 }),
  interviewStyle: varchar("interview_style", { length: 50 }),
  primarySkills: text("primary_skills"),
  weakAreas: text("weak_areas"),
  interviewComfortLevel: integer("interview_comfort_level"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

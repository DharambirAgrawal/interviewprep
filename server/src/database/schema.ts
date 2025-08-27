import {
  pgTable,
  serial,
  varchar,
  text,
  boolean,
  timestamp,
  uuid,
  integer,
  pgEnum,
} from "drizzle-orm/pg-core";

export const interview_difficulty_enum = pgEnum("interview_difficulty_enum", ["beginner", "intermediate", "advanced","expert"])
export const interview_type_enum = pgEnum("interview_type_enum", ["technical", "hr", "managerial", "behavioral", "system_design","case_study","mixed"])
export const interview_style_enum = pgEnum("interview_style_enum", ["traditional", "conversational", "problem_solving", "pair_programming","whiteboard"])

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

  interviewDifficulty: interview_difficulty_enum("interview_difficulty"),
  interviewType: interview_type_enum("interview_type"),
  interviewStyle: interview_style_enum("interview_style"),

  primarySkills: text("primary_skills"),
  weakAreas: text("weak_areas"),

  interviewComfortLevel: integer("interview_comfort_level"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

CREATE TYPE "public"."interview_difficulty_enum" AS ENUM('beginner', 'intermediate', 'advanced', 'expert');--> statement-breakpoint
CREATE TYPE "public"."interview_style_enum" AS ENUM('in-person', 'virtual', 'panel', 'one-on-one');--> statement-breakpoint
CREATE TYPE "public"."interview_type_enum" AS ENUM('technical', 'hr', 'managerial', 'behavioral');--> statement-breakpoint
ALTER TABLE "profiles" ALTER COLUMN "interview_difficulty" SET DATA TYPE "public"."interview_difficulty_enum" USING "interview_difficulty"::"public"."interview_difficulty_enum";--> statement-breakpoint
ALTER TABLE "profiles" ALTER COLUMN "interview_type" SET DATA TYPE "public"."interview_type_enum" USING "interview_type"::"public"."interview_type_enum";--> statement-breakpoint
ALTER TABLE "profiles" ALTER COLUMN "interview_style" SET DATA TYPE "public"."interview_style_enum" USING "interview_style"::"public"."interview_style_enum";
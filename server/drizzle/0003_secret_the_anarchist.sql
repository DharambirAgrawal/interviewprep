ALTER TABLE "profiles" ALTER COLUMN "interview_style" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."interview_style_enum";--> statement-breakpoint
CREATE TYPE "public"."interview_style_enum" AS ENUM('traditional', 'conversational', 'problem_solving', 'pair_programming', 'whiteboard');--> statement-breakpoint
ALTER TABLE "profiles" ALTER COLUMN "interview_style" SET DATA TYPE "public"."interview_style_enum" USING "interview_style"::"public"."interview_style_enum";
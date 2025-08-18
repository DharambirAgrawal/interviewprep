-- Migration: Add profiles table
-- Created: $(date)

CREATE TABLE IF NOT EXISTS profiles (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL UNIQUE REFERENCES users(user_id),
    job_title VARCHAR(200),
    company VARCHAR(200),
    bio TEXT,
    profile_image_url TEXT,
    resume_url TEXT,
    target_industry VARCHAR(100),
    interview_difficulty VARCHAR(50),
    interview_type VARCHAR(50),
    interview_style VARCHAR(50),
    primary_skills TEXT,
    weak_areas TEXT,
    interview_comfort_level INTEGER CHECK (interview_comfort_level >= 1 AND interview_comfort_level <= 10),
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Add index on user_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON profiles(user_id);

-- Add trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at 
    BEFORE UPDATE ON profiles 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

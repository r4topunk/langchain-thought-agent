import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

// Personality enum values based on Inside Out characters
export const PersonalityType = {
  JOY: "joy",
  SADNESS: "sadness",
  ANGER: "anger",
  FEAR: "fear",
  DISGUST: "disgust",
} as const;

export type PersonalityType = typeof PersonalityType[keyof typeof PersonalityType];

// Thoughts table - stores all AI reflections
export const thoughts = sqliteTable("thoughts", {
  id: text("id").primaryKey(),
  content: text("content").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  promptId: text("prompt_id").notNull(),
  personalityType: text("personality_type").notNull(),
  isIntermediateStep: integer("is_intermediate_step", { mode: "boolean" }).notNull().default(false),
});

// Prompts table - stores user's input prompts
export const prompts = sqliteTable("prompts", {
  id: text("id").primaryKey(),
  content: text("content").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});

// Personality settings table - stores personality configurations
export const personalitySettings = sqliteTable("personality_settings", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  joyLevel: integer("joy_level").notNull().default(50),
  sadnessLevel: integer("sadness_level").notNull().default(50),
  angerLevel: integer("anger_level").notNull().default(50),
  fearLevel: integer("fear_level").notNull().default(50),
  disgustLevel: integer("disgust_level").notNull().default(50),
  isActive: integer("is_active", { mode: "boolean" }).notNull().default(false),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});
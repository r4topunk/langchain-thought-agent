import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const personalities = sqliteTable("personalities", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  joy: integer("joy").notNull().default(50),
  sadness: integer("sadness").notNull().default(50),
  anger: integer("anger").notNull().default(50),
  fear: integer("fear").notNull().default(50),
  disgust: integer("disgust").notNull().default(50),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$default(() => new Date()),
});

export const thoughts = sqliteTable("thoughts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  personalityId: integer("personality_id")
    .references(() => personalities.id)
    .notNull(),
  content: text("content").notNull(),
  emotion: text("emotion").notNull(),
  intensity: integer("intensity").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$default(() => new Date()),
});

export const conversations = sqliteTable("conversations", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  personalityId: integer("personality_id")
    .references(() => personalities.id)
    .notNull(),
  humanInput: text("human_input").notNull(),
  aiResponse: text("ai_response").notNull(),
  dominantEmotion: text("dominant_emotion").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$default(() => new Date()),
});
import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const profile = pgTable("profile", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  title: text("title").notNull(),
  bio: text("bio").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  location: text("location").notNull(),
  linkedin: text("linkedin"),
  github: text("github"),
});

export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  category: text("category").notNull(),
  items: text("items").array().notNull(), // array of skill names
});

export const experience = pgTable("experience", {
  id: serial("id").primaryKey(),
  company: text("company").notNull(),
  role: text("role").notNull(),
  duration: text("duration").notNull(),
  description: text("description").array().notNull(), // bullet points
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  techStack: text("tech_stack").array().notNull(),
  description: text("description").array().notNull(),
  link: text("link"),
});

export const education = pgTable("education", {
  id: serial("id").primaryKey(),
  institution: text("institution").notNull(),
  degree: text("degree").notNull(),
  year: text("year").notNull(),
});

// Schemas
export const insertProfileSchema = createInsertSchema(profile);
export const insertSkillSchema = createInsertSchema(skills);
export const insertExperienceSchema = createInsertSchema(experience);
export const insertProjectSchema = createInsertSchema(projects);
export const insertEducationSchema = createInsertSchema(education);

// Types
export type Profile = typeof profile.$inferSelect;
export type Skill = typeof skills.$inferSelect;
export type Experience = typeof experience.$inferSelect;
export type Project = typeof projects.$inferSelect;
export type Education = typeof education.$inferSelect;

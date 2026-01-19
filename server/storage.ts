import { db } from "./db";
import { 
  profile, skills, experience, projects, education,
  type Profile, type Skill, type Experience, type Project, type Education,
  type InsertProfile, type InsertSkill, type InsertExperience, type InsertProject, type InsertEducation
} from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  // Read operations
  getProfile(): Promise<Profile | undefined>;
  getSkills(): Promise<Skill[]>;
  getExperience(): Promise<Experience[]>;
  getProjects(): Promise<Project[]>;
  getEducation(): Promise<Education[]>;

  // Create operations (for seeding)
  createProfile(profile: InsertProfile): Promise<Profile>;
  createSkill(skill: InsertSkill): Promise<Skill>;
  createExperience(experience: InsertExperience): Promise<Experience>;
  createProject(project: InsertProject): Promise<Project>;
  createEducation(education: InsertEducation): Promise<Education>;
}

export class DatabaseStorage implements IStorage {
  async getProfile(): Promise<Profile | undefined> {
    const [result] = await db.select().from(profile).limit(1);
    return result;
  }

  async getSkills(): Promise<Skill[]> {
    return await db.select().from(skills);
  }

  async getExperience(): Promise<Experience[]> {
    return await db.select().from(experience);
  }

  async getProjects(): Promise<Project[]> {
    return await db.select().from(projects);
  }

  async getEducation(): Promise<Education[]> {
    return await db.select().from(education);
  }

  async createProfile(insertProfile: InsertProfile): Promise<Profile> {
    const [result] = await db.insert(profile).values(insertProfile).returning();
    return result;
  }

  async createSkill(insertSkill: InsertSkill): Promise<Skill> {
    const [result] = await db.insert(skills).values(insertSkill).returning();
    return result;
  }

  async createExperience(insertExperience: InsertExperience): Promise<Experience> {
    const [result] = await db.insert(experience).values(insertExperience).returning();
    return result;
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const [result] = await db.insert(projects).values(insertProject).returning();
    return result;
  }

  async createEducation(insertEducation: InsertEducation): Promise<Education> {
    const [result] = await db.insert(education).values(insertEducation).returning();
    return result;
  }
}

export const storage = new DatabaseStorage();

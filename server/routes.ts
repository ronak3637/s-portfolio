import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  // API Routes
  app.get(api.profile.get.path, async (req, res) => {
    const profile = await storage.getProfile();
    res.json(profile || {});
  });

  app.get(api.skills.list.path, async (req, res) => {
    const skills = await storage.getSkills();
    res.json(skills);
  });

  app.get(api.experience.list.path, async (req, res) => {
    const experience = await storage.getExperience();
    res.json(experience);
  });

  app.get(api.projects.list.path, async (req, res) => {
    const projects = await storage.getProjects();
    res.json(projects);
  });

  app.get(api.education.list.path, async (req, res) => {
    const education = await storage.getEducation();
    res.json(education);
  });

  app.post(api.contact.submit.path, async (req, res) => {
    try {
      const input = api.contact.submit.input.parse(req.body);
      // In a real app, we would send an email here.
      // For now, we'll just log it.
      console.log("Contact form submission:", input);
      res.json({ success: true });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  // Seed Data
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existingProfile = await storage.getProfile();
  if (!existingProfile) {
    console.log("Seeding database with resume data...");

    await storage.createProfile({
      name: "Shruti Zalavadiya",
      title: "Data Engineer",
      bio: "Data Analyst Intern and Master’s student in Advanced Computing with hands-on experience in Python, SQL, Power BI, and Excel. Skilled in building automated ETL pipelines, performing exploratory data analysis (EDA), and developing interactive dashboards. Strong foundation in data preprocessing, statistical analysis, and database management (PostgreSQL). Passionate about applying analytical skills to solve business problems and drive data-informed decisions.",
      email: "shrutizalavadiya24@gmail.com",
      phone: "+91-63524 13914",
      location: "Surat, Gujarat",
      linkedin: "https://linkedin.com", // Placeholder
      github: "https://github.com", // Placeholder
    });

    await storage.createSkill({
      category: "Analytical Tools",
      items: ["Excel", "Power BI", "Power Query"],
    });
    await storage.createSkill({
      category: "Languages",
      items: ["Python", "SQL"],
    });
    await storage.createSkill({
      category: "Technologies/Frameworks",
      items: ["GitHub", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Flask", "Power Automate", "n8n"],
    });
    await storage.createSkill({
      category: "Databases",
      items: ["PostgreSQL"],
    });
    await storage.createSkill({
      category: "Soft Skills",
      items: ["Problem-solving", "Collaboration", "Adaptability"],
    });

    await storage.createExperience({
      company: "Ybai Solutions",
      role: "Data Analyst Intern",
      duration: "Feb 2025 – Present",
      description: [
        "Built automated data pipelines using Python/Selenium, reducing manual data collection time by 80%.",
        "Designed ETL workflows with Flask API to support analytics projects.",
        "Created n8n workflows.",
        "Created interactive Power BI dashboards that improved competitor tracking and pricing analysis.",
        "Contributed to data gathering and preprocessing for AI/ML projects.",
        "Developed an end-to-end Azure Data Engineering pipeline integrating Data Lake, Databricks, SQL Database, and Power BI for data processing and analytics."
      ],
    });

    await storage.createProject({
      title: "Wearables Data Pipeline",
      techStack: ["Python", "Selenium", "Flask", "n8n", "Power BI"],
      description: [
        "Built an end-to-end data pipeline to scrape, clean, and store data.",
        "Integrated with n8n automation workflows to automatically upload processed datasets to OneDrive post-scraping.",
        "Delivered interactive Power BI dashboards for real-time price and availability insights."
      ],
      link: "https://github.com", // Placeholder
    });
    await storage.createProject({
      title: "Hotel Booking Cancellation Analysis",
      techStack: ["Python", "Pandas", "Matplotlib", "Seaborn"],
      description: [
        "Analyzed hotel reservation data to identify key cancellation factors.",
        "Suggested dynamic pricing and targeted campaigns to reduce cancellations."
      ],
      link: "https://github.com", // Placeholder
    });
    await storage.createProject({
      title: "Superstore Sales Analysis",
      techStack: ["Power BI", "DAX", "Excel"],
      description: [
        "Created a Power BI dashboard for sales trends, forecasting, and profitability KPIs.",
        "Enabled data-driven decisions for revenue and inventory planning."
      ],
      link: "https://github.com", // Placeholder
    });

    await storage.createEducation({
      institution: "Sarvajanik College of Engineering and Technology",
      degree: "MSc Advanced Computing",
      year: "Pursuing",
    });
    await storage.createEducation({
      institution: "Bhagwan Mahavir University",
      degree: "BSc Information Technology",
      year: "2021 – 2024",
    });

    console.log("Database seeded successfully!");
  }
}

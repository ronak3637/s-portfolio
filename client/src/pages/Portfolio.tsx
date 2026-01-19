import { Navigation } from "@/components/Navigation";
import { SectionHeading } from "@/components/SectionHeading";
import { 
  useProfile, 
  useSkills, 
  useExperience, 
  useProjects, 
  useEducation,
  useContact 
} from "@/hooks/use-portfolio";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { 
  Github, 
  Linkedin, 
  Mail, 
  MapPin, 
  Download, 
  ExternalLink, 
  Code2, 
  Database, 
  Terminal, 
  Server,
  Send,
  Loader2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { z } from "zod";

// Utility for creating staggered animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function Portfolio() {
  const { data: profile, isLoading: profileLoading } = useProfile();
  const { data: skills } = useSkills();
  const { data: experience } = useExperience();
  const { data: projects } = useProjects();
  const { data: education } = useEducation();
  const contactMutation = useContact();
  const { toast } = useToast();

  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await contactMutation.mutateAsync(contactForm);
      toast({
        title: "Message Sent",
        description: "Thank you for reaching out! I'll get back to you soon.",
      });
      setContactForm({ name: "", email: "", message: "" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-primary">
        <Loader2 className="w-12 h-12 animate-spin" />
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/30">
      <Navigation />

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center relative pt-16">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(14,165,233,0.1),_transparent_40%)]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-primary font-mono text-lg mb-4">Hello, I'm</h2>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                {profile.name}
              </h1>
              <div className="text-2xl md:text-3xl text-muted-foreground font-semibold mb-8 h-20">
                <TypeAnimation
                  sequence={[
                    profile.title,
                    2000,
                    'Data Engineer',
                    2000,
                    'ETL Specialist',
                    2000,
                    'Analytics Expert',
                    2000,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                />
              </div>
              <p className="text-lg text-muted-foreground mb-8 max-w-lg leading-relaxed">
                Transforming complex data into actionable insights. Building robust pipelines and scalable data architectures.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <a 
                  href="#contact" 
                  className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center gap-2"
                >
                  <Mail size={18} /> Contact Me
                </a>
                <a 
                  href="#" // Assuming resume download link would be here
                  className="px-6 py-3 rounded-lg border border-border bg-card hover:bg-secondary transition-all font-semibold flex items-center gap-2"
                >
                  <Download size={18} /> Download CV
                </a>
              </div>

              <div className="mt-12 flex gap-6 text-muted-foreground">
                {profile.github && (
                  <a href={profile.github} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                    <Github size={24} />
                  </a>
                )}
                {profile.linkedin && (
                  <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                    <Linkedin size={24} />
                  </a>
                )}
                <a href={`mailto:${profile.email}`} className="hover:text-primary transition-colors">
                  <Mail size={24} />
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="hidden lg:flex justify-center"
            >
              <div className="relative w-80 h-80 md:w-96 md:h-96">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="relative w-full h-full rounded-full border-2 border-primary/20 bg-card/50 backdrop-blur-sm flex items-center justify-center overflow-hidden shadow-2xl">
                  {/* Stylish Avatar Placeholder */}
                  <div className="text-8xl font-black text-primary/50 font-mono tracking-tighter select-none">
                    SZ
                  </div>
                </div>
                
                {/* Floating Tech Icons */}
                <motion.div 
                  animate={{ y: [0, -20, 0] }} 
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="absolute -top-4 -right-4 bg-card p-4 rounded-xl border border-border shadow-lg"
                >
                  <Database className="text-primary w-8 h-8" />
                </motion.div>
                <motion.div 
                  animate={{ y: [0, 20, 0] }} 
                  transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                  className="absolute bottom-10 -left-8 bg-card p-4 rounded-xl border border-border shadow-lg"
                >
                  <Terminal className="text-accent w-8 h-8" />
                </motion.div>
                <motion.div 
                  animate={{ x: [0, 20, 0] }} 
                  transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 2 }}
                  className="absolute -bottom-4 right-10 bg-card p-4 rounded-xl border border-border shadow-lg"
                >
                  <Server className="text-blue-400 w-8 h-8" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-secondary/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="About Me" subtitle="A little bit about my background" centered />
          
          <div className="glass-panel rounded-2xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <Code2 size={120} />
            </div>
            
            <p className="text-lg leading-relaxed mb-8 text-muted-foreground">
              {profile.bio}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium">{profile.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{profile.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Technical Skills" subtitle="My toolbox for data engineering" />
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {skills?.map((skillGroup, index) => (
              <motion.div 
                key={index} 
                variants={itemVariants}
                className="bg-card rounded-xl p-6 border border-border hover:border-primary/50 transition-colors shadow-lg"
              >
                <h3 className="text-xl font-bold mb-6 text-primary border-b border-border pb-2">
                  {skillGroup.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill) => (
                    <span 
                      key={skill} 
                      className="px-3 py-1 bg-secondary rounded-full text-sm font-medium text-foreground border border-white/5 hover:bg-primary/20 hover:text-primary transition-colors cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 bg-secondary/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Experience" centered />
          
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-accent to-primary opacity-30 rounded-full"></div>

            <div className="space-y-12">
              {experience?.map((exp, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`flex flex-col md:flex-row gap-8 relative ${
                    index % 2 === 0 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-[-11px] md:left-1/2 md:-ml-[11px] top-0 w-6 h-6 rounded-full bg-background border-4 border-primary z-10"></div>
                  
                  {/* Content - Empty half for desktop layout */}
                  <div className="hidden md:block w-1/2"></div>
                  
                  {/* Content - Card */}
                  <div className="w-full md:w-1/2 pl-8 md:pl-0">
                    <div className={`glass-panel rounded-xl p-6 ${
                      index % 2 === 0 ? "md:mr-12" : "md:ml-12"
                    }`}>
                      <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-3">
                        {exp.duration}
                      </span>
                      <h3 className="text-xl font-bold">{exp.role}</h3>
                      <h4 className="text-lg text-muted-foreground mb-4 font-mono">{exp.company}</h4>
                      <ul className="space-y-2">
                        {exp.description.map((item, i) => (
                          <li key={i} className="flex gap-2 text-sm text-gray-300">
                            <span className="text-primary mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Featured Projects" subtitle="Some of the key projects I've worked on" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects?.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-card rounded-xl overflow-hidden border border-border shadow-lg flex flex-col h-full group"
              >
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{project.title}</h3>
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                        <ExternalLink size={20} />
                      </a>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.techStack.map((tech) => (
                      <span key={tech} className="text-xs font-mono px-2 py-1 rounded bg-secondary text-primary/80 border border-primary/10">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <ul className="space-y-2 mt-auto">
                    {project.description.slice(0, 3).map((desc, i) => (
                      <li key={i} className="text-sm text-muted-foreground pl-3 border-l-2 border-primary/20">
                        {desc}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 bg-secondary/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Education" centered />
          
          <div className="space-y-6">
            {education?.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="glass-panel p-6 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
              >
                <div>
                  <h3 className="text-xl font-bold text-foreground">{edu.institution}</h3>
                  <p className="text-primary font-medium">{edu.degree}</p>
                </div>
                <div className="px-4 py-2 bg-background rounded-lg border border-border font-mono text-sm">
                  {edu.year}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Get In Touch" subtitle="Have a question or want to work together?" centered />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card border border-border rounded-2xl p-8 shadow-2xl"
          >
            <form onSubmit={handleContactSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-muted-foreground">Name</label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    placeholder="Your name"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-muted-foreground">Email</label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-muted-foreground">Message</label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                  placeholder="How can I help you?"
                />
              </div>

              <button
                type="submit"
                disabled={contactMutation.isPending}
                className="w-full py-4 rounded-lg bg-gradient-to-r from-primary to-accent text-white font-bold text-lg hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {contactMutation.isPending ? (
                  <>Sending...</>
                ) : (
                  <>Send Message <Send size={20} /></>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-background border-t border-border text-center text-muted-foreground text-sm">
        <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
      </footer>
    </div>
  );
}

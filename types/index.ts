export interface Project {
  title: string;
  description: string;
  technologies: string[];
  image?: string;
  liveLink?: string;
  repoLink?: string;
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface NavItem {
  name: string;
  href: string;
}

export interface SocialLink {
  name: string;
  href: string;
  icon: "github" | "linkedin" | "dribbble" | "figma";
}

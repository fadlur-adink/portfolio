"use client";

import PersonIcon from "@mui/icons-material/Person";
import FolderIcon from "@mui/icons-material/Folder";
import BuildIcon from "@mui/icons-material/Build";
import EmailIcon from "@mui/icons-material/Email";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import DescriptionIcon from "@mui/icons-material/Description";
import { AppDefinition } from "@/types/window";
import { AboutApp } from "@/components/apps/about-app";
import { ProjectsApp } from "@/components/apps/projects-app";
import { SkillsApp } from "@/components/apps/skills-app";
import { ContactApp } from "@/components/apps/contact-app";
import { WelcomeApp } from "@/components/apps/welcome-app";
import { SettingsApp } from "@/components/apps/settings-app";
import { ResumeApp } from "@/components/apps/resume-app";

export const apps: AppDefinition[] = [
  {
    id: "welcome",
    title: "Welcome",
    icon: <HomeIcon />,
    defaultSize: { width: 500, height: 550 },
    component: <WelcomeApp />,
  },
  {
    id: "about",
    title: "About Me",
    icon: <PersonIcon />,
    defaultSize: { width: 700, height: 500 },
    component: <AboutApp />,
  },
  {
    id: "projects",
    title: "Projects",
    icon: <FolderIcon />,
    defaultSize: { width: 800, height: 600 },
    component: <ProjectsApp />,
  },
  {
    id: "skills",
    title: "Skills",
    icon: <BuildIcon />,
    defaultSize: { width: 600, height: 450 },
    component: <SkillsApp />,
  },
  {
    id: "contact",
    title: "Contact",
    icon: <EmailIcon />,
    defaultSize: { width: 650, height: 450 },
    component: <ContactApp />,
  },
  {
    id: "resume",
    title: "Resume",
    icon: <DescriptionIcon />,
    defaultSize: { width: 800, height: 800 },
    component: <ResumeApp />,
  },
  {
    id: "settings",
    title: "Settings",
    icon: <SettingsIcon />,
    defaultSize: { width: 700, height: 500 },
    component: <SettingsApp />,
  },
];

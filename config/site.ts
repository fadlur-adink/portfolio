import type { NavItem } from "@/types";

export const siteConfig = {
	name: "Fadlur Rahman",
	title: "Fadlur Rahman | Front-end Developer",
	description: "Portfolio of front-end developer",
	email: "fadlur612@gmail.com",
	discord: "Fadlur#1234",
	links: {
		github: "https://github.com/fadlur-adink",
		linkedin: "https://www.linkedin.com/in/fadlur-rahman-122952154/",
		dribbble: "https://dribbble.com",
		figma: "https://figma.com",
	},
	currentProject: "Portfolio",
	repoName: "portfolio",
} as const;

export const navigation: NavItem[] = [
	{ name: "home", href: "/#home" },
	{ name: "works", href: "/#works" },
	{ name: "about-me", href: "/#about-me" },
	{ name: "contacts", href: "/#contacts" },
];

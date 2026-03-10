import type { NavItem } from "@/types";

const isProd = process.env.NODE_ENV === "production";
const repoName = "portfolio";

export const siteConfig = {
	name: "Fadlur Rahman",
	title: "Fadlur Rahman | Front-end Developer",
	description:
		"Portfolio of Fadlur Rahman — a front-end developer with 4+ years of experience building modern web and mobile applications with React, Next.js, and React Native. Based in Jakarta, Indonesia.",
	email: "fadlur612@gmail.com",
	discord: "Fadlur#1234",
	url: isProd
		? `https://fadlur-adink.github.io/${repoName}`
		: "http://localhost:3000",
	ogImage: "/images/hero.png",
	keywords: [
		"Fadlur Rahman",
		"front-end developer",
		"React developer",
		"Next.js developer",
		"React Native developer",
		"web developer portfolio",
		"Jakarta developer",
		"Indonesia developer",
		"frontend engineer",
	],
	links: {
		github: "https://github.com/fadlur-adink",
		linkedin: "https://www.linkedin.com/in/fadlur-rahman-122952154/",
		dribbble: "https://dribbble.com",
		figma: "https://figma.com",
	},
	currentProject: "Portfolio",
	repoName,
} as const;

export const navigation: NavItem[] = [
	{ name: "home", href: "/#home" },
	{ name: "works", href: "/#works" },
	{ name: "about-me", href: "/#about-me" },
	{ name: "contacts", href: "/#contacts" },
];

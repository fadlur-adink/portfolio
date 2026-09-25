import type { Project } from "@/types";

const githubProjects: Project[] = [
	{
		title: "JDPOS",
		description:
			"A mobile point-of-sale application for cashier transactions, payments, product management, stocktaking, purchase orders, and sales reports. Built with React Native and Expo, with Bluetooth receipt-printer integration.",
		technologies: ["React Native", "Expo", "TypeScript", "Zustand", "TanStack Query"],
		repoLink: "https://github.com/fadlur-adink/JDPOS",
		repoPrivate: true,
	},
	{
		title: "Portfolio",
		description:
			"An OS-style developer portfolio with draggable and resizable app windows, a desktop dock, customizable themes, and instant English/Indonesian language switching. Built with Next.js, React, and Material UI and deployed to GitHub Pages.",
		technologies: ["Next.js", "React", "TypeScript", "Material UI", "Framer Motion"],
		liveLink: "https://fadlur-adink.github.io/portfolio",
		repoLink: "https://github.com/fadlur-adink/portfolio",
	},
	{
		title: "Vigil",
		description:
			"A team-wide AI code review platform for GitHub pull requests and GitLab merge requests. Processes events through a background review pipeline and provides a shared dashboard with review reports, history, analytics, and reviewer suggestions without writing back to repositories.",
		technologies: ["Next.js", "React", "TypeScript", "PostgreSQL", "Drizzle ORM", "Tailwind CSS"],
		repoLink: "https://github.com/fadlur-adink/vigil",
		repoPrivate: true,
	},
	{
		title: "SkillIssue",
		description:
			"A playful VS Code extension that reacts to failed builds, tests, lint checks, and compilation with a laughing-cat panel and audio. Observes tasks, Jest test runs, and terminal commands without changing their output or exit codes.",
		technologies: ["TypeScript", "VS Code API", "Node.js", "Mocha"],
		repoLink: "https://github.com/fadlur-adink/skillissue-vscode-extension",
	},
	{
		title: "Argos",
		description:
			"A self-hosted AI code review assistant that turns GitLab merge request email notifications into private, structured review reports. Uses isolated Git worktrees, SQLite deduplication, a web dashboard, and optional Telegram, email, and desktop notifications.",
		technologies: ["TypeScript", "Node.js", "Express", "SQLite", "Google Apps Script"],
		repoLink: "https://github.com/fadlur-adink/argos",
	},
	{
		title: "SICEM v1",
		description:
			"An agency-focused website builder with theme-based sections, visual content editing, and live previews. Combines a reusable rendering system, a client-facing CMS, and a hybrid export pipeline for static pages and dynamic content.",
		technologies: ["Next.js", "React", "TypeScript", "Zustand", "Drizzle ORM", "Tailwind CSS"],
		repoLink: "https://github.com/fadlur-adink/sicem-v1",
		repoPrivate: true,
	},
];

export const projects: Project[] = [
	{
		title: "Coop Access Dashboard",
		description:
			"Developed robust software solutions, web dashboards, and scalable front-end architectures. For this project, I was responsible for " +
			"developing a web dashboard for Coop Access, a company that provides access to cooperative services. The dashboard is used to " +
			"manage and monitor the cooperative's services, and it is used by the cooperative's employees to provide services to customers.",
		technologies: ["React", "Next.js", "Material UI", "Redux"],
		image: "",
		liveLink: "#",
		repoLink: "#",
	},
	{
		title: "Coop Access POS Dashboard",
		description:
			"Coop Access POS Dashboard is a web-based Point of Sale (POS) application built with Next.js, a dashboard for POS users to manage and monitor the cooperative's services.",
		technologies: ["React", "Next.js", "Material UI", "Redux"],
		image: "",
		liveLink: "#",
		repoLink: "#",
	},
	{
		title: "Coop Access POS Mobile",
		description:
			"Coop Access POS Mobile is a mobile application built with React Native, developed for Coop Access to enable " +
			"customers to purchase and manage their cooperative services through their mobile devices. The application provides a " +
			"seamless and user-friendly interface for customers to access and utilize the cooperative's services, enhancing " +
			"convenience and accessibility for members. This project demonstrates the implementation of mobile application " +
			"development, user interface design, and service integration within a modern mobile ecosystem.",
		technologies: [
			"React Native",
			"Redux",
			"Thermal Printer",
			"Barcode Scanner Device",
			"React Native Paper",
		],
		image: "",
		liveLink: "#",
		repoLink: "#",
	},
	{
		title: "SECaaS Lalala",
		description:
			"SECaaS Lalala is a web-based facial registration platform built with Next.js, developed for Lalala Fest 2025 to enable " +
			"customers to securely register their faces for event access and identity verification. The application integrates " +
			"TensorFlow.js with the BlazeFace model to perform real-time face detection and recognition directly in the browser, " +
			"providing a fast and privacy-friendly client-side biometric solution. The system includes an advanced face posture " +
			"and alignment validation engine that analyzes facial landmarks to ensure high-quality image capture. It automatically " +
			"detects and prevents invalid submissions when the face is tilted sideways, rotated, looking too far up or down, " +
			"or when multiple faces appear in the frame. These validations significantly improve the accuracy and reliability " +
			"of the facial recognition process. In addition to live camera capture, the application supports bulk registration " +
			"via Excel upload, allowing organizers to import customer data along with their facial images at scale. Each uploaded " +
			"image is automatically validated using the same face detection and posture-checking pipeline to guarantee consistency " +
			"and data integrity across large datasets. This project demonstrates the implementation of computer vision in the " +
			"browser, real-time validation workflows, and scalable data processing within a modern web application, highlighting " +
			"strong frontend engineering skills in building complex, high-performance, and user-focused interfaces.",
		technologies: ["React", "Next.js", "Material UI", "TensorFlow.js"],
		image: "",
		liveLink: "#",
		repoLink: "#",
	},
	{
		title: "SECaaS POS",
		description:
			"SECaaS POS is a web-based Point of Sale (POS) application built with Next.js, designed for the BRI Purwokerto Museum to " +
			"manage and sell museum tickets efficiently. The application runs in a dual-screen kiosk environment, where one screen is dedicated " +
			"to the cashier and the other is facing the customer, providing a real-time view of purchased tickets and total payment amount. " +
			"The system leverages the Broadcast Channel API to synchronize transaction data between both screens instantly, ensuring a seamless " +
			"and transparent checkout experience. After the cashier completes a transaction, the application automatically generates and prints " +
			"a QR-code-based ticket via a connected thermal printer, which is later scanned at the entrance gate for visitor access control. " +
			"The POS application is optimized for kiosk mode, launching automatically when the computer boots and running directly in the browser " +
			"for a controlled and secure user environment. This project demonstrates the implementation of real-time communication, hardware " +
			"integration, and responsive UI design within a modern web application architecture, delivering a reliable and user-friendly " +
			"ticketing system for a public-facing institution.",
		technologies: [
			"React",
			"Next.js",
			"Material UI",
			"Broadcast Channel API",
			"Thermal Printer",
		],
		image: "",
		liveLink: "#",
		repoLink: "#",
	},
	...githubProjects,
];

// Featured projects for home page (first 5)
export const featuredProjects = projects.slice(0, 5);

// Additional projects for projects page
export const completeApps: Project[] = [
	...githubProjects,
	{
		title: "Coop Access Dashboard",
		description:
			"Developed robust software solutions, web dashboards, and scalable front-end architectures.",
		technologies: ["React", "Next.js", "Redux", "TypeScript"],
		image: "",
		liveLink: "#",
		repoLink: "#",
	},
	{
		title: "ProtectX",
		description: "Discord anti-crash bot",
		technologies: ["React", "Express", "Discord.js", "Node.js"],
		image: "/images/protectx.png",
		liveLink: "#",
		repoLink: "#",
	},
	{
		title: "Kahoot Answers Viewer",
		description: "Get answers to your kahoot quiz",
		technologies: ["CSS", "Express", "Node.js"],
		image: "/images/kahoot.png",
		liveLink: "#",
		repoLink: "#",
	},
];

export const smallProjects: Project[] = [
	{
		title: "BotMarket",
		description: "Bot marketplace for discord bots",
		technologies: ["HTML", "CSS", "JS"],
		image: "",
		liveLink: "#",
		repoLink: "#",
	},
	{
		title: "Omen",
		description: "Advanced multipurpose discord bot",
		technologies: ["TS", "Discord.js"],
		image: "",
		liveLink: "#",
		repoLink: "#",
	},
	{
		title: "Wallpapers",
		description: "Desktop wallpapers sharing platform",
		technologies: ["Vue", "Nuxt", "Firebase"],
		image: "",
		liveLink: "#",
		repoLink: "#",
	},
	{
		title: "System Monitor",
		description: "Real-time system resource monitor",
		technologies: ["Rust", "Tauri", "React"],
		image: "",
		liveLink: "#",
		repoLink: "#",
	},
];

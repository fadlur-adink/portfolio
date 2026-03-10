import type { Metadata } from "next";
import AboutMeContent from "./about-me-content";

export const metadata: Metadata = {
	title: "About Me",
	description:
		"Learn about Fadlur Rahman — a front-end developer with 4+ years of experience in React, Next.js, and React Native. Explore skills, background, and expertise.",
	openGraph: {
		title: "About Me | Fadlur Rahman",
		description:
			"Learn about Fadlur Rahman — a front-end developer with 4+ years of experience in React, Next.js, and React Native.",
	},
};

export default function AboutMePage() {
	return <AboutMeContent />;
}

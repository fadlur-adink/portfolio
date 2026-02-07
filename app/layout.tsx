import type { Metadata } from "next";
import ThemeRegistry from "./theme/ThemeRegistry";
import "./globals.css";

export const metadata: Metadata = {
	title: "Fadlur Rahman | Front-end Developer",
	description: "Portfolio of front-end developer",
};

import ClientLayout from "./components/ClientLayout";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<ThemeRegistry>
					<ClientLayout>{children}</ClientLayout>
				</ThemeRegistry>
			</body>
		</html>
	);
}

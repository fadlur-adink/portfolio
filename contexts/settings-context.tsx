"use client";

import {
	createContext,
	useContext,
	useState,
	useEffect,
	useCallback,
	type ReactNode,
} from "react";
import {
	type Settings,
	type ColorScheme,
	defaultSettings,
	colorSchemes,
	fontFamilies,
	fontSizes,
} from "@/config/settings";
import { useRouter } from "next/navigation";

interface SettingsContextType {
	settings: Settings;
	currentScheme: ColorScheme;
	updateSettings: (updates: Partial<Settings>) => void;
	resetSettings: () => void;
}

const SettingsContext = createContext<SettingsContextType | null>(null);

const STORAGE_KEY = "portfolio-settings";

function getStoredSettings(): Settings {
	if (typeof window === "undefined") {
		return defaultSettings;
	}

	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored) {
			const parsed = JSON.parse(stored) as Partial<Settings>;
			return { ...defaultSettings, ...parsed };
		}
	} catch {
		return defaultSettings;
	}

	return defaultSettings;
}

function applySettingsToDocument(settings: Settings, scheme: ColorScheme) {
	if (typeof document === "undefined") return;

	const root = document.documentElement;

	root.style.setProperty("--font-family", fontFamilies[settings.fontFamily]);

	const size = fontSizes[settings.fontSize];
	root.style.setProperty("--font-size-base", `${size.base}px`);
	root.style.setProperty("--font-scale", `${size.scale}`);

	root.style.setProperty("--color-primary-main", scheme.primary.main);
	root.style.setProperty("--color-primary-light", scheme.primary.light);
	root.style.setProperty("--color-primary-dark", scheme.primary.dark);
	root.style.setProperty("--color-bg-default", scheme.background.default);
	root.style.setProperty("--color-bg-paper", scheme.background.paper);
	root.style.setProperty("--color-text-primary", scheme.text.primary);
	root.style.setProperty("--color-text-secondary", scheme.text.secondary);
	root.style.setProperty("--color-divider", scheme.divider);
}

export function SettingsProvider({ children }: { children: ReactNode }) {
	const [settings, setSettings] = useState<Settings>(defaultSettings);
	const [isHydrated, setIsHydrated] = useState(false);
	const router = useRouter();

	useEffect(() => {
		const stored = getStoredSettings();
		setSettings(stored);
		setIsHydrated(true);
	}, []);

	const currentScheme =
		colorSchemes.find((s) => s.id === settings.colorScheme) ||
		colorSchemes[0];

	useEffect(() => {
		if (isHydrated) {
			applySettingsToDocument(settings, currentScheme);
		}
	}, [settings, currentScheme, isHydrated]);

	useEffect(() => {
		if (isHydrated) {
			try {
				localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
			} catch {
				/* empty */
			}
		}
	}, [settings, isHydrated]);

	const updateSettings = useCallback((updates: Partial<Settings>) => {
		setSettings((prev) => ({ ...prev, ...updates }));

		// If language changed, set cookie for persistence (optional in static export)
		if (updates.language) {
			document.cookie = `locale=${updates.language};path=/;max-age=31536000`;
			// router.refresh(); // Disabled for static export to prevent reload flicker
		}
	}, []);

	const resetSettings = useCallback(() => {
		setSettings(defaultSettings);
		try {
			localStorage.removeItem(STORAGE_KEY);
		} catch {
			/* empty */
		}
		// Reset language cookie to default
		document.cookie = `locale=${defaultSettings.language};path=/;max-age=31536000`;
		// router.refresh(); // Disabled for static export
	}, []);

	return (
		<SettingsContext.Provider
			value={{
				settings,
				currentScheme,
				updateSettings,
				resetSettings,
			}}
		>
			{children}
		</SettingsContext.Provider>
	);
}

export function useSettings() {
	const context = useContext(SettingsContext);
	if (!context) {
		throw new Error("useSettings must be used within a SettingsProvider");
	}
	return context;
}

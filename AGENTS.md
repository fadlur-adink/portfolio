# PROJECT KNOWLEDGE BASE

**Generated:** 2026-09-25
**Commit:** 8721a24
**Branch:** main

## OVERVIEW

OS-style desktop portfolio built with Next.js 16 App Router, React 19, MUI 7, react-rnd, framer-motion. Draggable/resizable windows on a desktop shell, dynamic theming, client-side i18n (en/id) via next-intl. Static export (`output: "export"`) deployed to GitHub Pages.

## STRUCTURE

```
fadlur-porto/
├── app/                  # App Router: / (desktop shell), /about-me, /projects
│   ├── layout.tsx        # Root layout: SEO metadata + JSON-LD + ThemeRegistry wrapper
│   ├── robots.ts         # Static robots.txt from siteConfig
│   └── sitemap.ts        # Static sitemap.xml from siteConfig
├── components/           # See components/AGENTS.md
│   ├── apps/             # Window content apps (+ settings/ sub-panels)
│   ├── desktop/          # Shell: Desktop, Dock, DesktopIcon, top-bar/ (dir)
│   ├── window/           # Window frame (react-rnd) + TitleBar.tsx
│   ├── i18n/             # DynamicI18nProvider — client-side locale switching
│   └── ui/               # Shared primitives
├── config/
│   ├── apps.tsx          # App definitions registry (7 apps)
│   ├── site.ts           # siteConfig: SEO, URLs, socials (10 importers)
│   ├── settings.ts       # ColorScheme[] (16: 12 dark + 4 light), fonts, Settings type
│   └── theme.ts          # createAppTheme() - MUI theme factory
├── contexts/             # React contexts (client)
│   ├── settings-context.tsx        # Settings state + localStorage + CSS vars
│   └── window-manager-context.tsx  # Window state reducer + module-level appRegistry
├── i18n/request.ts       # next-intl server config — locale hardcoded "en" (static export)
├── lib/
│   ├── theme-registry.tsx # Provider chain: AppRouterCache → Settings → I18n → Theme
│   └── format-date.ts    # date-fns wrapper with Indonesian locale
├── data/                 # Static content: projects.ts, skills.ts
├── messages/             # Translation JSON (en.json, id.json)
└── types/                # window.ts (WindowState, AppDefinition, WindowAction), index.ts
```

## WHERE TO LOOK

| Task | Location | Notes |
|------|----------|-------|
| Add new app | `config/apps.tsx` | Append to `apps[]`: id, title, icon, defaultSize, component |
| Add app content | `components/apps/` | Create `<name>-app.tsx`, named export |
| Settings panels | `components/apps/settings/` | AppearancePanel, AboutPanel + primitives (ColorSchemeCard, SidebarItem…) |
| Window behavior | `contexts/window-manager-context.tsx` | Reducer: OPEN/CLOSE/MINIMIZE/MAXIMIZE/FOCUS/MOVE/RESIZE/REGISTER |
| Theming | `config/theme.ts` + `config/settings.ts` | createAppTheme(scheme, settings) |
| Add color scheme | `config/settings.ts` | Append to `colorSchemes[]` |
| Site metadata / SEO | `config/site.ts` | siteConfig — `repoName` MUST match `next.config.mjs` |
| Translations | `messages/*.json` | Namespaces: Settings, About, Welcome, Projects, Skills, Contact |
| Language switching | `components/i18n/dynamic-i18n-provider.tsx` | Client-side dynamic import — no reload |
| Desktop chrome / TopBar | `components/desktop/top-bar/index.tsx` | Clock, CurrentDate + AnalogClock/Calendar dropdowns |
| Deploy | `.github/workflows/nextjs.yml` | Push to main → next build → GitHub Pages (Node 20) |
| SEO routes | `app/robots.ts`, `app/sitemap.ts` | Driven by siteConfig |

## CODE MAP

| Symbol | Type | Location | Refs | Role |
|--------|------|----------|------|------|
| `useWindowManager` | Hook | contexts/window-manager-context.tsx | 10 | Window actions — most central API |
| `WindowManagerProvider` | Context | contexts/window-manager-context.tsx | 1 | Reducer state + module-level `appRegistry` Map |
| `SettingsProvider` / `useSettings` | Context | contexts/settings-context.tsx | 2 | Settings state, localStorage, CSS var injection |
| `ThemeRegistry` | Component | lib/theme-registry.tsx | 1 | Provider composition root (client boundary) |
| `DynamicI18nProvider` | Component | components/i18n/dynamic-i18n-provider.tsx | 1 | Runtime locale switch via dynamic import |
| `DesktopLayout` | Component | components/layout/desktop-layout.tsx | 1 | WindowManagerProvider + Desktop (used by app/page.tsx) |
| `Desktop` | Component | components/desktop/desktop.tsx | 1 | Shell: TopBar, icons, windows, Dock; calls registerApp() |
| `TopBar` | Component | components/desktop/top-bar/index.tsx | 1 | Fixed bar + clock/calendar dropdowns |
| `Window` | Component | components/window/window.tsx | 1 | react-rnd frame driven by WindowState |
| `TitleBar` | Component | components/window/TitleBar.tsx | 1 | Window chrome (default export) |
| `createAppTheme` | Function | config/theme.ts | — | MUI theme from ColorScheme + Settings |
| `siteConfig` | Const | config/site.ts | 10 | Site identity, URLs, SEO, socials |
| `apps` | Array | config/apps.tsx | 1 | App definitions registry |

## CONVENTIONS

- All components under `components/` are client components; NEW files must carry `"use client"` themselves — several (TitleBar, top-bar/*, apps/settings/*) rely on parent boundary only (fragile)
- Theme colors via `useTheme()` hook, NOT direct imports from config
- Extended MUI palette: `theme.palette.primaryLight`, `theme.palette.primaryDark`
- Window title bar uses `.window-drag-handle` class for react-rnd drag handle
- i18n: `useTranslations("Namespace")` from next-intl, keys in `messages/*.json`, typed via `global.d.ts`
- TypeScript path alias: `@/*` maps to project root
- Indentation is MIXED (no formatter configured): tabs in `config/`, `i18n/`, `lib/format-date.ts`; 2-space in `contexts/`, `app/`, `types/`
- Export styles: app components = named export; `top-bar/*` and `window/TitleBar` = default export; `ui/` mixed via barrel `index.ts`

## ANTI-PATTERNS (THIS PROJECT)

- **DO NOT** import colors directly from `config/colors.ts` (dead file, zero importers)
- **DO NOT** use `as any`, `@ts-ignore`, or `@ts-expect-error`
- **DO NOT** create new contexts without considering provider hierarchy in `lib/theme-registry.tsx`
- **DO NOT** use `onMouseDown`/`onClick` for window buttons - use `onPointerDown` for mobile support
- **DO NOT** position windows above `TOP_BAR_HEIGHT` (40px) — constant duplicated in 3 places (`window.tsx`, `top-bar/index.tsx`, `globals.css`); change all together
- **DO NOT** import from `hooks/use-draggable.ts` (dead code — superseded by react-rnd; also uses mouse events, violating the pointer-event rule)
- **DO NOT** add new module-level mutable state (module-scope `appRegistry` Map in window-manager-context is a legacy landmine: OPEN_WINDOW before registerApp silently no-ops)
- **DO NOT** rely on server-side locale — `i18n/request.ts` hardcodes `"en"`; locale switching is client-only

## UNIQUE STYLES

- z-index ladder: TopBar 9999, Dock 9998, TopBar dropdowns 10000; windows get monotonically increasing `nextZIndex`
- Window animations: `scaleIn` keyframe on mount; minimize flies toward dock icon position (framer-motion AnimatePresence)
- Desktop boot animation: `fadeIn` background, `slideDown` TopBar, staggered `scaleIn` icons
- react-rnd bounds: `"window"` with manual `TOP_BAR_HEIGHT` enforcement in `onDrag`

## COMMANDS

```bash
npm run dev      # Dev server (Turbopack, :3000)
npm run build    # Static export → out/ (basePath /portfolio in prod)
npm run lint     # ESLint (next/core-web-vitals + next/typescript)
npm ci           # npm only — yarn.lock removed
```

No test runner configured (no jest/vitest/playwright installed, no test step in CI).

## NOTES

- `repoName` in `next.config.mjs` must equal `config/site.ts` `repoName` ("portfolio") — basePath, assetPrefix and siteConfig.url all derive from it
- Language change is instant: `DynamicI18nProvider` dynamic-imports `messages/<lang>.json`; cookie set, but server locale stays `"en"` (static export)
- Hydration flash: `getStoredSettings()` returns defaults server-side, localStorage values client-side (gated by `isHydrated`)
- `app/globals.css` uses `!important` overrides to beat react-rnd inline styles when maximized — fragile
- `window.id` = `window-${Date.now()}` — collision risk on programmatic batch open
- `app/fonts/*.woff` are unused (fonts load via next/font/google in theme.ts)
- Dead files: `config/colors.ts`, `hooks/use-draggable.ts`. Legacy but present: `components/layout/{client-layout,navbar,footer,social-sidebar}`; `components/sections/skills-section.tsx` still used by /about-me route
- `google4b21f875a716b33a.html` duplicated at root and `public/`; `package.json` name is placeholder `"temp_app"`
- Stale `@playwright/test` entry in `package-lock.json` (not in package.json, not installed)

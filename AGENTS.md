# PROJECT KNOWLEDGE BASE

**Generated:** 2026-02-08
**Commit:** 58fb945
**Branch:** main

## OVERVIEW

OS-style desktop portfolio built with Next.js 16 App Router, React 19, MUI 7, react-rnd. Renders draggable/resizable windows on a desktop shell with dynamic theming and i18n via next-intl.

## STRUCTURE

```
fadlur-porto/
├── app/                  # Next.js App Router pages
│   ├── layout.tsx        # Root layout: i18n + ThemeRegistry wrapper
│   └── page.tsx          # Home: renders DesktopLayout
├── components/           # See components/AGENTS.md
│   ├── apps/             # Window content apps (Welcome, About, Settings...)
│   ├── desktop/          # Shell: Desktop, TopBar, Dock, DesktopIcon
│   ├── window/           # Window frame with react-rnd
│   └── ui/               # Shared primitives
├── config/               # App configuration
│   ├── apps.tsx          # App definitions registry
│   ├── settings.ts       # ColorScheme[], fontFamilies, fontSizes
│   └── theme.ts          # createAppTheme() - MUI theme factory
├── contexts/             # React contexts (client)
│   ├── settings-context.tsx      # Settings state + cookie-based i18n
│   └── window-manager-context.tsx # Window state reducer
├── i18n/request.ts       # next-intl server config (cookie-based locale)
├── lib/theme-registry.tsx # Provider composition: AppRouterCache → Settings → Theme
├── messages/             # Translation JSON (en.json, id.json)
└── types/window.ts       # WindowState, AppDefinition, WindowAction types
```

## WHERE TO LOOK

| Task | Location | Notes |
|------|----------|-------|
| Add new app | `config/apps.tsx` | Add to `apps[]` array with id, title, icon, defaultSize, component |
| Add app content | `components/apps/` | Create `*-app.tsx`, export named function |
| Window behavior | `contexts/window-manager-context.tsx` | Reducer handles OPEN/CLOSE/MINIMIZE/MAXIMIZE/MOVE/RESIZE |
| Theming | `config/theme.ts` + `config/settings.ts` | createAppTheme(scheme, settings) |
| Add color scheme | `config/settings.ts` | Add to `colorSchemes[]` |
| i18n translations | `messages/*.json` | Namespaced: Settings, About, Welcome, etc. |
| Change language | `contexts/settings-context.tsx` | Sets cookie + reloads page |
| Desktop chrome | `components/desktop/top-bar.tsx` | Clock, calendar dropdowns, settings button |

## CODE MAP

| Symbol | Type | Location | Role |
|--------|------|----------|------|
| `WindowManagerProvider` | Context | contexts/window-manager-context.tsx | Global window state |
| `useWindowManager` | Hook | contexts/window-manager-context.tsx | Window actions: open/close/minimize/maximize/focus/move/resize |
| `SettingsProvider` | Context | contexts/settings-context.tsx | Settings + currentScheme |
| `useSettings` | Hook | contexts/settings-context.tsx | Access settings, updateSettings |
| `createAppTheme` | Function | config/theme.ts | Creates MUI theme from ColorScheme + Settings |
| `Desktop` | Component | components/desktop/desktop.tsx | Main shell: renders TopBar, icons, windows |
| `Window` | Component | components/window/window.tsx | Draggable/resizable frame via react-rnd |
| `apps` | Array | config/apps.tsx | App definitions with components |

## CONVENTIONS

- All components under `components/` are client components (`"use client"`)
- Theme colors via `useTheme()` hook, NOT direct imports from config
- Extended MUI palette: `theme.palette.primaryLight`, `theme.palette.primaryDark`
- Window title bar uses `.window-drag-handle` class for react-rnd
- i18n: `useTranslations("Namespace")` from next-intl, keys defined in `messages/*.json`
- TypeScript path alias: `@/*` maps to project root

## ANTI-PATTERNS

- **DO NOT** import colors directly from `config/colors.ts` into components
- **DO NOT** use `as any`, `@ts-ignore`, or `@ts-expect-error`
- **DO NOT** create new contexts without considering provider hierarchy in `lib/theme-registry.tsx`
- **DO NOT** use `onMouseDown`/`onClick` for window buttons - use `onPointerDown` for mobile support
- **DO NOT** position windows above `TOP_BAR_HEIGHT` (40px)

## UNIQUE STYLES

- Window animations: `scaleIn` keyframe on mount, smooth transitions on minimize/maximize
- Desktop boot animation: `fadeIn` for background, `slideDown` for TopBar, staggered `scaleIn` for icons
- TopBar dropdowns: AnalogClock and Calendar components with `fadeIn` animation
- react-rnd bounds: `"window"` with manual `TOP_BAR_HEIGHT` enforcement in `onDrag`

## COMMANDS

```bash
npm run dev      # Dev server (Turbopack)
npm run build    # Production build
npm run lint     # ESLint
```

## NOTES

- Language change requires page reload (cookie-based locale detection in `i18n/request.ts`)
- Window size auto-clamps to viewport on mobile via `useViewportSize()` hook
- Settings persisted to localStorage, language to cookie
- ThemeRegistry wraps: AppRouterCacheProvider → SettingsProvider → DynamicThemeProvider
- next-intl TypeScript support via `global.d.ts` extending `IntlMessages`

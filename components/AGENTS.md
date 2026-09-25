# COMPONENTS

## OVERVIEW

Client-side React components for OS-style desktop interface: shell, draggable windows, 7 window apps.

## STRUCTURE

```
components/
├── apps/           # Window content - one per desktop app (+ settings/ sub-panels)
├── desktop/        # Desktop shell chrome
│   └── top-bar/    # index.tsx (TopBar, Clock, CurrentDate, Dropdown) + analog-clock.tsx + calendar.tsx
├── window/         # window.tsx (react-rnd frame) + TitleBar.tsx
├── ui/             # Reusable primitives (+ barrel index.ts)
├── i18n/           # DynamicI18nProvider - client-side locale switching
├── layout/         # desktop-layout.tsx ACTIVE; client-layout/navbar/footer/social-sidebar LEGACY
└── sections/       # skills-section.tsx - used ONLY by app/about-me route, not desktop
```

## CATEGORIES

### apps/ - Window Content
Each file exports a named function component rendered inside `<Window>`. Registered in `config/apps.tsx`.

| Component | Purpose |
|-----------|---------|
| `WelcomeApp` | Landing: photo, intro, CTA buttons calling `openWindow()` |
| `AboutApp` | Bio + about image |
| `ProjectsApp` | Project grid from `data/projects.ts` via `<ProjectCard>` |
| `SkillsApp` | Skill categories from `data/skills.ts` |
| `ContactApp` | Contact info: email, GitHub, LinkedIn |
| `ResumeApp` | PDF viewer (`<object>`) + basePath-aware download |
| `SettingsApp` | Sidebar nav → AppearancePanel \| AboutPanel |

**apps/settings/** - Settings sub-panels: `appearance-panel.tsx` (scheme picker, fonts), `about-panel.tsx`; primitives: `color-scheme-card`, `settings-section`, `settings-select`, `sidebar-item`. All named exports.

### desktop/ - Shell Components

| Component | Purpose |
|-----------|---------|
| `Desktop` | Main container: registerApp() on mount, renders TopBar, icons, windows, Dock |
| `top-bar/index.tsx` | Fixed bar: siteConfig logo, settings button → `openWindow("settings")`, Clock + CurrentDate, dropdown containers |
| `top-bar/analog-clock.tsx`, `calendar.tsx` | Dropdown content, **default exports** |
| `DesktopIcon` | Clickable icon that opens app via `openWindow()` |
| `Dock` | Bottom dock for open/minimized windows (z-9998) |

### window/ - Window Frame

| Component | Purpose |
|-----------|---------|
| `window.tsx` → `Window` | react-rnd wrapper; size/position from reducer state; viewport clamping; maximize/minimize animations |
| `TitleBar.tsx` | **Default export**, PascalCase filename (outlier). Min/max/close via `onPointerDown`; `.window-drag-handle` on title area |

### ui/, i18n/, layout/

| Component | Purpose |
|-----------|---------|
| `DynamicI18nProvider` | Swaps next-intl messages via dynamic import when `settings.language` changes |
| `ProjectCard`, `SectionHeader` | Primitives via `ui/index.ts` barrel |
| `DesktopLayout` | ACTIVE: wraps `WindowManagerProvider` + `<Desktop apps={apps}/>`; used by `app/page.tsx` |
| `Navbar`, `Footer`, `SocialSidebar`, `ClientLayout` | LEGACY scroll-layout - not used by desktop flow |

## WHERE TO LOOK

| Task | File |
|------|------|
| Add new app | Create `apps/<name>-app.tsx` (named export) + entry in `config/apps.tsx` — icons/dock auto-generate |
| Add settings section | Panel in `apps/settings/`, wire into `settings-app.tsx` |
| Modify window drag/resize/maximize | `window/window.tsx` |
| Top bar / clock / calendar | `desktop/top-bar/` |
| Locale switching logic | `i18n/dynamic-i18n-provider.tsx` |

## CONVENTIONS (differs from parent)

- App components: **named exports**; `top-bar/*` sub-components and `TitleBar` use **default exports** (only exceptions)
- New app = exactly 2 file changes (component + registry entry)
- Missing `"use client"` in TitleBar, top-bar/*, apps/settings/* — inherited from parent boundary; do not copy this in new files

## ANTI-PATTERNS (child-specific)

- **DO NOT** import legacy layout components (`navbar`, `footer`, `social-sidebar`, `client-layout`) into the desktop flow
- **DO NOT** dispatch window actions before `registerApp()` completes — OPEN_WINDOW for unregistered app silently no-ops
- Parent rules apply here with full force: `onPointerDown` for window buttons, `useTheme()` for colors, `"use client"` in new files

# COMPONENTS

## OVERVIEW

Client-side React components for OS-style desktop interface. All use `"use client"` directive.

## STRUCTURE

```
components/
├── apps/           # Window content - one per desktop app
├── desktop/        # Desktop shell chrome
├── window/         # react-rnd window wrapper
├── ui/             # Reusable primitives
├── layout/         # Page layouts (legacy, not used by desktop)
└── sections/       # Legacy sections (not used by desktop)
```

## CATEGORIES

### apps/ - Window Content
Each file exports a named function component rendered inside `<Window>`.

| Component | Purpose |
|-----------|---------|
| `WelcomeApp` | Landing content with intro |
| `AboutApp` | Personal info/bio |
| `ProjectsApp` | Portfolio projects grid |
| `SkillsApp` | Skills visualization |
| `ContactApp` | Contact form |
| `SettingsApp` | Appearance settings (color scheme, font, language) |

**Pattern**: Uses `useTranslations("Settings")` for i18n, `useTheme()` for colors.

### desktop/ - Shell Components
| Component | Purpose |
|-----------|---------|
| `Desktop` | Main container: renders TopBar, icons, windows |
| `TopBar` | Fixed top bar with logo, settings button, clock/calendar dropdowns |
| `DesktopIcon` | Clickable icon that opens app via `openWindow()` |
| `Dock` | Bottom dock for minimized windows |

**Key abstractions**: `TopBar` contains `AnalogClock` and `Calendar` dropdown components.

### window/ - Window Frame
| Component | Purpose |
|-----------|---------|
| `Window` | react-rnd wrapper with title bar, resize handles |
| `TitleBar` | Window chrome with minimize/maximize/close buttons |

**Critical**: Uses `onPointerDown` for buttons (mobile support), `.window-drag-handle` class.

### ui/ - Primitives
| Component | Purpose |
|-----------|---------|
| `ProjectCard` | Card for project display |
| `SectionHeader` | Styled section title |

## WHERE TO LOOK

| Task | File |
|------|------|
| Add new app | Create `apps/new-app.tsx`, register in `config/apps.tsx` |
| Modify window behavior | `window/window.tsx` |
| Change top bar | `desktop/top-bar.tsx` |
| Add dropdown to TopBar | Add state + `<Dropdown>` in `top-bar.tsx` |

## ANTI-PATTERNS

- **DO NOT** use `onClick` for window control buttons - use `onPointerDown`
- **DO NOT** forget `"use client"` directive
- **DO NOT** import theme colors directly - use `useTheme()` hook

"use client";

import { WindowManagerProvider } from "@/contexts/window-manager-context";
import { Desktop } from "@/components/desktop/desktop";
import { apps } from "@/config/apps";

export default function DesktopLayout() {
  return (
    <WindowManagerProvider>
      <Desktop apps={apps} />
    </WindowManagerProvider>
  );
}

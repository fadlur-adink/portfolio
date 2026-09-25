"use client";

import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { useTheme } from "@mui/material/styles";
import { useLocale, useTranslations } from "next-intl";
import { useSettings } from "@/contexts/settings-context";

export function InitialLoading({ children }: { children: ReactNode }) {
  const { settings, isHydrated } = useSettings();
  const locale = useLocale();
  const t = useTranslations("Loading");
  const theme = useTheme();
  const [documentReady, setDocumentReady] = useState(false);
  const [fontsReady, setFontsReady] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const translationsReady = isHydrated && locale === settings.language;

  useEffect(() => {
    const onLoad = () => setDocumentReady(true);
    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad, { once: true });
    }
    return () => window.removeEventListener("load", onLoad);
  }, []);

  useEffect(() => {
    if (hasLoaded || !translationsReady || !documentReady) return;
    let cancelled = false;
    // Let the restored theme and mounted application's effects finish first.
    let frame = requestAnimationFrame(async () => {
      try {
        // Resolves after fonts settle, including failed fonts using fallbacks.
        await document.fonts?.ready;
      } catch {
        // System fonts still allow the application to work.
      }
      if (cancelled) return;
      setFontsReady(true);
      frame = requestAnimationFrame(() => setHasLoaded(true));
    });
    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
    };
  }, [translationsReady, documentReady, hasLoaded]);

  const completedSteps = [isHydrated, translationsReady, documentReady, fontsReady]
    .filter(Boolean).length;
  const status = !isHydrated
    ? t("settings")
    : !translationsReady
      ? t("language")
      : !documentReady
        ? t("resources")
        : !fontsReady
          ? t("fonts")
          : t("ready");

  return (
    <>
      {!hasLoaded && (
        <section
          className="initial-loading"
          aria-label={t("title")}
          style={{
            backgroundColor: theme.palette.retro.desktop,
            color: theme.palette.text.primary,
            "--loading-grid": theme.palette.retro.grid,
            "--loading-highlight": theme.palette.background.paper,
            "--loading-accent": theme.palette.primary.main,
            "--loading-muted": theme.palette.text.secondary,
            "--loading-track": theme.palette.divider,
          } as CSSProperties}
        >
          <div className="initial-loading-panel">
            <div className="initial-loading-logo" aria-hidden="true">FR</div>
            <h1>FadlurOS</h1>
            <p className="initial-loading-subtitle">{t("title")}</p>
            <div className="initial-loading-progress">
              <progress
                max={4}
                value={completedSteps}
                aria-label={t("progress")}
                aria-describedby="initial-loading-status"
              />
              <p id="initial-loading-status" role="status" aria-live="polite">
                {status}
              </p>
            </div>
            <div className="initial-loading-recovery">
              <p>{t("slow")}</p>
              <a href="">{t("reload")}</a>
            </div>
            <noscript>
              <style>{`.initial-loading-progress, .initial-loading-recovery { display: none; }`}</style>
              <p>{t("noScript")}</p>
            </noscript>
          </div>
        </section>
      )}
      <div
        className="initial-loading-content"
        data-loading={!hasLoaded}
        inert={!hasLoaded}
        aria-hidden={!hasLoaded ? true : undefined}
        aria-busy={!hasLoaded}
      >
        {children}
      </div>
    </>
  );
}

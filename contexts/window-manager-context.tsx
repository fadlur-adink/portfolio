"use client";

import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  ReactNode,
} from "react";
import {
  WindowState,
  WindowAction,
  WindowManagerState,
  Position,
  Size,
  AppDefinition,
} from "@/types/window";

const initialState: WindowManagerState = {
  windows: [],
  activeWindowId: null,
  nextZIndex: 1,
};

let appRegistry: Map<string, AppDefinition> = new Map();

function windowReducer(
  state: WindowManagerState,
  action: WindowAction
): WindowManagerState {
  switch (action.type) {
    case "OPEN_WINDOW": {
      const app = appRegistry.get(action.payload.appId);
      if (!app) return state;

      const existingWindow = state.windows.find(
        (w) => w.appId === action.payload.appId
      );
      if (existingWindow) {
        return windowReducer(state, {
          type: "FOCUS_WINDOW",
          payload: { windowId: existingWindow.id },
        });
      }

      const newWindow: WindowState = {
        id: `window-${Date.now()}`,
        appId: action.payload.appId,
        title: app.title,
        isOpen: true,
        isMinimized: false,
        isMaximized: false,
        isFocused: true,
        position: {
          x: 100 + state.windows.length * 30,
          y: 100 + state.windows.length * 30,
        },
        size: app.defaultSize,
        zIndex: state.nextZIndex,
      };

      return {
        ...state,
        windows: [
          ...state.windows.map((w) => ({ ...w, isFocused: false })),
          newWindow,
        ],
        activeWindowId: newWindow.id,
        nextZIndex: state.nextZIndex + 1,
      };
    }

    case "CLOSE_WINDOW": {
      const newWindows = state.windows.filter(
        (w) => w.id !== action.payload.windowId
      );
      const newActiveId =
        newWindows.length > 0 ? newWindows[newWindows.length - 1].id : null;

      return {
        ...state,
        windows: newWindows.map((w) => ({
          ...w,
          isFocused: w.id === newActiveId,
        })),
        activeWindowId: newActiveId,
      };
    }

    case "MINIMIZE_WINDOW": {
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.payload.windowId
            ? { ...w, isMinimized: true, isFocused: false }
            : w
        ),
        activeWindowId:
          state.activeWindowId === action.payload.windowId
            ? null
            : state.activeWindowId,
      };
    }

    case "MAXIMIZE_WINDOW": {
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.payload.windowId
            ? { ...w, isMaximized: !w.isMaximized }
            : w
        ),
      };
    }

    case "RESTORE_WINDOW": {
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.payload.windowId
            ? { ...w, isMinimized: false, isFocused: true, zIndex: state.nextZIndex }
            : { ...w, isFocused: false }
        ),
        activeWindowId: action.payload.windowId,
        nextZIndex: state.nextZIndex + 1,
      };
    }

    case "FOCUS_WINDOW": {
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.payload.windowId
            ? { ...w, isFocused: true, zIndex: state.nextZIndex, isMinimized: false }
            : { ...w, isFocused: false }
        ),
        activeWindowId: action.payload.windowId,
        nextZIndex: state.nextZIndex + 1,
      };
    }

    case "MOVE_WINDOW": {
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.payload.windowId
            ? { ...w, position: action.payload.position }
            : w
        ),
      };
    }

    case "RESIZE_WINDOW": {
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.payload.windowId
            ? { ...w, size: action.payload.size }
            : w
        ),
      };
    }

    default:
      return state;
  }
}

interface WindowManagerContextValue {
  state: WindowManagerState;
  openWindow: (appId: string) => void;
  closeWindow: (windowId: string) => void;
  minimizeWindow: (windowId: string) => void;
  maximizeWindow: (windowId: string) => void;
  restoreWindow: (windowId: string) => void;
  focusWindow: (windowId: string) => void;
  moveWindow: (windowId: string, position: Position) => void;
  resizeWindow: (windowId: string, size: Size) => void;
  registerApp: (app: AppDefinition) => void;
  getApp: (appId: string) => AppDefinition | undefined;
}

const WindowManagerContext = createContext<WindowManagerContextValue | null>(
  null
);

export function WindowManagerProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(windowReducer, initialState);

  const openWindow = useCallback((appId: string) => {
    dispatch({ type: "OPEN_WINDOW", payload: { appId } });
  }, []);

  const closeWindow = useCallback((windowId: string) => {
    dispatch({ type: "CLOSE_WINDOW", payload: { windowId } });
  }, []);

  const minimizeWindow = useCallback((windowId: string) => {
    dispatch({ type: "MINIMIZE_WINDOW", payload: { windowId } });
  }, []);

  const maximizeWindow = useCallback((windowId: string) => {
    dispatch({ type: "MAXIMIZE_WINDOW", payload: { windowId } });
  }, []);

  const restoreWindow = useCallback((windowId: string) => {
    dispatch({ type: "RESTORE_WINDOW", payload: { windowId } });
  }, []);

  const focusWindow = useCallback((windowId: string) => {
    dispatch({ type: "FOCUS_WINDOW", payload: { windowId } });
  }, []);

  const moveWindow = useCallback((windowId: string, position: Position) => {
    dispatch({ type: "MOVE_WINDOW", payload: { windowId, position } });
  }, []);

  const resizeWindow = useCallback((windowId: string, size: Size) => {
    dispatch({ type: "RESIZE_WINDOW", payload: { windowId, size } });
  }, []);

  const registerApp = useCallback((app: AppDefinition) => {
    appRegistry.set(app.id, app);
  }, []);

  const getApp = useCallback((appId: string) => {
    return appRegistry.get(appId);
  }, []);

  return (
    <WindowManagerContext.Provider
      value={{
        state,
        openWindow,
        closeWindow,
        minimizeWindow,
        maximizeWindow,
        restoreWindow,
        focusWindow,
        moveWindow,
        resizeWindow,
        registerApp,
        getApp,
      }}
    >
      {children}
    </WindowManagerContext.Provider>
  );
}

export function useWindowManager() {
  const context = useContext(WindowManagerContext);
  if (!context) {
    throw new Error(
      "useWindowManager must be used within a WindowManagerProvider"
    );
  }
  return context;
}

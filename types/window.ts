import { ReactNode } from "react";

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface WindowState {
  id: string;
  appId: string;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  isFocused: boolean;
  position: Position;
  size: Size;
  zIndex: number;
}

export interface AppDefinition {
  id: string;
  title: string;
  icon: ReactNode;
  defaultSize: Size;
  minSize?: Size;
  component: ReactNode;
}

export type WindowAction =
  | { type: "OPEN_WINDOW"; payload: { appId: string } }
  | { type: "CLOSE_WINDOW"; payload: { windowId: string } }
  | { type: "MINIMIZE_WINDOW"; payload: { windowId: string } }
  | { type: "MAXIMIZE_WINDOW"; payload: { windowId: string } }
  | { type: "RESTORE_WINDOW"; payload: { windowId: string } }
  | { type: "FOCUS_WINDOW"; payload: { windowId: string } }
  | { type: "MOVE_WINDOW"; payload: { windowId: string; position: Position } }
  | { type: "RESIZE_WINDOW"; payload: { windowId: string; size: Size } };

export interface WindowManagerState {
  windows: WindowState[];
  activeWindowId: string | null;
  nextZIndex: number;
}

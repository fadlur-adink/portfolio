"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Position } from "@/types/window";

interface UseDraggableOptions {
  initialPosition: Position;
  onDragEnd?: (position: Position) => void;
  onDragStart?: () => void;
  bounds?: { minX: number; minY: number; maxX: number; maxY: number };
}

export function useDraggable({
  initialPosition,
  onDragEnd,
  onDragStart,
  bounds,
}: UseDraggableOptions) {
  const [position, setPosition] = useState<Position>(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const dragOffset = useRef<Position>({ x: 0, y: 0 });

  useEffect(() => {
    setPosition(initialPosition);
  }, [initialPosition]);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (e.button !== 0) return;
      e.preventDefault();
      
      setIsDragging(true);
      dragOffset.current = {
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      };
      onDragStart?.();
    },
    [position.x, position.y, onDragStart]
  );

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      let newX = e.clientX - dragOffset.current.x;
      let newY = e.clientY - dragOffset.current.y;

      if (bounds) {
        newX = Math.max(bounds.minX, Math.min(bounds.maxX, newX));
        newY = Math.max(bounds.minY, Math.min(bounds.maxY, newY));
      }

      setPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      onDragEnd?.(position);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, bounds, onDragEnd, position]);

  return {
    position,
    isDragging,
    handleMouseDown,
  };
}

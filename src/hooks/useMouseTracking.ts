/**
 * useMouseTracking - Tracks mouse behaviour during learning sessions
 * 
 * Collects: movement frequency, inactivity periods, rapid/irregular movement
 * In production: POST /api/analytics/mouse
 */

import { useState, useEffect, useRef, useCallback } from 'react';

interface MouseTrackingState {
  movementFrequency: number; // movements per minute
  inactivityDuration: number; // seconds of no movement
  rapidMovementCount: number;
  isTracking: boolean;
}

export function useMouseTracking() {
  const [state, setState] = useState<MouseTrackingState>({
    movementFrequency: 0,
    inactivityDuration: 0,
    rapidMovementCount: 0,
    isTracking: false,
  });

  const movementCountRef = useRef(0);
  const lastMoveTimeRef = useRef(Date.now());
  const lastPositionRef = useRef({ x: 0, y: 0 });
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTracking = useCallback(() => {
    setState(prev => ({ ...prev, isTracking: true }));

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      const dx = e.clientX - lastPositionRef.current.x;
      const dy = e.clientY - lastPositionRef.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const timeDiff = now - lastMoveTimeRef.current;

      movementCountRef.current++;

      // Detect rapid movement: large distance in short time
      if (timeDiff > 0 && distance / timeDiff > 2) {
        setState(prev => ({ ...prev, rapidMovementCount: prev.rapidMovementCount + 1 }));
      }

      lastMoveTimeRef.current = now;
      lastPositionRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Calculate frequency every 10 seconds
    intervalRef.current = setInterval(() => {
      const now = Date.now();
      const inactivity = (now - lastMoveTimeRef.current) / 1000;
      setState(prev => ({
        ...prev,
        movementFrequency: movementCountRef.current * 6, // per minute
        inactivityDuration: prev.inactivityDuration + (inactivity > 5 ? 10 : 0),
      }));
      movementCountRef.current = 0;
    }, 10000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const stopTracking = useCallback(() => {
    setState(prev => ({ ...prev, isTracking: false }));
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const getAnalytics = useCallback(() => ({ ...state }), [state]);

  return { ...state, startTracking, stopTracking, getAnalytics };
}

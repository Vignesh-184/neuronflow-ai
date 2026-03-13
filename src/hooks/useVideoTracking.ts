/**
 * useVideoTracking - Tracks video watching behaviour
 * 
 * Collects: completion rate, pause/rewind frequency, time per segment
 * In production: POST /api/videos/progress
 */

import { useState, useCallback, useRef } from 'react';
import { courseService } from '@/services/courseService';

interface VideoTrackingState {
  videoId: string;
  pauseCount: number;
  rewindCount: number;
  timeSpent: number;
  watchedPercent: number;
  lastPosition: number;
}

export function useVideoTracking(studentId: string, videoId: string) {
  const [state, setState] = useState<VideoTrackingState>({
    videoId,
    pauseCount: 0,
    rewindCount: 0,
    timeSpent: 0,
    watchedPercent: 0,
    lastPosition: 0,
  });

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTracking = useCallback(() => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setState(prev => ({ ...prev, timeSpent: prev.timeSpent + 1 }));
    }, 1000);
  }, []);

  const stopTracking = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const onPause = useCallback(() => {
    setState(prev => ({ ...prev, pauseCount: prev.pauseCount + 1 }));
    stopTracking();
  }, [stopTracking]);

  const onPlay = useCallback(() => {
    startTracking();
  }, [startTracking]);

  const onRewind = useCallback(() => {
    setState(prev => ({ ...prev, rewindCount: prev.rewindCount + 1 }));
  }, []);

  const onProgress = useCallback((percent: number, position: number) => {
    setState(prev => ({ ...prev, watchedPercent: Math.max(prev.watchedPercent, percent), lastPosition: position }));
  }, []);

  const saveProgress = useCallback(() => {
    stopTracking();
    courseService.saveVideoProgress({
      studentId,
      videoId: state.videoId,
      watchedPercent: state.watchedPercent,
      pauseCount: state.pauseCount,
      rewindCount: state.rewindCount,
      timeSpent: state.timeSpent,
      lastPosition: state.lastPosition,
    });
  }, [studentId, state, stopTracking]);

  return { ...state, onPause, onPlay, onRewind, onProgress, saveProgress, startTracking, stopTracking };
}

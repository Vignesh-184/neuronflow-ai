/**
 * useEmotionDetection - Webcam-based emotion detection
 * 
 * Uses face-api.js or TensorFlow.js for browser-based emotion detection.
 * STUB: Simulates emotion detection. Replace with actual face-api.js integration.
 * 
 * To integrate face-api.js:
 *   1. npm install face-api.js
 *   2. Load models from /models directory
 *   3. Use faceapi.detectSingleFace().withFaceExpressions()
 * 
 * In production: POST /api/analytics/emotion
 */

import { useState, useRef, useCallback, useEffect } from 'react';
import { EmotionLog } from '@/types';

type Emotion = EmotionLog['emotion'];

interface EmotionState {
  currentEmotion: Emotion;
  confidence: number;
  isDetecting: boolean;
  emotionHistory: { emotion: Emotion; timestamp: string }[];
  hasPermission: boolean;
}

export function useEmotionDetection() {
  const [state, setState] = useState<EmotionState>({
    currentEmotion: 'neutral',
    confidence: 0,
    isDetecting: false,
    emotionHistory: [],
    hasPermission: false,
  });

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const requestPermission = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setState(prev => ({ ...prev, hasPermission: true }));
      return true;
    } catch {
      console.warn('Webcam permission denied. Emotion detection will use simulated data.');
      setState(prev => ({ ...prev, hasPermission: false }));
      return false;
    }
  }, []);

  const startDetection = useCallback(() => {
    setState(prev => ({ ...prev, isDetecting: true }));

    // STUB: Simulate emotion detection every 5 seconds
    // In production, replace with face-api.js detection loop
    intervalRef.current = setInterval(() => {
      const emotions: Emotion[] = ['confused', 'focused', 'bored', 'engaged', 'neutral'];
      const weights = [0.15, 0.35, 0.1, 0.3, 0.1]; // biased towards focused/engaged
      const rand = Math.random();
      let cumulative = 0;
      let selected: Emotion = 'neutral';
      for (let i = 0; i < weights.length; i++) {
        cumulative += weights[i];
        if (rand <= cumulative) { selected = emotions[i]; break; }
      }
      const confidence = 0.6 + Math.random() * 0.35;

      setState(prev => ({
        ...prev,
        currentEmotion: selected,
        confidence,
        emotionHistory: [...prev.emotionHistory.slice(-50), { emotion: selected, timestamp: new Date().toISOString() }],
      }));
    }, 5000);
  }, []);

  const stopDetection = useCallback(() => {
    setState(prev => ({ ...prev, isDetecting: false }));
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    // Stop webcam
    if (videoRef.current?.srcObject) {
      (videoRef.current.srcObject as MediaStream).getTracks().forEach(t => t.stop());
    }
  }, []);

  const getConfusionScore = useCallback((): number => {
    if (state.emotionHistory.length === 0) return 0;
    const recent = state.emotionHistory.slice(-10);
    return recent.filter(e => e.emotion === 'confused').length / recent.length;
  }, [state.emotionHistory]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return { ...state, videoRef, requestPermission, startDetection, stopDetection, getConfusionScore };
}

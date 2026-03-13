import { EmotionLog } from '@/types';
import { Smile, Frown, Meh, Eye, AlertCircle } from 'lucide-react';

interface EmotionIndicatorProps {
  emotion: EmotionLog['emotion'];
  confidence: number;
  isActive: boolean;
}

const emotionConfig = {
  confused: { icon: Frown, label: 'Confused', color: 'text-warning', bg: 'bg-warning/10', emoji: '😕' },
  focused: { icon: Eye, label: 'Focused', color: 'text-success', bg: 'bg-success/10', emoji: '🎯' },
  bored: { icon: Meh, label: 'Bored', color: 'text-muted-foreground', bg: 'bg-muted', emoji: '😐' },
  engaged: { icon: Smile, label: 'Engaged', color: 'text-primary', bg: 'bg-primary/10', emoji: '😊' },
  neutral: { icon: AlertCircle, label: 'Neutral', color: 'text-muted-foreground', bg: 'bg-secondary', emoji: '😶' },
};

export default function EmotionIndicator({ emotion, confidence, isActive }: EmotionIndicatorProps) {
  const config = emotionConfig[emotion];

  return (
    <div className={`glass-card rounded-xl p-4 ${config.bg} transition-all duration-300`}>
      <div className="flex items-center gap-3">
        <span className="text-2xl">{config.emoji}</span>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className={`text-sm font-semibold font-display ${config.color}`}>{config.label}</span>
            {isActive && <span className="h-2 w-2 rounded-full bg-success animate-pulse" />}
          </div>
          <p className="text-xs text-muted-foreground">
            {isActive ? `${Math.round(confidence * 100)}% confidence` : 'Detection inactive'}
          </p>
        </div>
      </div>
    </div>
  );
}

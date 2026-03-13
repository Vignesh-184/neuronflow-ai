import { CognitiveLoadScore } from '@/types';
import { Brain, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface CognitiveLoadMeterProps {
  score: CognitiveLoadScore;
}

export default function CognitiveLoadMeter({ score }: CognitiveLoadMeterProps) {
  const levelConfig = {
    low: { label: 'Low Load', color: 'text-success', bg: 'bg-success/10', icon: TrendingDown, message: 'Great flow! Try harder content.' },
    optimal: { label: 'Optimal', color: 'text-primary', bg: 'bg-primary/10', icon: Minus, message: 'Perfect pace. Keep going!' },
    high: { label: 'High Load', color: 'text-destructive', bg: 'bg-destructive/10', icon: TrendingUp, message: 'Consider revisiting basics.' },
  };

  const config = levelConfig[score.level];
  const Icon = config.icon;
  const percentage = Math.round(score.totalScore * 100);

  return (
    <div className={`glass-card rounded-xl p-4 ${config.bg}`}>
      <div className="flex items-center gap-3">
        <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${config.bg}`}>
          <Brain className={`h-5 w-5 ${config.color}`} />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold font-display">{config.label}</span>
            <Icon className={`h-4 w-4 ${config.color}`} />
          </div>
          <p className="text-xs text-muted-foreground">{config.message}</p>
        </div>
        <div className="text-right">
          <span className={`text-2xl font-bold font-display ${config.color}`}>{percentage}%</span>
        </div>
      </div>
      {/* Mini bar */}
      <div className="mt-3 h-2 rounded-full bg-muted overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${score.level === 'low' ? 'gradient-success' : score.level === 'optimal' ? 'gradient-primary' : 'bg-destructive'}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

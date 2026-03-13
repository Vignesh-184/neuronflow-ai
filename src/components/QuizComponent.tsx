import { useState } from 'react';
import { QuizQuestion } from '@/types';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, ArrowRight, RotateCcw } from 'lucide-react';

interface QuizComponentProps {
  questions: QuizQuestion[];
  onSubmit: (answers: { questionId: string; selected: number }[]) => void;
  onComplete?: (score: number, total: number) => void;
}

export default function QuizComponent({ questions, onSubmit, onComplete }: QuizComponentProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const current = questions[currentIdx];
  const isLast = currentIdx === questions.length - 1;
  const selectedAnswer = answers[current?.id];

  const handleSelect = (optionIdx: number) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [current.id]: optionIdx }));
  };

  const handleNext = () => {
    if (isLast) {
      setSubmitted(true);
      setShowResult(true);
      const answerList = questions.map(q => ({ questionId: q.id, selected: answers[q.id] ?? -1 }));
      onSubmit(answerList);
      const score = questions.filter(q => answers[q.id] === q.correctAnswer).length;
      onComplete?.(score, questions.length);
    } else {
      setCurrentIdx(prev => prev + 1);
    }
  };

  const handleRetry = () => {
    setCurrentIdx(0);
    setAnswers({});
    setShowResult(false);
    setSubmitted(false);
  };

  if (showResult) {
    const score = questions.filter(q => answers[q.id] === q.correctAnswer).length;
    const percent = Math.round((score / questions.length) * 100);
    const level = percent > 70 ? 'success' : percent > 40 ? 'warning' : 'destructive';

    return (
      <div className="glass-card rounded-xl p-8 text-center space-y-6">
        <div className={`inline-flex h-20 w-20 items-center justify-center rounded-full ${level === 'success' ? 'gradient-success' : level === 'warning' ? 'gradient-accent' : 'bg-destructive'}`}>
          <span className="text-2xl font-bold text-primary-foreground">{percent}%</span>
        </div>
        <div>
          <h3 className="text-xl font-bold font-display">{score}/{questions.length} Correct</h3>
          <p className="text-muted-foreground mt-1">
            {percent > 70 ? 'Excellent work! Ready for the next topic.' : percent > 40 ? 'Good effort! Review the material and try again.' : 'Keep practicing! Watch the videos again.'}
          </p>
        </div>
        <div className="flex gap-3 justify-center">
          <Button variant="outline" onClick={handleRetry} className="gap-2">
            <RotateCcw className="h-4 w-4" /> Retry Quiz
          </Button>
        </div>
      </div>
    );
  }

  if (!current) return null;

  return (
    <div className="glass-card rounded-xl p-6 space-y-6">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">
          Question {currentIdx + 1} of {questions.length}
        </span>
        <span className={`text-xs px-2 py-1 rounded-full ${current.difficulty === 'easy' ? 'bg-success/10 text-success' : current.difficulty === 'medium' ? 'bg-warning/10 text-warning' : 'bg-destructive/10 text-destructive'}`}>
          {current.difficulty}
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 rounded-full bg-muted overflow-hidden">
        <div className="h-full gradient-primary rounded-full transition-all duration-300" style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }} />
      </div>

      <h3 className="text-lg font-semibold font-display">{current.question}</h3>

      <div className="space-y-3">
        {current.options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => handleSelect(idx)}
            className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${
              selectedAnswer === idx
                ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                : 'border-border hover:border-primary/30 hover:bg-secondary/50'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-medium ${
                selectedAnswer === idx ? 'gradient-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
              }`}>
                {String.fromCharCode(65 + idx)}
              </span>
              <span className="text-sm">{opt}</span>
            </div>
          </button>
        ))}
      </div>

      <div className="flex justify-end">
        <Button
          onClick={handleNext}
          disabled={selectedAnswer === undefined}
          className="gradient-primary text-primary-foreground border-0 gap-2"
        >
          {isLast ? 'Submit Quiz' : 'Next'} <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

import { useParams, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import Navbar from '@/components/Navbar';
import QuizComponent from '@/components/QuizComponent';
import { courseService } from '@/services/courseService';
import { ArrowLeft } from 'lucide-react';

export default function QuizPage() {
  const { quizId } = useParams();
  const { user } = useAuth();
  const questions = courseService.getQuizQuestions(quizId || '');

  const handleSubmit = (answers: { questionId: string; selected: number }[]) => {
    if (!user || !quizId) return;
    courseService.submitQuiz(user.id, quizId, answers);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Link to="/dashboard" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </Link>

        <h1 className="text-2xl font-bold font-display mb-6">Topic Quiz</h1>

        {questions.length > 0 ? (
          <QuizComponent questions={questions} onSubmit={handleSubmit} />
        ) : (
          <div className="glass-card rounded-xl p-8 text-center">
            <p className="text-muted-foreground">No questions available for this quiz yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}

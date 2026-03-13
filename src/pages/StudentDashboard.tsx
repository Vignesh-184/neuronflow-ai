import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import Navbar from '@/components/Navbar';
import CourseCard from '@/components/CourseCard';
import CognitiveLoadMeter from '@/components/CognitiveLoadMeter';
import EmotionIndicator from '@/components/EmotionIndicator';
import AIChatAssistant from '@/components/AIChatAssistant';
import { courseService } from '@/services/courseService';
import { Course, CognitiveLoadScore, AdaptiveRecommendation } from '@/types';
import { BookOpen, Trophy, TrendingUp, Clock, Lightbulb, BarChart3 } from 'lucide-react';

export default function StudentDashboard() {
  const { user } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  const [cognitiveLoad, setCognitiveLoad] = useState<CognitiveLoadScore | null>(null);
  const [recommendations, setRecommendations] = useState<AdaptiveRecommendation[]>([]);

  useEffect(() => {
    if (!user) return;
    const enrolledIds = courseService.getEnrollments(user.id);
    const allCourses = courseService.getCourses();
    setEnrolledCourses(allCourses.filter(c => enrolledIds.includes(c.id)));

    // Simulated cognitive load
    const cl = courseService.calculateCognitiveLoad(0.3, 0.4, 0.2, 0.15);
    cl.studentId = user.id;
    setCognitiveLoad(cl);
    setRecommendations(courseService.getAdaptiveRecommendations(cl.level));
  }, [user]);

  const quizResults = user ? courseService.getQuizResults(user.id) : [];
  const avgScore = quizResults.length > 0
    ? Math.round(quizResults.reduce((s, r) => s + (r.score / r.totalQuestions) * 100, 0) / quizResults.length)
    : 0;

  const stats = [
    { icon: BookOpen, label: 'Enrolled Courses', value: enrolledCourses.length, color: 'text-primary' },
    { icon: Trophy, label: 'Avg Quiz Score', value: `${avgScore}%`, color: 'text-warning' },
    { icon: Clock, label: 'Quizzes Taken', value: quizResults.length, color: 'text-success' },
    { icon: TrendingUp, label: 'Cognitive Load', value: cognitiveLoad?.level || 'N/A', color: 'text-neural' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold font-display">Welcome back, {user?.name?.split(' ')[0]} 👋</h1>
          <p className="text-muted-foreground mt-1">Track your progress and continue learning</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map(s => (
            <div key={s.label} className="glass-card rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center">
                  <s.icon className={`h-5 w-5 ${s.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold font-display">{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Enrolled Courses */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold font-display">My Courses</h2>
                <Link to="/courses" className="text-sm text-primary hover:underline">Browse all →</Link>
              </div>
              {enrolledCourses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {enrolledCourses.map(c => <CourseCard key={c.id} course={c} enrolled />)}
                </div>
              ) : (
                <div className="glass-card rounded-xl p-8 text-center">
                  <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                  <p className="text-muted-foreground">No courses enrolled yet.</p>
                  <Link to="/courses" className="text-primary text-sm hover:underline mt-2 inline-block">Explore courses →</Link>
                </div>
              )}
            </div>

            {/* Quiz Performance */}
            {quizResults.length > 0 && (
              <div className="glass-card rounded-xl p-6">
                <h3 className="font-bold font-display mb-4 flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" /> Recent Quiz Results
                </h3>
                <div className="space-y-3">
                  {quizResults.slice(-5).reverse().map(r => (
                    <div key={r.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                      <span className="text-sm">{r.quizId}</span>
                      <span className={`text-sm font-bold ${(r.score / r.totalQuestions) > 0.7 ? 'text-success' : (r.score / r.totalQuestions) > 0.4 ? 'text-warning' : 'text-destructive'}`}>
                        {r.score}/{r.totalQuestions}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Sidebar */}
          <div className="space-y-6">
            {/* Cognitive Load */}
            {cognitiveLoad && <CognitiveLoadMeter score={cognitiveLoad} />}

            {/* Emotion */}
            <EmotionIndicator emotion="focused" confidence={0.85} isActive={false} />

            {/* Recommendations */}
            <div className="glass-card rounded-xl p-5">
              <h3 className="font-bold font-display mb-3 flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-warning" /> Recommendations
              </h3>
              <div className="space-y-3">
                {recommendations.map(r => (
                  <div key={r.id} className={`p-3 rounded-lg text-sm ${
                    r.priority === 'high' ? 'bg-destructive/5 border border-destructive/20' :
                    r.priority === 'medium' ? 'bg-warning/5 border border-warning/20' :
                    'bg-secondary border border-border'
                  }`}>
                    {r.message}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <AIChatAssistant />
    </div>
  );
}

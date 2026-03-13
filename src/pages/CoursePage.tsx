import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import Navbar from '@/components/Navbar';
import { courseService } from '@/services/courseService';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PlayCircle, BookOpen, Users, Star, Clock, ArrowRight, CheckCircle } from 'lucide-react';

export default function CoursePage() {
  const { courseId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const course = courseService.getCourseById(courseId || '');
  const isEnrolled = user ? courseService.getEnrollments(user.id).includes(courseId || '') : false;

  if (!course) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold font-display">Course not found</h1>
          <Link to="/courses" className="text-primary hover:underline mt-4 inline-block">← Back to courses</Link>
        </div>
      </div>
    );
  }

  const handleEnroll = () => {
    if (!user) { navigate('/login'); return; }
    courseService.enrollStudent(user.id, course.id);
    navigate(`/learn/${course.id}/${course.topics[0]?.id}`);
  };

  const totalVideos = course.topics.reduce((s, t) => s + t.videos.length, 0);
  const totalDuration = course.topics.reduce((s, t) => s + t.videos.reduce((vs, v) => vs + v.duration, 0), 0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Hero */}
        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="gradient-primary p-8 md:p-12">
            <div className="max-w-2xl">
              <Badge variant="outline" className="bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20 mb-4">
                {course.category}
              </Badge>
              <h1 className="text-3xl md:text-4xl font-bold font-display text-primary-foreground">{course.title}</h1>
              <p className="text-primary-foreground/80 mt-3">{course.description}</p>
              <div className="flex items-center gap-6 mt-6 text-sm text-primary-foreground/70">
                <span className="flex items-center gap-1"><BookOpen className="h-4 w-4" /> {course.topics.length} topics</span>
                <span className="flex items-center gap-1"><PlayCircle className="h-4 w-4" /> {totalVideos} videos</span>
                <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {Math.round(totalDuration / 60)} min</span>
                <span className="flex items-center gap-1"><Users className="h-4 w-4" /> {course.enrolledCount.toLocaleString()}</span>
                <span className="flex items-center gap-1"><Star className="h-4 w-4" /> {course.rating}</span>
              </div>
              <div className="mt-8">
                {isEnrolled ? (
                  <Link to={`/learn/${course.id}/${course.topics[0]?.id}`}>
                    <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 gap-2">
                      Continue Learning <ArrowRight className="h-5 w-5" />
                    </Button>
                  </Link>
                ) : (
                  <Button size="lg" onClick={handleEnroll} className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 gap-2">
                    Enroll & Start <ArrowRight className="h-5 w-5" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Curriculum */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold font-display mb-6">Course Curriculum</h2>
          <div className="space-y-4">
            {course.topics.map((topic, idx) => (
              <div key={topic.id} className="glass-card rounded-xl p-5">
                <div className="flex items-start gap-4">
                  <div className="h-9 w-9 rounded-lg gradient-primary flex items-center justify-center shrink-0">
                    <span className="text-sm font-bold text-primary-foreground">{idx + 1}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold font-display">{topic.title}</h3>
                    <div className="mt-3 space-y-2">
                      {topic.videos.map(v => (
                        <div key={v.id} className="flex items-center gap-3 text-sm text-muted-foreground">
                          <PlayCircle className="h-4 w-4 text-primary" />
                          <span>{v.title}</span>
                          <span className="ml-auto text-xs">{Math.round(v.duration / 60)} min</span>
                        </div>
                      ))}
                      {topic.quizId && (
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <CheckCircle className="h-4 w-4 text-success" />
                          <span>Topic Quiz</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

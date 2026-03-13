import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import Navbar from '@/components/Navbar';
import CourseCard from '@/components/CourseCard';
import { courseService } from '@/services/courseService';
import { Button } from '@/components/ui/button';
import { Brain, Sparkles, BarChart3, Eye, Zap, BookOpen, ArrowRight } from 'lucide-react';

const features = [
  { icon: Eye, title: 'Emotion Detection', description: 'Webcam-based emotion tracking to understand your learning state in real-time.', gradient: 'gradient-accent' },
  { icon: Brain, title: 'Cognitive Load Analysis', description: 'Adaptive algorithms measure your cognitive load and adjust content difficulty.', gradient: 'gradient-neural' },
  { icon: BarChart3, title: 'Behavioral Analytics', description: 'Track mouse movements, video engagement, and learning patterns.', gradient: 'gradient-primary' },
  { icon: Sparkles, title: 'AI Assistant', description: 'Open-source Llama 3-powered assistant for concept explanations and practice.', gradient: 'gradient-success' },
];

export default function HomePage() {
  const { user } = useAuth();
  const courses = courseService.getCourses();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-neural/5" />
        <div className="container mx-auto px-4 py-24 relative">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <Zap className="h-4 w-4" /> Open-Source Adaptive Learning
            </div>
            <h1 className="text-5xl md:text-6xl font-bold font-display tracking-tight">
              Learn Smarter with{' '}
              <span className="text-gradient-primary">AI-Powered</span>{' '}
              Adaptation
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              NeuronLearn adapts to your cognitive state in real-time. Using emotion detection, behavioral analytics, and open-source AI, every lesson is personalized to how you actually learn.
            </p>
            <div className="flex items-center justify-center gap-4 pt-4">
              {user ? (
                <Link to={user.role === 'teacher' ? '/teacher' : '/dashboard'}>
                  <Button size="lg" className="gradient-primary text-primary-foreground border-0 gap-2 text-base px-8 h-12">
                    Go to Dashboard <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/login?mode=register">
                    <Button size="lg" className="gradient-primary text-primary-foreground border-0 gap-2 text-base px-8 h-12">
                      Start Learning Free <ArrowRight className="h-5 w-5" />
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button size="lg" variant="outline" className="gap-2 text-base px-8 h-12">
                      Sign In
                    </Button>
                  </Link>
                </>
              )}
            </div>
            <p className="text-xs text-muted-foreground pt-2">
              Demo: <code className="bg-muted px-1.5 py-0.5 rounded text-xs">student@demo.com</code> or{' '}
              <code className="bg-muted px-1.5 py-0.5 rounded text-xs">teacher@demo.com</code> (any password)
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-display">Adaptive Learning Features</h2>
          <p className="text-muted-foreground mt-2">Powered by open-source AI and behavioral science</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map(f => (
            <div key={f.title} className="glass-card rounded-xl p-6 space-y-4 hover:shadow-lg transition-shadow">
              <div className={`h-12 w-12 rounded-xl ${f.gradient} flex items-center justify-center`}>
                <f.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="font-bold font-display text-lg">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Courses */}
      <section className="container mx-auto px-4 py-20 border-t border-border">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold font-display">Featured Courses</h2>
            <p className="text-muted-foreground mt-1">Start learning with our curated content</p>
          </div>
          <Link to="/courses">
            <Button variant="outline" className="gap-2">
              <BookOpen className="h-4 w-4" /> All Courses
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map(c => (
            <CourseCard key={c.id} course={c} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>NeuronLearn — Open-Source Adaptive AI Learning Platform</p>
          <p className="mt-1">Built with React · Llama 3 · TensorFlow.js · face-api.js</p>
        </div>
      </footer>
    </div>
  );
}

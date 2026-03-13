import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import Navbar from '@/components/Navbar';
import { courseService } from '@/services/courseService';
import { Button } from '@/components/ui/button';
import { Users, BookOpen, BarChart3, Brain, Eye, TrendingUp, Plus, Trash2 } from 'lucide-react';

/**
 * Teacher Dashboard
 * 
 * In production, teacher can create courses, manage content, and view student analytics.
 * This is a stub with simulated analytics data.
 */

export default function TeacherDashboard() {
  const { user } = useAuth();
  const courses = courseService.getCourses();
  const [showCreate, setShowCreate] = useState(false);
  const [newCourse, setNewCourse] = useState({ title: '', description: '', category: '' });

  // Simulated analytics
  const analytics = {
    totalStudents: 1240,
    avgEngagement: 78,
    avgCognitiveLoad: 'optimal' as const,
    emotionDistribution: [
      { emotion: 'Focused', percent: 42, color: 'bg-success' },
      { emotion: 'Engaged', percent: 28, color: 'bg-primary' },
      { emotion: 'Confused', percent: 15, color: 'bg-warning' },
      { emotion: 'Bored', percent: 10, color: 'bg-muted-foreground' },
      { emotion: 'Neutral', percent: 5, color: 'bg-secondary' },
    ],
    weakConcepts: ['Linked Lists - Doubly Linked', 'Recursion Basics', 'CSS Flexbox Alignment'],
    quizPerformance: [
      { topic: 'Arrays', avgScore: 82 },
      { topic: 'Linked Lists', avgScore: 58 },
      { topic: 'Java OOP', avgScore: 71 },
      { topic: 'HTML Basics', avgScore: 90 },
    ],
  };

  const handleCreate = () => {
    // STUB: In production, POST /api/courses
    console.log('Creating course:', newCourse);
    setShowCreate(false);
    setNewCourse({ title: '', description: '', category: '' });
  };

  const stats = [
    { icon: Users, label: 'Total Students', value: analytics.totalStudents, color: 'text-primary' },
    { icon: TrendingUp, label: 'Avg Engagement', value: `${analytics.avgEngagement}%`, color: 'text-success' },
    { icon: Brain, label: 'Cognitive Load', value: analytics.avgCognitiveLoad, color: 'text-neural' },
    { icon: BookOpen, label: 'Active Courses', value: courses.length, color: 'text-warning' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold font-display">Teacher Dashboard</h1>
            <p className="text-muted-foreground mt-1">Manage courses and view student analytics</p>
          </div>
          <Button onClick={() => setShowCreate(!showCreate)} className="gradient-primary text-primary-foreground border-0 gap-2">
            <Plus className="h-4 w-4" /> Create Course
          </Button>
        </div>

        {/* Create Course Form */}
        {showCreate && (
          <div className="glass-card rounded-xl p-6 space-y-4">
            <h3 className="font-bold font-display">New Course</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium">Title</label>
                <input value={newCourse.title} onChange={e => setNewCourse(p => ({ ...p, title: e.target.value }))}
                  className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Course title" />
              </div>
              <div>
                <label className="text-sm font-medium">Category</label>
                <input value={newCourse.category} onChange={e => setNewCourse(p => ({ ...p, category: e.target.value }))}
                  className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="e.g. Programming" />
              </div>
              <div className="flex items-end">
                <Button onClick={handleCreate} className="gradient-primary text-primary-foreground border-0">Create</Button>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Description</label>
              <textarea value={newCourse.description} onChange={e => setNewCourse(p => ({ ...p, description: e.target.value }))}
                className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" rows={2} placeholder="Course description" />
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map(s => (
            <div key={s.label} className="glass-card rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center">
                  <s.icon className={`h-5 w-5 ${s.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold font-display capitalize">{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Emotion Analytics */}
          <div className="glass-card rounded-xl p-6">
            <h3 className="font-bold font-display mb-4 flex items-center gap-2">
              <Eye className="h-5 w-5 text-neural" /> Student Emotion Distribution
            </h3>
            <div className="space-y-3">
              {analytics.emotionDistribution.map(e => (
                <div key={e.emotion} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span>{e.emotion}</span>
                    <span className="font-bold">{e.percent}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div className={`h-full rounded-full ${e.color} transition-all duration-500`} style={{ width: `${e.percent}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quiz Performance */}
          <div className="glass-card rounded-xl p-6">
            <h3 className="font-bold font-display mb-4 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" /> Quiz Performance by Topic
            </h3>
            <div className="space-y-4">
              {analytics.quizPerformance.map(q => (
                <div key={q.topic} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span>{q.topic}</span>
                    <span className={`font-bold ${q.avgScore > 70 ? 'text-success' : q.avgScore > 40 ? 'text-warning' : 'text-destructive'}`}>
                      {q.avgScore}%
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-500 ${q.avgScore > 70 ? 'gradient-success' : q.avgScore > 40 ? 'gradient-accent' : 'bg-destructive'}`}
                      style={{ width: `${q.avgScore}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Weak Concepts */}
          <div className="glass-card rounded-xl p-6">
            <h3 className="font-bold font-display mb-4 flex items-center gap-2">
              <Brain className="h-5 w-5 text-warning" /> Weak Concept Heatmap
            </h3>
            <div className="space-y-2">
              {analytics.weakConcepts.map((concept, i) => (
                <div key={concept} className="flex items-center gap-3 p-3 rounded-lg bg-warning/5 border border-warning/20">
                  <span className={`h-3 w-3 rounded-full ${i === 0 ? 'bg-destructive' : i === 1 ? 'bg-warning' : 'bg-warning/50'}`} />
                  <span className="text-sm">{concept}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Courses managed */}
          <div className="glass-card rounded-xl p-6">
            <h3 className="font-bold font-display mb-4">Your Courses</h3>
            <div className="space-y-3">
              {courses.map(c => (
                <div key={c.id} className="flex items-center justify-between p-3 rounded-lg border border-border">
                  <div>
                    <p className="text-sm font-medium">{c.title}</p>
                    <p className="text-xs text-muted-foreground">{c.topics.length} topics · {c.enrolledCount} students</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

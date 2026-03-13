import { Link } from 'react-router-dom';
import { Course } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Users, Star, BookOpen } from 'lucide-react';

interface CourseCardProps {
  course: Course;
  enrolled?: boolean;
}

const difficultyColors: Record<string, string> = {
  beginner: 'bg-success/10 text-success border-success/20',
  intermediate: 'bg-warning/10 text-warning border-warning/20',
  advanced: 'bg-destructive/10 text-destructive border-destructive/20',
};

const categoryIcons: Record<string, string> = {
  'Computer Science': '🧮',
  'Programming': '💻',
  'Web Development': '🌐',
};

export default function CourseCard({ course, enrolled }: CourseCardProps) {
  return (
    <Link to={`/course/${course.id}`} className="group block">
      <div className="glass-card rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary/30">
        {/* Thumbnail area */}
        <div className="relative h-40 gradient-primary flex items-center justify-center overflow-hidden">
          <span className="text-5xl">{categoryIcons[course.category] || '📚'}</span>
          <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
            <Badge variant="outline" className={`text-xs ${difficultyColors[course.difficulty]}`}>
              {course.difficulty}
            </Badge>
            {enrolled && (
              <Badge className="bg-success text-success-foreground text-xs">Enrolled</Badge>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          <div>
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{course.category}</p>
            <h3 className="text-base font-bold font-display text-card-foreground mt-1 group-hover:text-primary transition-colors line-clamp-2">
              {course.title}
            </h3>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>
          <div className="flex items-center gap-4 pt-1 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <BookOpen className="h-3.5 w-3.5" /> {course.topics.length} topics
            </span>
            <span className="flex items-center gap-1">
              <Users className="h-3.5 w-3.5" /> {course.enrolledCount.toLocaleString()}
            </span>
            <span className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5 text-warning" /> {course.rating}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

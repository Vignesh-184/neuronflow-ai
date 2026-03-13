import { courseService } from '@/services/courseService';
import Navbar from '@/components/Navbar';
import CourseCard from '@/components/CourseCard';
import { useAuth } from '@/hooks/useAuth';

export default function CoursesPage() {
  const { user } = useAuth();
  const courses = courseService.getCourses();
  const enrolledIds = user ? courseService.getEnrollments(user.id) : [];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold font-display mb-2">All Courses</h1>
        <p className="text-muted-foreground mb-8">Browse and enroll in courses tailored to your learning goals</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map(c => (
            <CourseCard key={c.id} course={c} enrolled={enrolledIds.includes(c.id)} />
          ))}
        </div>
      </div>
    </div>
  );
}

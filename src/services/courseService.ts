/**
 * Course Service — STUB
 * 
 * Expected endpoints:
 *   GET    /api/courses
 *   GET    /api/courses/:id
 *   POST   /api/courses              (teacher)
 *   PUT    /api/courses/:id           (teacher)
 *   POST   /api/courses/:id/enroll    (student)
 *   GET    /api/courses/:id/progress  (student)
 *   POST   /api/videos/progress       (student, video tracking)
 *   GET    /api/quizzes/:id
 *   POST   /api/quizzes/:id/submit
 *   POST   /api/analytics/mouse       (mouse tracking)
 *   POST   /api/analytics/emotion     (emotion logs)
 *   GET    /api/recommendations/:studentId
 */

import { Course, VideoProgress, QuizQuestion, QuizResult, CognitiveLoadScore, AdaptiveRecommendation } from '@/types';
import { defaultCourses, defaultQuizQuestions } from '@/data/defaultCourses';

const ENROLLMENTS_KEY = 'neuronlearn_enrollments';
const PROGRESS_KEY = 'neuronlearn_progress';

class CourseService {
  getCourses(): Course[] {
    return defaultCourses;
  }

  getCourseById(id: string): Course | undefined {
    return defaultCourses.find(c => c.id === id);
  }

  getQuizQuestions(quizId: string): QuizQuestion[] {
    return defaultQuizQuestions[quizId] || [];
  }

  enrollStudent(studentId: string, courseId: string) {
    const enrollments = JSON.parse(localStorage.getItem(ENROLLMENTS_KEY) || '[]');
    if (!enrollments.find((e: any) => e.studentId === studentId && e.courseId === courseId)) {
      enrollments.push({ id: `enr-${Date.now()}`, studentId, courseId, enrolledAt: new Date().toISOString(), completionPercent: 0 });
      localStorage.setItem(ENROLLMENTS_KEY, JSON.stringify(enrollments));
    }
  }

  getEnrollments(studentId: string): string[] {
    const enrollments = JSON.parse(localStorage.getItem(ENROLLMENTS_KEY) || '[]');
    return enrollments.filter((e: any) => e.studentId === studentId).map((e: any) => e.courseId);
  }

  saveVideoProgress(progress: Partial<VideoProgress>) {
    const all = JSON.parse(localStorage.getItem(PROGRESS_KEY) || '[]');
    const idx = all.findIndex((p: any) => p.videoId === progress.videoId && p.studentId === progress.studentId);
    if (idx >= 0) all[idx] = { ...all[idx], ...progress };
    else all.push({ id: `prog-${Date.now()}`, ...progress });
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(all));
  }

  getVideoProgress(studentId: string): VideoProgress[] {
    const all = JSON.parse(localStorage.getItem(PROGRESS_KEY) || '[]');
    return all.filter((p: any) => p.studentId === studentId);
  }

  submitQuiz(studentId: string, quizId: string, answers: { questionId: string; selected: number }[]): QuizResult {
    const questions = this.getQuizQuestions(quizId);
    const results = answers.map(a => {
      const q = questions.find(q => q.id === a.questionId);
      return { ...a, correct: q ? q.correctAnswer === a.selected : false };
    });
    const score = results.filter(r => r.correct).length;
    const result: QuizResult = {
      id: `qr-${Date.now()}`,
      studentId,
      quizId,
      score,
      totalQuestions: questions.length,
      answers: results,
      completedAt: new Date().toISOString(),
    };
    const allResults = JSON.parse(localStorage.getItem('neuronlearn_quiz_results') || '[]');
    allResults.push(result);
    localStorage.setItem('neuronlearn_quiz_results', JSON.stringify(allResults));
    return result;
  }

  getQuizResults(studentId: string): QuizResult[] {
    return JSON.parse(localStorage.getItem('neuronlearn_quiz_results') || '[]').filter((r: any) => r.studentId === studentId);
  }

  calculateCognitiveLoad(confusionScore: number, rewindFreq: number, pauseFreq: number, quizErrorRate: number): CognitiveLoadScore {
    const totalScore = 0.4 * confusionScore + 0.3 * rewindFreq + 0.2 * pauseFreq + 0.1 * quizErrorRate;
    const level: CognitiveLoadScore['level'] = totalScore > 0.7 ? 'high' : totalScore > 0.3 ? 'optimal' : 'low';
    return {
      id: `cl-${Date.now()}`,
      studentId: '',
      sessionId: '',
      confusionScore,
      rewindFrequency: rewindFreq,
      pauseFrequency: pauseFreq,
      quizErrorRate,
      totalScore,
      level,
      timestamp: new Date().toISOString(),
    };
  }

  getAdaptiveRecommendations(cogLevel: CognitiveLoadScore['level']): AdaptiveRecommendation[] {
    if (cogLevel === 'high') {
      return [
        { id: 'r1', studentId: '', type: 'video', message: 'Try revisiting the previous topic video at a slower pace.', priority: 'high', createdAt: new Date().toISOString() },
        { id: 'r2', studentId: '', type: 'quiz', message: 'Take an easier practice quiz to reinforce basics.', priority: 'medium', createdAt: new Date().toISOString() },
      ];
    }
    if (cogLevel === 'low') {
      return [
        { id: 'r3', studentId: '', type: 'difficulty_change', message: 'You\'re doing great! Try the advanced quiz.', priority: 'medium', createdAt: new Date().toISOString() },
        { id: 'r4', studentId: '', type: 'topic', message: 'Ready for the next topic? Unlock advanced content.', priority: 'low', createdAt: new Date().toISOString() },
      ];
    }
    return [
      { id: 'r5', studentId: '', type: 'video', message: 'Keep up the great work! Continue to the next video.', priority: 'low', createdAt: new Date().toISOString() },
    ];
  }
}

export const courseService = new CourseService();

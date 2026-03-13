export type UserRole = 'student' | 'teacher' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  teacherId: string;
  teacherName: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  topics: CourseTopic[];
  enrolledCount: number;
  rating: number;
  isSystem: boolean;
  createdAt: string;
}

export interface CourseTopic {
  id: string;
  courseId: string;
  title: string;
  order: number;
  videos: Video[];
  quizId?: string;
}

export interface Video {
  id: string;
  topicId: string;
  title: string;
  url: string;
  youtubeId?: string;
  duration: number; // seconds
  order: number;
}

export interface StudentEnrollment {
  id: string;
  studentId: string;
  courseId: string;
  enrolledAt: string;
  completionPercent: number;
}

export interface VideoProgress {
  id: string;
  studentId: string;
  videoId: string;
  watchedPercent: number;
  pauseCount: number;
  rewindCount: number;
  timeSpent: number; // seconds
  lastPosition: number;
  completedAt?: string;
}

export interface MouseActivityLog {
  id: string;
  studentId: string;
  sessionId: string;
  movementFrequency: number;
  inactivityDuration: number;
  rapidMovementCount: number;
  timestamp: string;
}

export interface EmotionLog {
  id: string;
  studentId: string;
  sessionId: string;
  emotion: 'confused' | 'focused' | 'bored' | 'engaged' | 'neutral';
  confidence: number;
  timestamp: string;
}

export interface CognitiveLoadScore {
  id: string;
  studentId: string;
  sessionId: string;
  confusionScore: number;
  rewindFrequency: number;
  pauseFrequency: number;
  quizErrorRate: number;
  totalScore: number;
  level: 'low' | 'optimal' | 'high';
  timestamp: string;
}

export interface QuizQuestion {
  id: string;
  quizId: string;
  question: string;
  options: string[];
  correctAnswer: number;
  difficulty: 'easy' | 'medium' | 'hard';
  explanation?: string;
}

export interface QuizResult {
  id: string;
  studentId: string;
  quizId: string;
  score: number;
  totalQuestions: number;
  answers: { questionId: string; selected: number; correct: boolean }[];
  completedAt: string;
}

export interface AdaptiveRecommendation {
  id: string;
  studentId: string;
  type: 'video' | 'quiz' | 'topic' | 'difficulty_change';
  message: string;
  resourceId?: string;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

-- NeuronLearn Database Schema (MySQL)
-- Run this script to initialize the database

CREATE DATABASE IF NOT EXISTS neuronlearn;
USE neuronlearn;

-- Users table
CREATE TABLE users (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role ENUM('student', 'teacher', 'admin') NOT NULL DEFAULT 'student',
  avatar VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Courses table
CREATE TABLE courses (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  thumbnail VARCHAR(500),
  teacher_id VARCHAR(36) NOT NULL,
  category VARCHAR(100),
  difficulty ENUM('beginner', 'intermediate', 'advanced') DEFAULT 'beginner',
  enrolled_count INT DEFAULT 0,
  rating DECIMAL(2,1) DEFAULT 0.0,
  is_system BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (teacher_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Course Topics
CREATE TABLE course_topics (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  course_id VARCHAR(36) NOT NULL,
  title VARCHAR(255) NOT NULL,
  topic_order INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

-- Videos
CREATE TABLE videos (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  topic_id VARCHAR(36) NOT NULL,
  title VARCHAR(255) NOT NULL,
  url VARCHAR(500) NOT NULL,
  youtube_id VARCHAR(20),
  duration INT DEFAULT 0, -- seconds
  video_order INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (topic_id) REFERENCES course_topics(id) ON DELETE CASCADE
);

-- Student Enrollments
CREATE TABLE student_enrollments (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  student_id VARCHAR(36) NOT NULL,
  course_id VARCHAR(36) NOT NULL,
  enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completion_percent DECIMAL(5,2) DEFAULT 0.00,
  UNIQUE KEY unique_enrollment (student_id, course_id),
  FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

-- Student Video Progress
CREATE TABLE student_video_progress (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  student_id VARCHAR(36) NOT NULL,
  video_id VARCHAR(36) NOT NULL,
  watched_percent DECIMAL(5,2) DEFAULT 0.00,
  pause_count INT DEFAULT 0,
  rewind_count INT DEFAULT 0,
  time_spent INT DEFAULT 0, -- seconds
  last_position DECIMAL(10,2) DEFAULT 0,
  completed_at TIMESTAMP NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY unique_video_progress (student_id, video_id),
  FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (video_id) REFERENCES videos(id) ON DELETE CASCADE
);

-- Mouse Activity Logs
CREATE TABLE mouse_activity_logs (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  student_id VARCHAR(36) NOT NULL,
  session_id VARCHAR(36) NOT NULL,
  movement_frequency DECIMAL(10,2) DEFAULT 0,
  inactivity_duration INT DEFAULT 0, -- seconds
  rapid_movement_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Emotion Logs
CREATE TABLE emotion_logs (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  student_id VARCHAR(36) NOT NULL,
  session_id VARCHAR(36) NOT NULL,
  emotion ENUM('confused', 'focused', 'bored', 'engaged', 'neutral') NOT NULL,
  confidence DECIMAL(4,3) DEFAULT 0.000,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Cognitive Load Scores
CREATE TABLE cognitive_load_scores (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  student_id VARCHAR(36) NOT NULL,
  session_id VARCHAR(36) NOT NULL,
  confusion_score DECIMAL(4,3) DEFAULT 0.000,
  rewind_frequency DECIMAL(4,3) DEFAULT 0.000,
  pause_frequency DECIMAL(4,3) DEFAULT 0.000,
  quiz_error_rate DECIMAL(4,3) DEFAULT 0.000,
  total_score DECIMAL(4,3) DEFAULT 0.000,
  level ENUM('low', 'optimal', 'high') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Quiz Questions
CREATE TABLE quiz_questions (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  quiz_id VARCHAR(36) NOT NULL,
  question TEXT NOT NULL,
  options JSON NOT NULL,
  correct_answer INT NOT NULL,
  difficulty ENUM('easy', 'medium', 'hard') DEFAULT 'medium',
  explanation TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Quiz Results
CREATE TABLE quiz_results (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  student_id VARCHAR(36) NOT NULL,
  quiz_id VARCHAR(36) NOT NULL,
  score INT NOT NULL,
  total_questions INT NOT NULL,
  answers JSON NOT NULL,
  completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Adaptive Recommendations
CREATE TABLE adaptive_recommendations (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  student_id VARCHAR(36) NOT NULL,
  type ENUM('video', 'quiz', 'topic', 'difficulty_change') NOT NULL,
  message TEXT NOT NULL,
  resource_id VARCHAR(36),
  priority ENUM('low', 'medium', 'high') DEFAULT 'medium',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE
);

-- AI Chat Logs
CREATE TABLE ai_chat_logs (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  student_id VARCHAR(36) NOT NULL,
  role ENUM('user', 'assistant') NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Indexes for performance
CREATE INDEX idx_enrollments_student ON student_enrollments(student_id);
CREATE INDEX idx_video_progress_student ON student_video_progress(student_id);
CREATE INDEX idx_mouse_logs_session ON mouse_activity_logs(session_id);
CREATE INDEX idx_emotion_logs_session ON emotion_logs(session_id);
CREATE INDEX idx_cognitive_scores_student ON cognitive_load_scores(student_id);
CREATE INDEX idx_quiz_results_student ON quiz_results(student_id);
CREATE INDEX idx_chat_logs_student ON ai_chat_logs(student_id);

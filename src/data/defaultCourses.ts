import { Course } from '@/types';

export const defaultCourses: Course[] = [
  {
    id: 'course-ds-basics',
    title: 'Data Structures Basics',
    description: 'Master fundamental data structures including arrays, linked lists, stacks, queues, and trees with practical examples.',
    thumbnail: '',
    teacherId: 'system',
    teacherName: 'NeuronLearn',
    category: 'Computer Science',
    difficulty: 'beginner',
    enrolledCount: 1240,
    rating: 4.7,
    isSystem: true,
    createdAt: '2024-01-01',
    topics: [
      {
        id: 'ds-t1',
        courseId: 'course-ds-basics',
        title: 'Introduction to Arrays',
        order: 1,
        videos: [
          { id: 'ds-v1', topicId: 'ds-t1', title: 'What are Arrays?', url: 'https://www.youtube.com/watch?v=QJNwK2uJyGs', youtubeId: 'QJNwK2uJyGs', duration: 600, order: 1 },
          { id: 'ds-v2', topicId: 'ds-t1', title: 'Array Operations', url: 'https://www.youtube.com/watch?v=n60Dt7_cZsA', youtubeId: 'n60Dt7_cZsA', duration: 720, order: 2 },
        ],
        quizId: 'quiz-ds-t1',
      },
      {
        id: 'ds-t2',
        courseId: 'course-ds-basics',
        title: 'Linked Lists',
        order: 2,
        videos: [
          { id: 'ds-v3', topicId: 'ds-t2', title: 'Singly Linked Lists', url: 'https://www.youtube.com/watch?v=HKfj0l7ndbc', youtubeId: 'HKfj0l7ndbc', duration: 900, order: 1 },
        ],
        quizId: 'quiz-ds-t2',
      },
      {
        id: 'ds-t3',
        courseId: 'course-ds-basics',
        title: 'Stacks and Queues',
        order: 3,
        videos: [
          { id: 'ds-v4', topicId: 'ds-t3', title: 'Understanding Stacks', url: 'https://www.youtube.com/watch?v=I5lq6sCuABE', youtubeId: 'I5lq6sCuABE', duration: 540, order: 1 },
        ],
        quizId: 'quiz-ds-t3',
      },
    ],
  },
  {
    id: 'course-java-fundamentals',
    title: 'Java Programming Fundamentals',
    description: 'Learn Java from scratch. Covers variables, OOP concepts, collections, and building real applications.',
    thumbnail: '',
    teacherId: 'system',
    teacherName: 'NeuronLearn',
    category: 'Programming',
    difficulty: 'beginner',
    enrolledCount: 2100,
    rating: 4.8,
    isSystem: true,
    createdAt: '2024-01-01',
    topics: [
      {
        id: 'java-t1',
        courseId: 'course-java-fundamentals',
        title: 'Java Basics & Setup',
        order: 1,
        videos: [
          { id: 'java-v1', topicId: 'java-t1', title: 'Introduction to Java', url: 'https://www.youtube.com/watch?v=eIrMbAQSU34', youtubeId: 'eIrMbAQSU34', duration: 900, order: 1 },
        ],
        quizId: 'quiz-java-t1',
      },
      {
        id: 'java-t2',
        courseId: 'course-java-fundamentals',
        title: 'Object-Oriented Programming',
        order: 2,
        videos: [
          { id: 'java-v2', topicId: 'java-t2', title: 'Classes and Objects', url: 'https://www.youtube.com/watch?v=pTB0EiLXUC8', youtubeId: 'pTB0EiLXUC8', duration: 1200, order: 1 },
        ],
        quizId: 'quiz-java-t2',
      },
    ],
  },
  {
    id: 'course-web-dev',
    title: 'Web Development Fundamentals',
    description: 'Build modern websites with HTML, CSS, and JavaScript. Covers responsive design, DOM manipulation, and more.',
    thumbnail: '',
    teacherId: 'system',
    teacherName: 'NeuronLearn',
    category: 'Web Development',
    difficulty: 'beginner',
    enrolledCount: 3200,
    rating: 4.6,
    isSystem: true,
    createdAt: '2024-01-01',
    topics: [
      {
        id: 'web-t1',
        courseId: 'course-web-dev',
        title: 'HTML Fundamentals',
        order: 1,
        videos: [
          { id: 'web-v1', topicId: 'web-t1', title: 'HTML Crash Course', url: 'https://www.youtube.com/watch?v=UB1O30fR-EE', youtubeId: 'UB1O30fR-EE', duration: 3600, order: 1 },
        ],
        quizId: 'quiz-web-t1',
      },
      {
        id: 'web-t2',
        courseId: 'course-web-dev',
        title: 'CSS Styling',
        order: 2,
        videos: [
          { id: 'web-v2', topicId: 'web-t2', title: 'CSS Tutorial for Beginners', url: 'https://www.youtube.com/watch?v=yfoY53QXEnI', youtubeId: 'yfoY53QXEnI', duration: 4200, order: 1 },
        ],
        quizId: 'quiz-web-t2',
      },
    ],
  },
  {
    id: 'course-python',
    title: 'Python Programming Basics',
    description: 'Start your programming journey with Python. Learn syntax, data types, functions, and build practical projects.',
    thumbnail: '',
    teacherId: 'system',
    teacherName: 'NeuronLearn',
    category: 'Programming',
    difficulty: 'beginner',
    enrolledCount: 4500,
    rating: 4.9,
    isSystem: true,
    createdAt: '2024-01-01',
    topics: [
      {
        id: 'py-t1',
        courseId: 'course-python',
        title: 'Python Setup & Basics',
        order: 1,
        videos: [
          { id: 'py-v1', topicId: 'py-t1', title: 'Python for Beginners', url: 'https://www.youtube.com/watch?v=kqtD5dpn9C8', youtubeId: 'kqtD5dpn9C8', duration: 3600, order: 1 },
        ],
        quizId: 'quiz-py-t1',
      },
      {
        id: 'py-t2',
        courseId: 'course-python',
        title: 'Functions & Modules',
        order: 2,
        videos: [
          { id: 'py-v2', topicId: 'py-t2', title: 'Python Functions', url: 'https://www.youtube.com/watch?v=9Os0o3wzS_I', youtubeId: '9Os0o3wzS_I', duration: 1800, order: 1 },
        ],
        quizId: 'quiz-py-t2',
      },
    ],
  },
];

export const defaultQuizQuestions: Record<string, import('@/types').QuizQuestion[]> = {
  'quiz-ds-t1': [
    { id: 'q1', quizId: 'quiz-ds-t1', question: 'What is the time complexity of accessing an element in an array by index?', options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'], correctAnswer: 0, difficulty: 'easy', explanation: 'Arrays provide constant-time access by index.' },
    { id: 'q2', quizId: 'quiz-ds-t1', question: 'What happens when you insert an element at the beginning of an array?', options: ['All elements shift right', 'Only the first element moves', 'Nothing changes', 'The array doubles in size'], correctAnswer: 0, difficulty: 'medium', explanation: 'Inserting at position 0 requires shifting all existing elements.' },
    { id: 'q3', quizId: 'quiz-ds-t1', question: 'Which data structure uses contiguous memory allocation?', options: ['Linked List', 'Array', 'Binary Tree', 'Hash Map'], correctAnswer: 1, difficulty: 'easy' },
  ],
  'quiz-ds-t2': [
    { id: 'q4', quizId: 'quiz-ds-t2', question: 'What advantage does a linked list have over an array?', options: ['Faster access', 'Dynamic size', 'Less memory', 'Simpler code'], correctAnswer: 1, difficulty: 'easy' },
    { id: 'q5', quizId: 'quiz-ds-t2', question: 'What is the time complexity of inserting at the head of a linked list?', options: ['O(n)', 'O(1)', 'O(log n)', 'O(n²)'], correctAnswer: 1, difficulty: 'medium' },
  ],
  'quiz-java-t1': [
    { id: 'q6', quizId: 'quiz-java-t1', question: 'Java is a:', options: ['Compiled language', 'Interpreted language', 'Both compiled and interpreted', 'Neither'], correctAnswer: 2, difficulty: 'easy' },
    { id: 'q7', quizId: 'quiz-java-t1', question: 'What is JVM?', options: ['Java Virtual Machine', 'Java Variable Method', 'Java Version Manager', 'Java Visual Mode'], correctAnswer: 0, difficulty: 'easy' },
  ],
  'quiz-web-t1': [
    { id: 'q8', quizId: 'quiz-web-t1', question: 'What does HTML stand for?', options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Hyper Transfer Markup Language', 'Home Tool Markup Language'], correctAnswer: 0, difficulty: 'easy' },
  ],
  'quiz-py-t1': [
    { id: 'q9', quizId: 'quiz-py-t1', question: 'Python is a:', options: ['Statically typed language', 'Dynamically typed language', 'Not a typed language', 'Machine language'], correctAnswer: 1, difficulty: 'easy' },
    { id: 'q10', quizId: 'quiz-py-t1', question: 'Which keyword is used to define a function in Python?', options: ['function', 'func', 'def', 'define'], correctAnswer: 2, difficulty: 'easy' },
  ],
};

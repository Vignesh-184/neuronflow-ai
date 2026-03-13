/**
 * Auth Service — STUB
 * 
 * Expected endpoints:
 *   POST /api/auth/register  { name, email, password, role }
 *   POST /api/auth/login     { email, password }
 *   GET  /api/auth/me        (requires Bearer token)
 *   POST /api/auth/logout
 */

import { User, UserRole } from '@/types';

const STORAGE_KEY = 'neuronlearn_user';

// Demo users for local testing
const demoUsers: User[] = [
  { id: 'student-1', email: 'student@demo.com', name: 'Alex Student', role: 'student', createdAt: '2024-01-01' },
  { id: 'teacher-1', email: 'teacher@demo.com', name: 'Dr. Sarah Chen', role: 'teacher', createdAt: '2024-01-01' },
];

class AuthService {
  getCurrentUser(): User | null {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  }

  async login(email: string, _password: string): Promise<User> {
    // STUB: In production, call POST /api/auth/login
    const user = demoUsers.find(u => u.email === email);
    if (!user) throw new Error('Invalid credentials. Try student@demo.com or teacher@demo.com');
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    return user;
  }

  async register(name: string, email: string, _password: string, role: UserRole): Promise<User> {
    // STUB: In production, call POST /api/auth/register
    const user: User = {
      id: `user-${Date.now()}`,
      email,
      name,
      role,
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    return user;
  }

  logout() {
    localStorage.removeItem(STORAGE_KEY);
  }

  isAuthenticated(): boolean {
    return !!this.getCurrentUser();
  }
}

export const authService = new AuthService();

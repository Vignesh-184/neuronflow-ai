import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Brain, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const [searchParams] = useSearchParams();
  const isRegister = searchParams.get('mode') === 'register';
  const [mode, setMode] = useState<'login' | 'register'>(isRegister ? 'register' : 'login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'student' | 'teacher'>('student');
  const [error, setError] = useState('');
  const { login, register, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      if (mode === 'login') {
        const user = await login(email, password);
      } else {
        await register(name, email, password, role);
      }
      navigate(role === 'teacher' ? '/teacher' : '/dashboard');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl gradient-primary mb-4">
              <Brain className="h-7 w-7 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold font-display">{mode === 'login' ? 'Welcome Back' : 'Create Account'}</h1>
            <p className="text-muted-foreground mt-1 text-sm">
              {mode === 'login' ? 'Sign in to continue learning' : 'Start your adaptive learning journey'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="glass-card rounded-xl p-6 space-y-4">
            {mode === 'register' && (
              <>
                <div>
                  <label className="text-sm font-medium">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Role</label>
                  <div className="mt-1 grid grid-cols-2 gap-2">
                    {(['student', 'teacher'] as const).map(r => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setRole(r)}
                        className={`rounded-lg border px-3 py-2.5 text-sm font-medium capitalize transition-all ${
                          role === r ? 'border-primary bg-primary/5 text-primary ring-2 ring-primary/20' : 'border-input hover:border-primary/30'
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="you@email.com"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="••••••••"
                required
              />
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <Button type="submit" disabled={isLoading} className="w-full gradient-primary text-primary-foreground border-0 h-11">
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : mode === 'login' ? 'Sign In' : 'Create Account'}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
              <button type="button" onClick={() => setMode(mode === 'login' ? 'register' : 'login')} className="text-primary font-medium hover:underline">
                {mode === 'login' ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </form>

          <p className="text-center text-xs text-muted-foreground">
            Demo: <code className="bg-muted px-1 py-0.5 rounded">student@demo.com</code> or{' '}
            <code className="bg-muted px-1 py-0.5 rounded">teacher@demo.com</code>
          </p>
        </div>
      </div>
    </div>
  );
}

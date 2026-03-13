import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Brain, LogOut, LayoutDashboard, BookOpen } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary">
            <Brain className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold font-display tracking-tight text-foreground">
            Neuron<span className="text-gradient-primary">Learn</span>
          </span>
        </Link>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link to="/courses">
                <Button variant="ghost" size="sm" className="gap-2">
                  <BookOpen className="h-4 w-4" /> Courses
                </Button>
              </Link>
              <Link to={user.role === 'teacher' ? '/teacher' : '/dashboard'}>
                <Button variant="ghost" size="sm" className="gap-2">
                  <LayoutDashboard className="h-4 w-4" /> Dashboard
                </Button>
              </Link>
              <div className="ml-2 flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5">
                <div className="h-6 w-6 rounded-full gradient-primary flex items-center justify-center text-xs font-bold text-primary-foreground">
                  {user.name.charAt(0)}
                </div>
                <span className="text-sm font-medium text-secondary-foreground">{user.name}</span>
              </div>
              <Button variant="ghost" size="icon" onClick={handleLogout} className="text-muted-foreground hover:text-destructive">
                <LogOut className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm">Sign In</Button>
              </Link>
              <Link to="/login?mode=register">
                <Button size="sm" className="gradient-primary text-primary-foreground border-0 hover:opacity-90">
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

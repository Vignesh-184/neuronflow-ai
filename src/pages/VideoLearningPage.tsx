import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useVideoTracking } from '@/hooks/useVideoTracking';
import { useMouseTracking } from '@/hooks/useMouseTracking';
import { useEmotionDetection } from '@/hooks/useEmotionDetection';
import Navbar from '@/components/Navbar';
import VideoPlayer from '@/components/VideoPlayer';
import CognitiveLoadMeter from '@/components/CognitiveLoadMeter';
import EmotionIndicator from '@/components/EmotionIndicator';
import AIChatAssistant from '@/components/AIChatAssistant';
import { courseService } from '@/services/courseService';
import { Button } from '@/components/ui/button';
import { PlayCircle, CheckCircle, ChevronRight, Eye, EyeOff, BarChart3 } from 'lucide-react';

export default function VideoLearningPage() {
  const { courseId, topicId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const course = courseService.getCourseById(courseId || '');
  const topic = course?.topics.find(t => t.id === topicId);
  const [activeVideoIdx, setActiveVideoIdx] = useState(0);
  const [emotionEnabled, setEmotionEnabled] = useState(false);

  const activeVideo = topic?.videos[activeVideoIdx];

  const videoTracking = useVideoTracking(user?.id || '', activeVideo?.id || '');
  const mouseTracking = useMouseTracking();
  const emotionDetection = useEmotionDetection();

  // Start mouse tracking on mount
  useEffect(() => {
    const cleanup = mouseTracking.startTracking();
    return () => { cleanup?.(); mouseTracking.stopTracking(); };
  }, []);

  const toggleEmotion = async () => {
    if (emotionEnabled) {
      emotionDetection.stopDetection();
      setEmotionEnabled(false);
    } else {
      const granted = await emotionDetection.requestPermission();
      if (granted) {
        emotionDetection.startDetection();
        setEmotionEnabled(true);
      }
    }
  };

  // Calculate cognitive load
  const cogLoad = courseService.calculateCognitiveLoad(
    emotionDetection.getConfusionScore(),
    Math.min(videoTracking.rewindCount / 10, 1),
    Math.min(videoTracking.pauseCount / 10, 1),
    0.1
  );

  if (!course || !topic) {
    return (
      <div className="min-h-screen bg-background"><Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <p className="text-muted-foreground">Content not found.</p>
          <Link to="/courses" className="text-primary hover:underline">← Back to courses</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to={`/course/${course.id}`} className="hover:text-primary">{course.title}</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground font-medium">{topic.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main video area */}
          <div className="lg:col-span-3 space-y-6">
            {activeVideo && (
              <>
                <VideoPlayer
                  youtubeId={activeVideo.youtubeId}
                  title={activeVideo.title}
                  onPlay={videoTracking.onPlay}
                  onPause={videoTracking.onPause}
                />
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold font-display">{activeVideo.title}</h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleEmotion}
                    className="gap-2"
                  >
                    {emotionEnabled ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    {emotionEnabled ? 'Disable' : 'Enable'} Emotion Tracking
                  </Button>
                </div>

                {/* Tracking stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="glass-card rounded-lg p-3 text-center">
                    <p className="text-xs text-muted-foreground">Time Spent</p>
                    <p className="text-lg font-bold font-display">{Math.floor(videoTracking.timeSpent / 60)}m {videoTracking.timeSpent % 60}s</p>
                  </div>
                  <div className="glass-card rounded-lg p-3 text-center">
                    <p className="text-xs text-muted-foreground">Pauses</p>
                    <p className="text-lg font-bold font-display">{videoTracking.pauseCount}</p>
                  </div>
                  <div className="glass-card rounded-lg p-3 text-center">
                    <p className="text-xs text-muted-foreground">Rewinds</p>
                    <p className="text-lg font-bold font-display">{videoTracking.rewindCount}</p>
                  </div>
                  <div className="glass-card rounded-lg p-3 text-center">
                    <p className="text-xs text-muted-foreground">Mouse Activity</p>
                    <p className="text-lg font-bold font-display">{mouseTracking.movementFrequency}/min</p>
                  </div>
                </div>

                {/* Cognitive & Emotion indicators */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <CognitiveLoadMeter score={cogLoad} />
                  <EmotionIndicator emotion={emotionDetection.currentEmotion} confidence={emotionDetection.confidence} isActive={emotionEnabled} />
                </div>
              </>
            )}

            {/* Quiz link */}
            {topic.quizId && (
              <div className="glass-card rounded-xl p-5 flex items-center justify-between">
                <div>
                  <h3 className="font-bold font-display">Topic Quiz</h3>
                  <p className="text-sm text-muted-foreground">Test your knowledge on {topic.title}</p>
                </div>
                <Link to={`/quiz/${topic.quizId}`}>
                  <Button className="gradient-primary text-primary-foreground border-0 gap-2">
                    Take Quiz <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Sidebar: Video list */}
          <div className="space-y-4">
            <h3 className="font-bold font-display text-sm uppercase tracking-wider text-muted-foreground">Videos in this topic</h3>
            <div className="space-y-2">
              {topic.videos.map((v, idx) => (
                <button
                  key={v.id}
                  onClick={() => setActiveVideoIdx(idx)}
                  className={`w-full text-left p-3 rounded-lg border transition-all ${
                    idx === activeVideoIdx ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/30'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <PlayCircle className={`h-4 w-4 shrink-0 ${idx === activeVideoIdx ? 'text-primary' : 'text-muted-foreground'}`} />
                    <span className="text-sm font-medium truncate">{v.title}</span>
                  </div>
                  <span className="text-xs text-muted-foreground ml-6">{Math.round(v.duration / 60)} min</span>
                </button>
              ))}
            </div>

            {/* Other topics */}
            <h3 className="font-bold font-display text-sm uppercase tracking-wider text-muted-foreground pt-4">Other Topics</h3>
            <div className="space-y-2">
              {course.topics.filter(t => t.id !== topicId).map(t => (
                <Link
                  key={t.id}
                  to={`/learn/${course.id}/${t.id}`}
                  className="block p-3 rounded-lg border border-border hover:border-primary/30 transition-all"
                >
                  <span className="text-sm font-medium">{t.title}</span>
                  <span className="text-xs text-muted-foreground block">{t.videos.length} videos</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <AIChatAssistant />
    </div>
  );
}

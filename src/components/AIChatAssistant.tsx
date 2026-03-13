import { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '@/types';
import { Button } from '@/components/ui/button';
import { MessageCircle, X, Send, Bot, User, Loader2 } from 'lucide-react';

/**
 * AI Chat Assistant — STUB
 * 
 * In production: Connect to Llama 3 via Ollama (http://localhost:11434/api/chat)
 * This stub simulates responses. Replace simulateResponse() with actual API call.
 */

const SIMULATED_RESPONSES: Record<string, string> = {
  default: "I'm your AI learning assistant! I can help you understand concepts, summarize videos, and generate practice questions. In production, I'll be powered by Llama 3 via Ollama.",
  concept: "That's a great question! Let me break this down step by step. The key idea is to understand the fundamentals first, then build upon that foundation. Would you like me to elaborate on any specific part?",
  quiz: "Here's a quick practice question:\n\n**Q: What is the time complexity of binary search?**\nA) O(n)\nB) O(log n)\nC) O(n²)\nD) O(1)\n\nThink about it and let me know your answer!",
  summary: "Here's a summary of the key concepts covered:\n\n1. **Core Concept** - Understanding the fundamental building blocks\n2. **Application** - How to apply these in real scenarios\n3. **Best Practices** - Common patterns and antipatterns\n\nWould you like me to go deeper into any of these?",
};

function getSimulatedResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes('quiz') || lower.includes('question') || lower.includes('practice')) return SIMULATED_RESPONSES.quiz;
  if (lower.includes('summary') || lower.includes('summarize')) return SIMULATED_RESPONSES.summary;
  if (lower.includes('explain') || lower.includes('what is') || lower.includes('how')) return SIMULATED_RESPONSES.concept;
  return SIMULATED_RESPONSES.default;
}

export default function AIChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '0', role: 'assistant', content: "Hi! I'm your AI learning assistant. Ask me anything about your course material! 🧠", timestamp: new Date().toISOString() },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = { id: `msg-${Date.now()}`, role: 'user', content: input.trim(), timestamp: new Date().toISOString() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // STUB: Simulate AI response. In production, call Ollama API.
    setTimeout(() => {
      const response: ChatMessage = {
        id: `msg-${Date.now()}-ai`,
        role: 'assistant',
        content: getSimulatedResponse(userMsg.content),
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, response]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1500);
  };

  return (
    <>
      {/* Floating button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full gradient-neural shadow-lg flex items-center justify-center transition-transform hover:scale-110 glow-primary"
        >
          <MessageCircle className="h-6 w-6 text-neural-foreground" />
        </button>
      )}

      {/* Chat panel */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 max-h-[600px] rounded-2xl border border-border bg-card shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 gradient-neural">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-neural-foreground" />
              <span className="font-display font-bold text-neural-foreground">AI Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-neural-foreground/70 hover:text-neural-foreground">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[300px] max-h-[400px]">
            {messages.map(msg => (
              <div key={msg.id} className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`h-7 w-7 shrink-0 rounded-full flex items-center justify-center ${msg.role === 'assistant' ? 'gradient-neural' : 'gradient-primary'}`}>
                  {msg.role === 'assistant' ? <Bot className="h-3.5 w-3.5 text-neural-foreground" /> : <User className="h-3.5 w-3.5 text-primary-foreground" />}
                </div>
                <div className={`max-w-[75%] rounded-xl px-3.5 py-2.5 text-sm ${
                  msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'
                }`}>
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-2.5">
                <div className="h-7 w-7 rounded-full gradient-neural flex items-center justify-center">
                  <Bot className="h-3.5 w-3.5 text-neural-foreground" />
                </div>
                <div className="bg-secondary rounded-xl px-4 py-3 flex items-center gap-1">
                  <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-border p-3">
            <form onSubmit={e => { e.preventDefault(); handleSend(); }} className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask about your course..."
                className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <Button type="submit" size="icon" disabled={!input.trim() || isTyping} className="gradient-primary border-0 text-primary-foreground">
                <Send className="h-4 w-4" />
              </Button>
            </form>
            <p className="text-[10px] text-muted-foreground mt-1.5 text-center">
              Powered by Llama 3 (Ollama) · Open-source AI
            </p>
          </div>
        </div>
      )}
    </>
  );
}

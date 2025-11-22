import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

interface Message {
  role: "user" | "ai";
  content: string;
  timestamp: Date;
}

const chatInputSchema = z.object({
  message: z.string()
    .trim()
    .min(1, "Message cannot be empty")
    .max(2000, "Message must be less than 2000 characters")
});

export const AIChatWidget = () => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      content: "👋 Hi! I'm your EPM expert with 10+ years of experience.\n\nAsk me about:\n• CPM tool selection (Anaplan, OneStream, etc.)\n• Implementation best practices\n• Common challenges & solutions",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSend = async () => {
    const question = input.trim();
    if (!question || isLoading) return;

    // Validate input
    const validation = chatInputSchema.safeParse({ message: question });
    if (!validation.success) {
      toast({
        title: "Invalid input",
        description: validation.error.errors[0].message,
        variant: "destructive",
      });
      return;
    }

    const userMessage: Message = {
      role: "user",
      content: question,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "https://kaitlyn-uncommendatory-valene.ngrok-free.dev";
      const response = await fetch(`${apiUrl}/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const aiMessage: Message = {
        role: "ai",
        content: data.answer + "\n\n→ [Discuss your specific needs](/#contact)",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage: Message = {
        role: "ai",
        content: "❌ Sorry, something went wrong. Please try again or contact us directly.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-5 right-5 h-14 w-14 rounded-full bg-gradient-to-br from-primary via-accent to-secondary shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-[9999] p-0"
        aria-label="Toggle AI Chat"
      >
        {isOpen ? (
          <X className="h-6 w-6 text-primary-foreground" />
        ) : (
          <MessageCircle className="h-6 w-6 text-primary-foreground" />
        )}
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-5 w-[380px] h-[600px] max-h-[80vh] flex flex-col bg-background/95 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl z-[9998] animate-in slide-in-from-bottom-4 duration-300 md:w-[400px]">
          {/* Header */}
          <div className="flex items-center justify-between p-5 bg-gradient-to-br from-primary via-accent to-secondary rounded-t-2xl">
            <div>
              <h3 className="text-lg font-montserrat font-bold text-primary-foreground">
                AxionX AI Assistant
              </h3>
              <p className="text-xs text-primary-foreground/90 font-opensans">
                Expert EPM & Finance Transformation Advice
              </p>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4 bg-muted/30">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  } animate-in fade-in-0 slide-in-from-bottom-2 duration-300`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-card text-card-foreground shadow-sm border border-border/30"
                    }`}
                  >
                    <p className="text-sm font-opensans whitespace-pre-line break-words">
                      {message.content}
                    </p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
                  <div className="bg-card text-card-foreground rounded-2xl px-4 py-3 shadow-sm border border-border/30">
                    <Loader2 className="h-5 w-5 animate-spin text-primary" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-4 bg-background border-t border-border/50 rounded-b-2xl">
            <div className="flex gap-2">
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask about EPM tools..."
                className="flex-1 rounded-full bg-muted/50 border-border/30 focus-visible:ring-primary"
                disabled={isLoading}
              />
              <Button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground px-6"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile responsive adjustments */}
      <style>{`
        @media (max-width: 640px) {
          .fixed.bottom-24.right-5 {
            width: calc(100vw - 2.5rem);
            right: 1.25rem;
            left: 1.25rem;
            height: calc(100vh - 10rem);
            max-height: calc(100vh - 10rem);
          }
        }
      `}</style>
    </>
  );
};

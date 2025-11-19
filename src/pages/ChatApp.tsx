import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { supabase } from "@/integrations/supabase/client";
import { ConversationSidebar } from "@/components/ConversationSidebar";
import { useToast } from "@/hooks/use-toast";
import type { User } from "@supabase/supabase-js";

interface Message {
  role: "user" | "ai";
  content: string;
  timestamp: Date;
}

export default function ChatApp() {
  const [user, setUser] = useState<User | null>(null);
  const [showWelcome, setShowWelcome] = useState(true);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
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
  const navigate = useNavigate();
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        if (!session?.user) {
          navigate("/auth");
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (!session?.user) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (showWelcome) {
      const timer = setTimeout(() => {
        setShowWelcome(false);
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [showWelcome]);

  const loadConversation = async (conversationId: string) => {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("conversation_id", conversationId)
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error loading messages:", error);
      toast({
        title: "Error",
        description: "Failed to load conversation",
        variant: "destructive",
      });
      return;
    }

    setMessages([
      {
        role: "ai",
        content: "👋 Hi! I'm your EPM expert with 10+ years of experience.\n\nAsk me about:\n• CPM tool selection (Anaplan, OneStream, etc.)\n• Implementation best practices\n• Common challenges & solutions",
        timestamp: new Date(),
      },
      ...(data || []).map((msg) => ({
        role: msg.role as "user" | "ai",
        content: msg.content,
        timestamp: new Date(msg.created_at),
      })),
    ]);
  };

  const handleSelectConversation = (conversationId: string | null) => {
    setCurrentConversationId(conversationId);
    if (conversationId) {
      loadConversation(conversationId);
    } else {
      setMessages([
        {
          role: "ai",
          content: "👋 Hi! I'm your EPM expert with 10+ years of experience.\n\nAsk me about:\n• CPM tool selection (Anaplan, OneStream, etc.)\n• Implementation best practices\n• Common challenges & solutions",
          timestamp: new Date(),
        },
      ]);
    }
  };

  const saveMessage = async (conversationId: string, role: "user" | "ai", content: string) => {
    const { error } = await supabase.from("messages").insert({
      conversation_id: conversationId,
      role,
      content,
    });

    if (error) {
      console.error("Error saving message:", error);
    }
  };

  const handleSend = async () => {
    const question = input.trim();
    if (!question || isLoading || !user) return;

    const userMessage: Message = {
      role: "user",
      content: question,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    let conversationId = currentConversationId;

    try {
      if (!conversationId) {
        const { data, error } = await supabase
          .from("conversations")
          .insert({
            user_id: user.id,
            title: question.slice(0, 50),
          })
          .select()
          .single();

        if (error) throw error;
        conversationId = data.id;
        setCurrentConversationId(conversationId);
      }

      await saveMessage(conversationId, "user", question);

      const response = await fetch("https://kaitlyn-uncommendatory-valene.ngrok-free.dev/ask", {
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
        content: data.answer,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      await saveMessage(conversationId, "ai", data.answer);
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
  };

  if (!user) {
    return null;
  }

  if (showWelcome) {
    return (
      <div className="fixed inset-0 bg-background flex items-center justify-center overflow-hidden">
        {/* Ocean wave background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary/20 to-transparent animate-wave" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-accent/20 to-transparent animate-wave-delayed" />
        </div>

        {/* Logo and message */}
        <div className="relative z-10 flex flex-col items-center gap-8 px-6 animate-fade-in">
          <img
            src="/src/assets/axionx-logo.png"
            alt="AxionX Logo"
            className="w-48 h-auto animate-scale-in"
          />
          <p className="text-center text-lg md:text-xl font-opensans text-foreground/90 max-w-2xl animate-fade-in-delayed leading-relaxed">
            Welcome to AxionX. We deliver AI-powered Finance Transformation with guaranteed outcomes. 
            Fixing your data governance permanently, and your cost exposure.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex bg-background animate-fade-in">
      <ConversationSidebar
        currentConversationId={currentConversationId}
        onSelectConversation={handleSelectConversation}
      />
      
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-center p-4 bg-gradient-to-br from-primary via-accent to-secondary border-b border-border/50">
          <div className="text-center">
            <h1 className="text-xl font-montserrat font-bold text-primary-foreground">
              AxionX AI Assistant
            </h1>
            <p className="text-sm text-primary-foreground/90 font-opensans">
              Expert EPM & Finance Transformation Advice
            </p>
          </div>
        </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4 bg-muted/30">
        <div className="max-w-4xl mx-auto space-y-4">
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
      <div className="p-4 bg-background border-t border-border/50">
        <div className="max-w-4xl mx-auto flex gap-2">
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
    </div>
  );
}

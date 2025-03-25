import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PersonalityTraits } from "@/lib/agent/config";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  emotion?: string;
  intensity?: number;
  thought?: string;
}

interface ChatInterfaceProps {
  personality: PersonalityTraits;
  onSendMessage: (message: string) => Promise<any>;
  threadId: string;
}

export function ChatInterface({
  personality,
  onSendMessage,
  threadId,
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: inputValue,
      role: "user",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await onSendMessage(inputValue);
      
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        content: response.response,
        role: "assistant",
        emotion: response.emotion,
        intensity: response.intensity,
        thought: response.thought,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error in chat:", error);
      
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        content: "Sorry, I encountered an error processing your request.",
        role: "assistant",
      };
      
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[70vh] border rounded-lg overflow-hidden">
      <div className="flex-grow p-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              Start a conversation with the AI...
            </div>
          ) : (
            messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`p-3 rounded-lg ${
                  msg.role === "user" 
                    ? "bg-primary/10 ml-auto max-w-[80%]" 
                    : "bg-muted mr-auto max-w-[80%]"
                }`}
              >
                <div className="mb-1 font-semibold">
                  {msg.role === "user" ? "You" : "AI"}
                  {msg.emotion && msg.intensity && (
                    <span className="ml-2 text-xs font-normal text-muted-foreground">
                      Feeling: {msg.emotion} (intensity: {msg.intensity})
                    </span>
                  )}
                </div>
                <div>{msg.content}</div>
                {msg.thought && (
                  <div className="mt-2 text-xs italic text-muted-foreground border-t pt-1">
                    Thought: {msg.thought}
                  </div>
                )}
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex gap-2">
          <Textarea
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-grow resize-none"
            rows={2}
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading || !inputValue.trim()}>
            {isLoading ? "Sending..." : "Send"}
          </Button>
        </div>
      </form>
    </div>
  );
}
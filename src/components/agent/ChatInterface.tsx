import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PersonalityTraits } from "@/lib/agent/config";

interface ChatMessage {
  role: "human" | "ai";
  content: string;
  thought?: string;
  emotion?: string;
  intensity?: number;
}

interface ChatInterfaceProps {
  personality: PersonalityTraits;
  onSendMessage: (message: string) => Promise<{
    response: string;
    thought: string;
    emotion: string;
    intensity: number;
  }>;
}

export function ChatInterface({ personality, onSendMessage }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      role: "human",
      content: input,
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await onSendMessage(input);
      const aiMessage: ChatMessage = {
        role: "ai",
        content: response.response,
        thought: response.thought,
        emotion: response.emotion,
        intensity: response.intensity,
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full max-h-screen">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex ${message.role === "human" ? "justify-end" : "justify-start"}`}
            >
              <Card className={`max-w-[80%] ${message.role === "ai" ? "bg-primary/10" : ""}`}>
                <CardContent className="p-4">
                  {message.role === "ai" && message.thought && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mb-2 text-sm italic text-muted-foreground"
                    >
                      💭 Thought: {message.thought}
                      {message.emotion && (
                        <span className="ml-2">
                          ({message.emotion} - {message.intensity}%)
                        </span>
                      )}
                    </motion.div>
                  )}
                  <div className="text-foreground">{message.content}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your message..."
            className="flex-1"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <Button
            onClick={handleSend}
            disabled={isLoading}
            className="self-end"
          >
            {isLoading ? "Thinking..." : "Send"}
          </Button>
        </div>
      </div>
    </div>
  );
}
"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PersonalityConfig } from "@/components/personality/PersonalityConfig";
import { ChatInterface } from "@/components/agent/ChatInterface";
import { PersonalityTraits } from "@/lib/agent/config";

export default function Home() {
  const [personality, setPersonality] = useState<PersonalityTraits>({
    joy: 50,
    sadness: 50,
    anger: 50,
    fear: 50,
    disgust: 50,
  });
  const [threadId, setThreadId] = useState<string>("");

  // Initialize thread ID on component mount
  useEffect(() => {
    // Generate a unique thread ID for this session
    const newThreadId = `thread-${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
    setThreadId(newThreadId);
  }, []);

  const handlePersonalityUpdate = (newTraits: PersonalityTraits) => {
    setPersonality(newTraits);
  };

  const handleSendMessage = async (message: string) => {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          personality,
          threadId, // Include the thread ID for conversation persistence
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  };

  return (
    <main className="container mx-auto p-4 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8">Reflection Machine</h1>
      
      <Tabs defaultValue="chat" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="chat">Chat Interface</TabsTrigger>
          <TabsTrigger value="personality">Personality Config</TabsTrigger>
        </TabsList>
        <TabsContent value="chat">
          <ChatInterface
            personality={personality}
            onSendMessage={handleSendMessage}
            threadId={threadId}
          />
        </TabsContent>
        <TabsContent value="personality">
          <PersonalityConfig
            initialTraits={personality}
            onSave={handlePersonalityUpdate}
          />
        </TabsContent>
      </Tabs>
    </main>
  );
}

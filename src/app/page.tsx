"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PersonalityConfig } from "@/components/personality/PersonalityConfig";
import { ChatInterface } from "@/components/agent/ChatInterface";
import { createAgentChain, PersonalityTraits } from "@/lib/agent/config";

export default function Home() {
  const [personality, setPersonality] = useState<PersonalityTraits>({
    joy: 50,
    sadness: 50,
    anger: 50,
    fear: 50,
    disgust: 50,
  });

  const [agentChain, setAgentChain] = useState(() => createAgentChain(personality));

  const handlePersonalityUpdate = (newTraits: PersonalityTraits) => {
    setPersonality(newTraits);
    setAgentChain(createAgentChain(newTraits));
  };

  const handleSendMessage = async (message: string) => {
    const result = await agentChain.invoke(message);
    return result;
  };

  return (
    <main className="container mx-auto p-4 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8">Reflection Machine</h1>
      
      <Tabs defaultValue="chat" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="chat">Chat Interface</TabsTrigger>
          <TabsTrigger value="personality">Personality Config</TabsTrigger>
        </TabsList>
        
        <TabsContent value="chat" className="h-[calc(100vh-12rem)]">
          <ChatInterface
            personality={personality}
            onSendMessage={handleSendMessage}
          />
        </TabsContent>
        
        <TabsContent value="personality">
          <div className="flex justify-center items-start pt-8">
            <PersonalityConfig
              onSave={handlePersonalityUpdate}
              initialTraits={personality}
            />
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
}

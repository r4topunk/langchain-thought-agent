import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-neutral-950 to-neutral-900 text-neutral-50">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            Reflection Machine
          </h1>
          <p className="text-xl text-neutral-400">
            An AI agent that reflects on topics through different emotional lenses
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card className="bg-neutral-800/50 border-neutral-700 backdrop-blur-sm hover:bg-neutral-800/70 transition-all">
            <CardHeader>
              <CardTitle className="text-2xl">Begin Your Reflection Journey</CardTitle>
              <CardDescription>
                Input a topic and watch the AI reflect through different emotional perspectives
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-neutral-300">
                The Reflection Machine combines multiple emotional perspectives to provide
                deep, nuanced thoughts on any topic you provide.
              </p>
              <div className="grid grid-cols-5 gap-2 mt-4">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-yellow-500 mb-2 flex items-center justify-center">
                    <span className="text-lg">😊</span>
                  </div>
                  <span className="text-sm">Joy</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-blue-500 mb-2 flex items-center justify-center">
                    <span className="text-lg">😢</span>
                  </div>
                  <span className="text-sm">Sadness</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-red-500 mb-2 flex items-center justify-center">
                    <span className="text-lg">😠</span>
                  </div>
                  <span className="text-sm">Anger</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-purple-500 mb-2 flex items-center justify-center">
                    <span className="text-lg">😨</span>
                  </div>
                  <span className="text-sm">Fear</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-green-500 mb-2 flex items-center justify-center">
                    <span className="text-lg">🤢</span>
                  </div>
                  <span className="text-sm">Disgust</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                <Link href="/reflect">
                  Begin Your Reflection
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="bg-neutral-800/50 border-neutral-700 backdrop-blur-sm hover:bg-neutral-800/70 transition-all">
            <CardHeader>
              <CardTitle className="text-2xl">About Reflection Machine</CardTitle>
              <CardDescription>
                Control your AI's personality blend to see different perspectives
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-neutral-300">
                Inspired by the movie "Inside Out", this AI lets you tune the balance of emotions 
                to shape how it reflects on topics. From joyful optimism to cautious analysis or critical reflection.
              </p>
              <div className="mt-4 h-48 relative border border-neutral-700 rounded-lg overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-neutral-400">RPG-style mind control interface</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link href="/personalities">
                  Manage Personalities
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

        <Tabs defaultValue="about" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="about">How It Works</TabsTrigger>
            <TabsTrigger value="examples">Example Reflections</TabsTrigger>
            <TabsTrigger value="history">Your History</TabsTrigger>
          </TabsList>
          <TabsContent value="about" className="bg-neutral-800/30 p-6 rounded-lg border border-neutral-700">
            <h2 className="text-2xl font-bold mb-4">How The Reflection Machine Works</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">1</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Ask The Machine</h3>
                  <p className="text-neutral-300">
                    Input any topic, question, or situation you want the AI to reflect on deeply.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">2</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Tune Personality</h3>
                  <p className="text-neutral-300">
                    Adjust the emotional blend to shape how the AI will approach your topic.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">3</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Observe Thought Process</h3>
                  <p className="text-neutral-300">
                    Watch as the AI thinks through your topic step by step, showing its reasoning.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">4</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">View Final Reflection</h3>
                  <p className="text-neutral-300">
                    Get a thoughtful, multi-perspective reflection on your topic, influenced by the emotional blend you selected.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="examples" className="bg-neutral-800/30 p-6 rounded-lg border border-neutral-700">
            <h2 className="text-2xl font-bold mb-4">Example Reflections</h2>
            <div className="space-y-4">
              <p className="text-neutral-400 italic">
                Start creating reflections to see examples here
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="history" className="bg-neutral-800/30 p-6 rounded-lg border border-neutral-700">
            <h2 className="text-2xl font-bold mb-4">Your Reflection History</h2>
            <div className="space-y-4">
              <p className="text-neutral-400 italic">
                Your past reflections will appear here
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}

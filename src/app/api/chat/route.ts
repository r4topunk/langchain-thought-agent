import { NextRequest, NextResponse } from 'next/server';
import { PersonalityTraits, createAgentChain } from '@/lib/agent/config';
import { ChatOpenAI } from '@langchain/openai';
import { MemorySaver } from "@langchain/langgraph";
import { HumanMessage } from "@langchain/core/messages";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { z } from "zod";

// Define structured output schema
const agentResponseSchema = z.object({
  thought: z.string().describe("The agent's internal reasoning process"),
  emotion: z.enum(["joy", "sadness", "anger", "fear", "disgust"]).describe("The primary emotion in the response"),
  intensity: z.number().min(1).max(100).describe("The intensity of the emotion, from 1 to 100"),
  response: z.string().describe("The actual response to the user"),
});

// In-memory store for conversation threads
const conversationThreads: Map<string, {
  agent: ReturnType<typeof createReactAgent>;
  messages: Array<{ role: string; content: string; thought?: string; emotion?: string; intensity?: number; }>;
}> = new Map();

export async function POST(req: NextRequest) {
  try {
    const { message, personality, threadId }: {
      message: string;
      personality: PersonalityTraits;
      threadId: string;
    } = await req.json();

    if (!message || !personality || !threadId) {
      return NextResponse.json(
        { error: 'Message, personality traits and threadId are required' },
        { status: 400 }
      );
    }

    // Configure the model with personality traits
    const agentModel = new ChatOpenAI({
      modelName: "gpt-4",
      temperature: (personality.joy + personality.sadness + personality.anger +
        personality.fear + personality.disgust) / 500, // Scale to 0-1
    });

    // Apply structured output to the model
    const structuredAgentModel = agentModel.withStructuredOutput(agentResponseSchema);

    // Initialize memory to persist state between agent runs
    const agentCheckpointer = new MemorySaver();

    // Create the agent without tools but with structured output
    const agent = createReactAgent({
      llm: structuredAgentModel,
      tools: [], // No tools as requested
      checkpointSaver: agentCheckpointer,
    });

    // Invoke the agent with the user message using the correct invocation pattern
    const result = await agent.invoke(
      { messages: [new HumanMessage(message)] },
      { configurable: { thread_id: threadId } }
    );

    // Add AI response to our thread store
    const thread = conversationThreads.get(threadId) || {
      agent,
      messages: []
    };
    
    // Store the thread if it doesn't exist
    if (!conversationThreads.has(threadId)) {
      conversationThreads.set(threadId, thread);
    }
    
    thread.messages.push({
      role: 'assistant',
      content: result.response,
      thought: result.thought,
      emotion: result.emotion,
      intensity: result.intensity
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error processing chat:', error);

    // Enhanced error logging to help with debugging
    if (error instanceof Error) {
      console.error(`Error name: ${error.name}`);
      console.error(`Error message: ${error.message}`);
      console.error(`Error stack: ${error.stack}`);
    }

    return NextResponse.json(
      { error: 'Failed to process chat message' },
      { status: 500 }
    );
  }
}
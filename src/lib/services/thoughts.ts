import { prisma } from '../db/client';
import { Thought, Prompt } from '@prisma/client';

export type ThoughtWithPrompt = Thought & {
  prompt: Prompt;
};

// Get all final (non-intermediate) thoughts
export async function getAllFinalThoughts(): Promise<ThoughtWithPrompt[]> {
  return prisma.thought.findMany({
    where: { isIntermediateStep: false },
    include: { prompt: true },
    orderBy: { createdAt: 'desc' }
  });
}

// Get thought history for a specific prompt
export async function getThoughtHistoryForPrompt(promptId: string): Promise<Thought[]> {
  return prisma.thought.findMany({
    where: { promptId },
    orderBy: { createdAt: 'asc' }
  });
}

// Get a specific thought by ID
export async function getThoughtById(thoughtId: string): Promise<ThoughtWithPrompt | null> {
  return prisma.thought.findUnique({
    where: { id: thoughtId },
    include: { prompt: true }
  });
}

// Get the final thought for a specific prompt
export async function getFinalThoughtForPrompt(promptId: string): Promise<Thought | null> {
  return prisma.thought.findFirst({
    where: {
      promptId,
      isIntermediateStep: false
    }
  });
}

// Get recent final thoughts with pagination
export async function getRecentFinalThoughts(
  limit: number = 10,
  offset: number = 0
): Promise<ThoughtWithPrompt[]> {
  return prisma.thought.findMany({
    where: { isIntermediateStep: false },
    include: { prompt: true },
    orderBy: { createdAt: 'desc' },
    take: limit,
    skip: offset
  });
}

// Create a new prompt and return its ID
export async function createPrompt(content: string): Promise<Prompt> {
  return prisma.prompt.create({
    data: { content }
  });
}

// Store a thought (intermediate or final)
export async function storeThought(
  content: string,
  promptId: string,
  personalityType: string,
  isIntermediateStep: boolean = false
): Promise<Thought> {
  return prisma.thought.create({
    data: {
      content,
      promptId,
      personalityType,
      isIntermediateStep
    }
  });
}
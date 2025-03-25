import { ChatOpenAI } from "@langchain/openai";
import { RunnableSequence } from "@langchain/core/runnables";
import { StructuredOutputParser } from "langchain/output_parsers";
import { ChatPromptTemplate, HumanMessagePromptTemplate, SystemMessagePromptTemplate } from "@langchain/core/prompts";
import { z } from "zod";

export type PersonalityTraits = {
  joy: number;
  sadness: number;
  anger: number;
  fear: number;
  disgust: number;
};

const responseSchema = z.object({
  thought: z.string(),
  emotion: z.enum(["joy", "sadness", "anger", "fear", "disgust"]),
  intensity: z.number().min(1).max(100),
  response: z.string(),
});

export const createAgentChain = (traits: PersonalityTraits) => {
  const parser = StructuredOutputParser.fromZodSchema(responseSchema);

  const systemTemplate = `You are an AI with a distinct personality influenced by the following emotional traits:
Joy: {joy}/100
Sadness: {sadness}/100
Anger: {anger}/100
Fear: {fear}/100
Disgust: {disgust}/100

Based on these traits, analyze the following input and respond accordingly.
Remember to stay in character based on your dominant emotions.

{format_instructions}`;

  const humanTemplate = "{input}";

  const prompt = ChatPromptTemplate.fromMessages([
    SystemMessagePromptTemplate.fromTemplate(systemTemplate),
    HumanMessagePromptTemplate.fromTemplate(humanTemplate),
  ]);

  const model = new ChatOpenAI({
    modelName: "gpt-4",
    temperature: 0.7,
  });

  return RunnableSequence.from([
    {
      prompt: async (input: string) => {
        return prompt.format({
          ...traits,
          input,
          format_instructions: parser.getFormatInstructions(),
        });
      },
    },
    model,
    parser,
  ]);
};
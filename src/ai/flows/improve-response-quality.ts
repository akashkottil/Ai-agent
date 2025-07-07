'use server';

/**
 * @fileOverview An AI agent that improves response quality based on user feedback.
 *
 * - improveResponseQuality - A function that enhances the quality of bot responses using user feedback.
 * - ImproveResponseQualityInput - The input type for the improveResponseQuality function.
 * - ImproveResponseQualityOutput - The return type for the improveResponseQuality function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ImproveResponseQualityInputSchema = z.object({
  message: z.string().describe('The message from the bot that the user is providing feedback on.'),
  feedback: z.string().describe('The feedback provided by the user on the bot message.'),
  botRole: z.string().describe('The current role of the bot. e.g. Real Estate Agent, Financial Advisor'),
});
export type ImproveResponseQualityInput = z.infer<typeof ImproveResponseQualityInputSchema>;

const ImproveResponseQualityOutputSchema = z.object({
  improvedResponse: z.string().describe('The improved response from the bot based on user feedback.'),
});
export type ImproveResponseQualityOutput = z.infer<typeof ImproveResponseQualityOutputSchema>;

export async function improveResponseQuality(input: ImproveResponseQualityInput): Promise<ImproveResponseQualityOutput> {
  return improveResponseQualityFlow(input);
}

const prompt = ai.definePrompt({
  name: 'improveResponseQualityPrompt',
  input: {schema: ImproveResponseQualityInputSchema},
  output: {schema: ImproveResponseQualityOutputSchema},
  prompt: `You are an AI bot that is continuously improving its responses based on user feedback.

You will receive a message, user feedback, and the current bot role.
Use this information to generate an improved response that is more accurate and helpful.

Message: {{{message}}}
Feedback: {{{feedback}}}
Bot Role: {{{botRole}}}

Improved Response:`,
});

const improveResponseQualityFlow = ai.defineFlow(
  {
    name: 'improveResponseQualityFlow',
    inputSchema: ImproveResponseQualityInputSchema,
    outputSchema: ImproveResponseQualityOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

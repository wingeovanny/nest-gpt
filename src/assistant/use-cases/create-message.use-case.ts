import OpenAI from 'openai';

interface IOptions {
  threadId: string;
  question: string;
  maxTokens?: number;
}
export const createMessageUseCase = async (
  openai: OpenAI,
  options: IOptions,
) => {
  const { threadId, question } = options;
  const message = await openai.beta.threads.messages.create(threadId, {
    role: 'user',
    content: question,
  });
  console.log(message);
  return message;
};

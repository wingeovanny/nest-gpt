import OpenAI from 'openai';

interface IOptions {
  threadId: string;
}
export const getMessageListUseCase = async (
  openai: OpenAI,
  options: IOptions,
) => {
  const { threadId } = options;
  const messagesLit = await openai.beta.threads.messages.list(threadId);
  console.log(messagesLit);
  const messages = messagesLit.data.map((message) => ({
    role: message.role,
    content: message.content.map((content) => (content as any).text.value),
  }));
  return messages;
};

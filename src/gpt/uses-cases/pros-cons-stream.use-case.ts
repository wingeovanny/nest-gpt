import OpenAI from 'openai';

interface IOptions {
  prompt: string;
}
export const prosConsDiscuseerStreamUseCase = async (
  openai: OpenAI,
  { prompt }: IOptions,
) => {
  return await openai.chat.completions.create({
    stream: true,
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: `Se te dara una pregunta y tu tarea es dar una respuesta con pros y contras,
        la respuesta debe ser en formato markdown,
        los pros y contras deben de estar en una lista`,
      },
      { role: 'user', content: prompt },
    ],
    temperature: 0.9,
  });
};

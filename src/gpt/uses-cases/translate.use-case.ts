import OpenAI from 'openai';

interface IOptions {
  prompt: string;
  lang: string;
}

export const translateUseCase = async (
  openai: OpenAI,
  { prompt, lang }: IOptions,
) => {
  const resul = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: `Traduce el siguiente texto ${prompt} al lenguaje ${lang}`,
      },
    ],
    temperature: 0.2,
  });

  return { message: resul.choices[0].message.content };
};

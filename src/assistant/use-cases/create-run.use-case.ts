import OpenAI from 'openai';
interface IOptions {
  threadId: string;
  assistanId?: string;
}

export const createRunUseCase = async (openai: OpenAI, options: IOptions) => {
  const { threadId, assistanId = process.env.ASSISTANT_ID_KBOT_IA } = options;

  const run = await openai.beta.threads.runs.create(threadId, {
    assistant_id: assistanId,
    //instructions: //si pone aqui algun texto, esto lo sobrescribe a todo las instrucciones que tiene configurado el asistente
  });
  console.log(run);
  return run;
};

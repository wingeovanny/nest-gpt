import OpenAI from 'openai';
interface IOptions {
  threadId: string;
  assistanId?: string;
}

export const createRunUseCase = async (openai: OpenAI, options: IOptions) => {
  const { threadId, assistanId = 'asst_nfG28abtjRgf6UI9iBS0Z8lX' } = options;

  const run = await openai.beta.threads.runs.create(threadId, {
    assistant_id: assistanId,
  });
  console.log(run);
  return run;
};

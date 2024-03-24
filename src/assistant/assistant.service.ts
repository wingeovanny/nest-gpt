import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { QuestionDto } from './dtos/question.dto';
import {
  checkCompleteStatusUseCase,
  createMessageUseCase,
  createRunUseCase,
  createThreadUseCase,
  getMessageListUseCase,
} from './use-cases';

@Injectable()
export class AssistantService {
  private readonly openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  async createThread() {
    return createThreadUseCase(this.openai);
  }

  async userQuestion(questionDto: QuestionDto) {
    const { threadId, question } = questionDto;

    createMessageUseCase(this.openai, { threadId, question });

    const run = await createRunUseCase(this.openai, { threadId });

    await checkCompleteStatusUseCase(this.openai, { runId: run.id, threadId });

    const messages = await getMessageListUseCase(this.openai, { threadId });

    return messages.reverse();
  }
}

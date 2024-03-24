import { Body, Controller, Post } from '@nestjs/common';
import { AssistantService } from './assistant.service';
import { QuestionDto } from './dtos/question.dto';

@Controller('assistant')
export class AssistantController {
  constructor(private readonly assistantService: AssistantService) {}

  @Post('create-thread')
  async createThread() {
    console.log('create-thread');
    return this.assistantService.createThread();
  }

  @Post('user-question')
  async userQuestions(@Body() questionDto: QuestionDto) {
    return this.assistantService.userQuestion(questionDto);
  }
}

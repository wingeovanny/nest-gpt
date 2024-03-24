import OpenAI from 'openai';
import * as path from 'path';
import * as fs from 'fs';
import { Injectable, NotFoundException } from '@nestjs/common';
import {
  AudioTotextDto,
  ImageGenerationDto,
  ImageVariationDto,
  OrthographyDto,
  ProsConsDiscusserDto,
  SellerDto,
  TextToAudioDto,
  TranslateDto,
} from './dtos';
import {
  audioToTextUseCase,
  getAudioByIdUseCase,
  orthographyCheckUseCase,
  prosConsDiscuseerStreamUseCase,
  prosConsDiscuseerUseCase,
  textToAudioUseCase,
  translateUseCase,
  sellerUseCase,
  sellerVitaminUseCase,
  imageVariationUseCase,
  imageGenerationUseCase,
} from './uses-cases';

@Injectable()
export class GptService {
  private openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  async orthograpyCheck(orthographyDto: OrthographyDto) {
    return orthographyCheckUseCase(this.openai, {
      prompt: orthographyDto.prompt,
    });
  }

  async prosConsDiscusser(prosConsDiscusser: ProsConsDiscusserDto) {
    return prosConsDiscuseerUseCase(this.openai, {
      prompt: prosConsDiscusser.prompt,
    });
  }

  async prosConsDiscusserStream(prosConsDiscusser: ProsConsDiscusserDto) {
    return prosConsDiscuseerStreamUseCase(this.openai, {
      prompt: prosConsDiscusser.prompt,
    });
  }
  async translateText({ prompt, lang }: TranslateDto) {
    return translateUseCase(this.openai, {
      prompt,
      lang,
    });
  }
  async textToAudio({ prompt, voice }: TextToAudioDto) {
    return textToAudioUseCase(this.openai, {
      prompt,
      voice,
    });
  }

  async getAudioById(id: string) {
    return getAudioByIdUseCase(id);
  }

  async audioToText(
    audioFile: Express.Multer.File,
    audioToText: AudioTotextDto,
  ) {
    const { prompt } = audioToText;
    return audioToTextUseCase(this.openai, { audioFile, prompt });
  }

  async imageGeneration(imageGenerationDto: ImageGenerationDto) {
    return await imageGenerationUseCase(this.openai, { ...imageGenerationDto });
  }
  async geneateImageVariation({ baseImage }: ImageVariationDto) {
    return imageVariationUseCase(this.openai, { baseImage });
  }
  getGeneratedImage(fileName: string) {
    const filePath = path.resolve('./', './generated/images/', fileName);
    const exists = fs.existsSync(filePath);

    if (!exists) {
      throw new NotFoundException('File not found');
    }

    return filePath;
  }

  async seller(sellerDto: SellerDto) {
    return sellerUseCase(this.openai, {
      prompt: sellerDto.prompt,
    });
  }

  async sellerVitamin(sellerDto: SellerDto) {
    return sellerVitaminUseCase(this.openai, {
      prompt: sellerDto.prompt,
    });
  }
}

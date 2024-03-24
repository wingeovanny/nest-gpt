import { FileInterceptor } from '@nestjs/platform-express';
import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  HttpStatus,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { GptService } from './gpt.service';
import {
  AudioTotextDto,
  ImageGenerationDto,
  OrthographyDto,
  ProsConsDiscusserDto,
  SellerDto,
  TextToAudioDto,
  TranslateDto,
} from './dtos';
import { diskStorage } from 'multer';

@Controller('gpt')
export class GptController {
  constructor(private readonly gptService: GptService) {}
  @Post('orthography-check')
  async orthograpyCheck(@Body() orthographyDto: OrthographyDto) {
    return this.gptService.orthograpyCheck(orthographyDto);
  }

  @Post('pros-cons-discusser')
  async prosConsDiscusser(
    @Body() processConsDiscusserDto: ProsConsDiscusserDto,
  ) {
    return this.gptService.prosConsDiscusser(processConsDiscusserDto);
  }
  @Post('pros-cons-discusser-stream')
  async prosConsDiscusserStream(
    @Body() processConsDiscusserDto: ProsConsDiscusserDto,
    @Res() res: Response,
  ) {
    const stream = await this.gptService.prosConsDiscusserStream(
      processConsDiscusserDto,
    );
    res.setHeader('Content-Type', 'aplication/json');
    res.status(HttpStatus.OK);
    for await (const chunk of stream) {
      const piece = chunk.choices[0].delta.content || '';
      console.log(piece);
      res.write(piece);
    }

    res.end();
  }

  @Post('translate')
  async translateText(@Body() translate: TranslateDto) {
    return this.gptService.translateText(translate);
  }

  @Post('text-to-audio')
  async textToAudio(@Body() textToAudio: TextToAudioDto, @Res() res: Response) {
    const filePath = await this.gptService.textToAudio(textToAudio);
    res.setHeader('Content-Type', 'audio/mp3');
    res.status(HttpStatus.OK);
    res.sendFile(filePath);
  }

  @Get('text-to-audio/:fileId')
  async getAudioById(@Param('fileId') id: string, @Res() res: Response) {
    const filePath = await this.gptService.getAudioById(id);
    res.setHeader('Content-Type', 'audio/mp3');
    res.status(HttpStatus.OK);
    console.log(filePath);
    res.sendFile(filePath);
  }

  @Post('audio-to-text')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './generated/uploads',
        filename: (req, file, callback) => {
          const fileExtension = file.originalname.split('.').pop();
          const fileName = `${new Date().getTime()}.${fileExtension}`;
          return callback(null, fileName);
        },
      }),
    }),
  )
  async audioToText(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 1000 * 1024 * 5,
            message: 'File is bigger than 5 mb ',
          }),
          new FileTypeValidator({ fileType: 'audio/*' }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Body() audiototext: AudioTotextDto,
  ) {
    return this.gptService.audioToText(file, audiototext);
  }

  @Post('seller')
  async seller(@Body() seller: SellerDto) {
    const sales = await this.gptService.seller(seller);
    return sales;
  }

  @Post('image-generation')
  async imageGeneration(@Body() imageGenerationDto: ImageGenerationDto) {
    return await this.gptService.imageGeneration(imageGenerationDto);
  }

  @Get('image-generation/:filename')
  async getGenerated(
    @Res() res: Response,
    @Param('filename') fileName: string,
  ) {
    const filePath = this.gptService.getGeneratedImage(fileName);
    res.status(HttpStatus.OK);
    res.sendFile(filePath);
  }

  @Post('sellerVitamin')
  async sellerVitamin(@Body() seller: SellerDto) {
    console.log('sellerVitamin');
    const sales = await this.gptService.sellerVitamin(seller);
    return sales;
  }
}

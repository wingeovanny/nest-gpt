import { NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

export const getAudioByIdUseCase = async (id: string) => {
  const filePath = path.resolve(
    __dirname,
    `../../../generated/audios/${id}.mp3`,
  );

  const wasFound = fs.existsSync(filePath);
  if (!wasFound) {
    throw new NotFoundException(`Audio with id ${id} not found`);
  }
  return filePath;
};

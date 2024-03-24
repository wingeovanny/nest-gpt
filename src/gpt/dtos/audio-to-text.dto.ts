import { IsOptional, IsString } from 'class-validator';

export class AudioTotextDto {
  @IsString()
  @IsOptional()
  readonly prompt?: string;
}

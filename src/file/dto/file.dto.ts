import { ApiProperty } from '@nestjs/swagger';

export class FileDto {
  @ApiProperty({
    required: true,
    type: 'string',
    format: 'binary',
  })
  file: Express.Multer.File;
}

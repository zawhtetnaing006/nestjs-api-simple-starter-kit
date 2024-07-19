import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileService } from './service/file.service';

import { FileInterceptor } from '@nestjs/platform-express';
import { FileDto } from './dto/file.dto';

@ApiTags('File')
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}
  @Post('test')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file: Express.Multer.File, @Body() fileDto: FileDto) {
    console.log(fileDto);
    return this.fileService.upload(file);
  }
}

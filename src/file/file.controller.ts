import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileService } from './service/file.service';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileDto } from './dto/file.dto';
import { FileUploadDto } from './dto/file-upload.dto';
import { FileResponseDto } from './dto/file-response.dto';

@ApiTags('File')
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}
  @Post('test')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file: Express.Multer.File, @Body() fileDto: FileDto) {
    const fileUploadDto: FileUploadDto = {
      fileName: file.originalname,
      relativePath: 'profile',
      file: file
    }
    const fileResponse: FileResponseDto = this.fileService.upload(fileUploadDto);
    console.log(fileResponse);
    return 'Success';
  }

  @Get('delete')
  delete(@Query('filePath') filePath: string) {
    return this.fileService.delete(filePath);
  }

  @Get('')
  get(@Query('filePath') filePath:string, @Res() res: Response) {
    const file: FileResponseDto = this.fileService.get(filePath);
    res.setHeader('Content-Type', file.mimeType);
    res.send(file.file);
  }

}

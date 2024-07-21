import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { FileServiceInterface } from '../interface/file.service.interface';
import * as fs from 'fs';
import * as path from 'path';
import * as mime from 'mime-types';
import { FileUploadDto } from '../dto/file-upload.dto';
import { FileResponseDto } from '../dto/file-response.dto';

@Injectable()
export class FileLocalService implements FileServiceInterface {
  private readonly uploadPath = './uploads';

  constructor() {
    if (!fs.existsSync(this.uploadPath)) {
      fs.mkdirSync(this.uploadPath, { recursive: true });
    }
  }

  async upload(fileUploadDto: FileUploadDto): Promise<FileResponseDto> {
    try {
      const dirPath = path.join(this.uploadPath, fileUploadDto.relativePath);
      const filePath = path.join(dirPath, fileUploadDto.fileName);

      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }

      fs.writeFileSync(filePath, fileUploadDto.file.buffer);

      const mimeType = mime.lookup(filePath);
      const stats = fs.statSync(filePath);

      return {
        file: fileUploadDto.file.buffer,
        mimeType,
        size: stats.size,
      };
    } catch (error) {
      throw new HttpException(
        'Error uploading file: ' + error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(filePath: string): Promise<boolean> {
    try {
      const fullFilePath = path.join(this.uploadPath, filePath);

      if (!fs.existsSync(fullFilePath)) {
        throw new HttpException('File not found', HttpStatus.NOT_FOUND);
      }

      fs.unlinkSync(fullFilePath);
      return true;
    } catch (error) {
      throw new HttpException(
        'Error deleting file: ' + error.message,
        error.status,
      );
    }
  }

  async get(filePath: string): Promise<FileResponseDto> {
    try {
      const fullFilePath = path.join(this.uploadPath, filePath);

      if (!fs.existsSync(fullFilePath)) {
        throw new HttpException('File not found', HttpStatus.NOT_FOUND);
      }

      const fileBuffer = fs.readFileSync(fullFilePath);
      const mimeType = mime.lookup(fullFilePath);
      const stats = fs.statSync(fullFilePath);

      return {
        file: fileBuffer,
        mimeType,
        size: stats.size,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error retrieving file: ' + error.message,
        error.status,
      );
    }
  }
}

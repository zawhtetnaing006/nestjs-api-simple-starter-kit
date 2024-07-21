import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileLocalService } from './file.local.service';
import { FileServiceInterface } from '../interface/file.service.interface';
import { FileS3Service } from './file.s3.service';
import { FileUploadDto } from '../dto/file-upload.dto';

@Injectable()
export class FileService implements FileServiceInterface {
  private fileService;
  constructor(
    @Inject('STORAGE_DRIVER') private storageDriver: string,
    private readonly configSerice: ConfigService,
    private readonly fileLocalService: FileLocalService,
    private readonly fileS3Service: FileS3Service,
  ) {
    this.loadService();
  }

  loadService() {
    if (this.storageDriver === 'local') {
      this.fileService = this.fileLocalService;
    } else if (this.storageDriver === 's3') {
      this.fileService = this.fileS3Service;
    }
  }

  async upload(fileUploadDto: FileUploadDto) {
    return await this.fileService.upload(fileUploadDto);
  }

  delete(filePath: string) {
    return this.fileService.delete(filePath);
  }

  get(filePath: string) {
    return this.fileService.get(filePath);
  }
}

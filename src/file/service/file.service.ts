import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileLocalService } from './file.local.service';
import { FileServiceInterface } from '../interface/file.service.interface';
import { FileS3Service } from './file.s3.service';

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

  upload(file: Express.Multer.File) {
    return this.fileService.upload(file);
  }

  delete() {
    return this.fileService.delete();
  }
}

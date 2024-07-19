import { Injectable } from '@nestjs/common';
import { FileServiceInterface } from '../interface/file.service.interface';

@Injectable()
export class FileS3Service implements FileServiceInterface {
  upload(file) {
    console.log(file);
    return `This function upload file using S3Service`;
  }

  delete() {
    return `This function delete file using S3Service.`;
  }
}

import { Injectable } from '@nestjs/common';
import { FileServiceInterface } from '../interface/file.service.interface';

@Injectable()
export class FileLocalService implements FileServiceInterface {
  upload(file) {
    console.log(file);
    return `This function upload file using localService`;
  }

  delete() {
    return `This function delete file using localService.`;
  }
}

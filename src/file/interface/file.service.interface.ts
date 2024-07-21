import { FileResponseDto } from '../dto/file-response.dto';
import { FileUploadDto } from '../dto/file-upload.dto';

export interface FileServiceInterface {
  upload(fileUploadDto: FileUploadDto): Promise<FileResponseDto>;
  delete(filePath: string): Promise<boolean>;
  get(filePath: string): Promise<FileResponseDto>;
}

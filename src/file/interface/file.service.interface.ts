import { FileResponseDto } from "../dto/file-response.dto";
import { FileUploadDto } from "../dto/file-upload.dto";

export interface FileServiceInterface {
  upload(fileUploadDto: FileUploadDto): FileResponseDto;
  delete(filePath: string): boolean;
  get(filePath: string): FileResponseDto;

}

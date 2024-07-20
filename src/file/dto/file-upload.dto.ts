export class FileUploadDto {
    fileName: string;
    relativePath: string;
    file: Express.Multer.File;
}
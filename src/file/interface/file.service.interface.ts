export interface FileServiceInterface {
  upload(file: Express.Multer.File);
  delete();
}

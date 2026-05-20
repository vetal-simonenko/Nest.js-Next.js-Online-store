import {
  Controller,
  HttpCode,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileService } from './file.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Auth } from '../auth/decorators/auth.decorators';

@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post()
  @HttpCode(200)
  @UseInterceptors(FilesInterceptor('files'))
  @Auth()
  async saveFiles(
    @UploadedFiles() files: Express.Multer.File[],
    @Query('folder') folder?: string,
  ) {
    return this.fileService.saveFiles(files, folder);
  }
}

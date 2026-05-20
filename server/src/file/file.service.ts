import { Injectable } from '@nestjs/common';
import { join } from 'node:path';
import { ensureDir, writeFile } from 'fs-extra';
import { FileResponse } from './file.interface';

@Injectable()
export class FileService {
  async saveFiles(files: Express.Multer.File[], folder = 'products') {
    const uploadFolder = join(process.cwd(), 'uploads', folder);

    await ensureDir(uploadFolder);

    const response: FileResponse[] = await Promise.all(
      files.map(async (file) => {
        const fileName = `${Date.now()}-${file.originalname}`;
        const filePath = join(uploadFolder, fileName);

        await writeFile(filePath, file.buffer);

        return {
          url: `/uploads/${folder}/${fileName}`,
          name: fileName,
        };
      }),
    );

    return response;
  }
}

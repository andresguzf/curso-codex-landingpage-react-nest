import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary, type UploadApiResponse } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  private readonly cloudName?: string;
  private readonly apiKey?: string;
  private readonly apiSecret?: string;
  private readonly folder: string;

  constructor(private readonly configService: ConfigService) {
    this.cloudName = this.configService.get<string>('CLOUDINARY_CLOUD_NAME');
    this.apiKey = this.configService.get<string>('CLOUDINARY_API_KEY');
    this.apiSecret = this.configService.get<string>('CLOUDINARY_API_SECRET');
    this.folder = this.configService.get<string>('CLOUDINARY_FOLDER') ?? 'codecimena/courses';

    if (this.isConfigured()) {
      cloudinary.config({
        cloud_name: this.cloudName,
        api_key: this.apiKey,
        api_secret: this.apiSecret,
      });
    }
  }

  async uploadCourseImage(file: Express.Multer.File): Promise<{ url: string; public_id: string }> {
    if (!this.isConfigured()) {
      throw new ServiceUnavailableException('Cloudinary no esta configurado en el backend');
    }

    const uploadResult = await new Promise<UploadApiResponse>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: this.folder,
            resource_type: 'image',
          },
          (error, result) => {
            if (error || !result) {
              reject(error ?? new Error('Cloudinary no devolvio resultado'));
              return;
            }

            resolve(result);
          },
        )
        .end(file.buffer);
    });

    return {
      url: uploadResult.secure_url,
      public_id: uploadResult.public_id,
    };
  }

  private isConfigured() {
    return Boolean(this.cloudName && this.apiKey && this.apiSecret);
  }
}

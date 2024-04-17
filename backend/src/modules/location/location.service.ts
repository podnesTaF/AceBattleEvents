import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { FileService } from '../file/file.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { EditLocationDto } from './dto/edit-location.dto';
import { Location } from './entities/location.entity';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
    private readonly fileService: FileService,
  ) {}

  async createLocation(
    dto: CreateLocationDto,
    placeImage?: Express.Multer.File,
  ): Promise<Location> {
    let placeImageUrl: string | null = null;

    if (placeImage) {
      placeImageUrl = await this.uploadImage(placeImage);
    }

    return await this.locationRepository.save({
      ...dto,
      placeImageUrl,
    });
  }

  async updateLocation(
    id: number,
    dto: EditLocationDto,
    placeImage: Express.Multer.File,
  ): Promise<UpdateResult> {
    const location = await this.locationRepository.findOne({ where: { id } });

    let placeImageUrl: string | null = null;

    if (placeImage) {
      placeImageUrl = await this.uploadImage(
        placeImage,
        location.placeImageUrl,
      );
    }

    return await this.locationRepository.update(
      { id },
      {
        ...dto,
        placeImageUrl: placeImageUrl || location.placeImageUrl,
      },
    );
  }

  async uploadImage(
    placeImage: Express.Multer.File,
    toReplace?: string,
  ): Promise<string> {
    return await this.fileService.uploadFileToStorage(
      placeImage.originalname,
      `locations/`,
      placeImage.mimetype,
      placeImage.buffer,
      {
        mediaName: placeImage.originalname,
        contentType: placeImage.mimetype,
      },
      toReplace,
    );
  }
}

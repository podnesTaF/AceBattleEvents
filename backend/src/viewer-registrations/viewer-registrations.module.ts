import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from 'src/events/entities/event.entity';
import { FileService } from 'src/file/file.service';
import { Media } from 'src/media/entities/media.entity';
import { MediaService } from 'src/media/media.service';
import { User } from 'src/user/entities/user.entity';
import { ViewerRegistration } from './entities/viewer-registration.entity';
import { ViewerRegistrationsController } from './viewer-registrations.controller';
import { ViewerRegistrationsService } from './viewer-registrations.service';

@Module({
  imports: [TypeOrmModule.forFeature([ViewerRegistration, Event, User, Media])],
  controllers: [ViewerRegistrationsController],
  providers: [ViewerRegistrationsService, FileService, MediaService],
})
export class ViewerRegistrationsModule {}

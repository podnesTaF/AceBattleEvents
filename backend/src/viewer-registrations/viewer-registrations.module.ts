import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from 'src/events/entities/event.entity';
import { ViewerRegistration } from './entities/viewer-registration.entity';
import { ViewerRegistrationsController } from './viewer-registrations.controller';
import { ViewerRegistrationsService } from './viewer-registrations.service';

@Module({
  imports: [TypeOrmModule.forFeature([ViewerRegistration, Event])],
  controllers: [ViewerRegistrationsController],
  providers: [ViewerRegistrationsService],
})
export class ViewerRegistrationsModule {}

import { PartialType } from '@nestjs/mapped-types';
import { CreateViewerRegistrationDto } from './create-viewer-registration.dto';

export class UpdateViewerRegistrationDto extends PartialType(CreateViewerRegistrationDto) {}

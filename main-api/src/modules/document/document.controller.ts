import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';
import { Roles } from 'src/modules/auth/roles/roles-auth.decorator';
import { DocumentService } from './document.service';
import { CreateDocumentDto } from './dto/create-document.dto';

@ApiTags('events', 'documents')
@Controller('documents')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  // create document (for event)
  @Post()
  @UseGuards(RolesGuard)
  @Roles('admin')
  async createDocument(@Body() dto: CreateDocumentDto) {
    return this.documentService.createDocument(dto);
  }

  // edit document

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles('admin')
  async updateDocument(
    @Body() dto: CreateDocumentDto,
    @Param('id') id: number,
  ) {
    return this.documentService.updateDocument(id, dto);
  }

  // delete document
}

import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/roles/roles-auth.decorator';
import { CountryService } from './country.service';
import { CreateCountryDto } from './dto/create-country.dto';

@Controller('countries')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Post('create-many')
  @UseGuards(RolesGuard)
  @Roles('admin')
  createMany(@Body() body: CreateCountryDto[]) {
    return this.countryService.createManyCountries(body);
  }
}

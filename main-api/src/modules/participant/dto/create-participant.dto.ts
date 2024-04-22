import { IsArray, IsNumber, IsString } from "class-validator";

export class CreateParticipantDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  email: string;

  @IsNumber()
  eventId: number;

  @IsString()
  phoneNumber: string;

  @IsString()
  phoneCode: string;

  @IsString()
  dateOfBirth: string;

  @IsNumber()
  genderId: number;

  @IsNumber()
  countryId: number;

  @IsString()
  city: string;

  @IsArray()
  @IsNumber({}, { each: true })
  eventCategoryIds: number[];
}

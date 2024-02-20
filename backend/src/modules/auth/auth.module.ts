import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountryService } from 'src/modules/country/country.service';
import { Country } from 'src/modules/country/entity/country.entity';
import { ResetUser } from 'src/modules/reset-user/entities/reset-user.entity';
import { ResetUserService } from 'src/modules/reset-user/reset-user.service';
import { UserModule } from '../users/modules/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Global()
@Module({
  imports: [
    UserModule,
    PassportModule,
    ConfigModule.forRoot(),
    JwtModule.registerAsync({
      useFactory: async () => {
        return {
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: '60m' },
        };
      },
    }),
    TypeOrmModule.forFeature([Country, ResetUser]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    CountryService,
    RolesGuard,
    JwtAuthGuard,
    ResetUserService,
  ],
  exports: [PassportModule, JwtModule],
})
export class AuthModule {}

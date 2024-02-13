import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { resolve } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BestResultsModule } from './best-results/best-results.module';
import { CategoryModule } from './category/category.module';
import typeOrmConfig from './config/typeorm.config';
import { ContentModule } from './content/content.module';
import { CountryModule } from './country/country.module';
import { GenderModule } from './gender/gender.module';
import { HashtagModule } from './hashtag/hashtag.module';
import { IntegrationModule } from './integration/integration.module';
import { MediaModule } from './media/media.module';
import { NewsModule } from './news/news.module';
import { PushTokenModule } from './push-token/push-token.module';
import { ResetUserModule } from './reset-user/reset-user.module';
import { RoleModule } from './role/role.module';
import { StandardModule } from './standard/standard.module';
import { UserRoleModule } from './user-role/user-role.module';
import { UserModule } from './users/modules/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }), // Import the ConfigModule to load environment variables
    TypeOrmModule.forRoot(typeOrmConfig),
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, 'static'),
    }),
    UserModule,
    AuthModule,
    CountryModule,
    MediaModule,
    NewsModule,
    HashtagModule,
    ContentModule,
    IntegrationModule,
    ResetUserModule,
    PushTokenModule,
    RoleModule,
    UserRoleModule,
    GenderModule,
    CategoryModule,
    BestResultsModule,
    StandardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

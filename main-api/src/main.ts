import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { config } from "dotenv";
import { AppModule } from "./app.module";

async function bootstrap() {
  config();
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [/^(.*)/],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 200,
    credentials: true,
    allowedHeaders:
      "Origin,X-Requested-With,Content-Type,Accept,Authorization,authorization,X-Forwarded-for",
  });
  app.useGlobalPipes(new ValidationPipe());

  const documentConfig = new DocumentBuilder()
    .setTitle("Ace Battle Mile API 2.0")
    .setDescription(
      "The description of the ABM 2.0 for the Ace Battle Mile application.",
    )
    .setVersion("2.0")
    .build();
  const document = SwaggerModule.createDocument(app, documentConfig);
  SwaggerModule.setup("api/docs", app, document);

  app.setGlobalPrefix("api/v2");
  await app.listen(process.env.PORT || 4000, process.env.HOST);
}
bootstrap();

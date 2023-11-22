import { NestFactory } from "@nestjs/core";
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

  app.setGlobalPrefix("api/v1");
  await app.listen(process.env.PORT || 4000, process.env.HOST);
}
bootstrap();

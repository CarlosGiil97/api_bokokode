import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe());

    const config = new DocumentBuilder()
        .setTitle('API Prueba técnica Bokokode')
        .setDescription('API Prueba técnica Bokokode')
        .setVersion('1.0')
        .addTag('Productos')
        .addTag('Categorías')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);

    await app.listen(3000);
}
bootstrap();
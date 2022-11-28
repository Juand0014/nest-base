import { applyDecorators } from "@nestjs/common";
import { ApiResponse, DocumentBuilder } from "@nestjs/swagger";

export const configSwagger = new DocumentBuilder()
  .addBearerAuth()
  .setTitle('BaseNest')
  .setDescription('Base with the simple method')
  .setVersion('1.0')
  .build();

export function ApiResponseStatus() {
  return applyDecorators(
    ApiResponse({ status: 201, description: 'OK.'}),
    ApiResponse({ status: 200, description: 'The record has been successfully found.'}),
    ApiResponse({ status: 400, description: 'Bad Request.'}),
    ApiResponse({ status: 401, description: 'Unauthorized.'}),
    ApiResponse({ status: 404, description: 'Not Found.'}),
  );
}


import { Module } from '@nestjs/common';
import { CatalogController } from './catalog.controller.js';
import { CatalogService } from './catalog.service.js';
import { CatalogRepository } from './catalog.repository.js';

@Module({
  // Note: Ensure your catalog.controller.ts uses "export class CatalogController"
  controllers: [CatalogController],
  providers: [CatalogService, CatalogRepository],
  exports: [CatalogService] // This export is required for the ordering module to use it!
})
export class CatalogModule {}
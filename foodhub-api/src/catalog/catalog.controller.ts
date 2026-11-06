import { Controller, Get } from '@nestjs/common';
import { CatalogService } from './catalog.service.js';

@Controller('restaurants')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @Get()
  getRestaurants() {
    return 'Catalog controller is active';
  }
}
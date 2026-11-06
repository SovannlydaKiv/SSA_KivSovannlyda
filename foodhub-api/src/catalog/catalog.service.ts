import { Injectable } from '@nestjs/common';
import { CatalogRepository } from './catalog.repository.js';

@Injectable()
export class CatalogService {
  constructor(private readonly catalogRepo: CatalogRepository) {}

  restaurantExists(id: number): boolean {
    const restaurant = this.catalogRepo.get(id); 
    return restaurant !== undefined; 
  }
}
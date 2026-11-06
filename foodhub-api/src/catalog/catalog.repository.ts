import { Injectable } from '@nestjs/common';

export interface Restaurant {
  id: number;
  name: string;
  area: string;
}

@Injectable()
export class CatalogRepository {
  private readonly restaurants: Restaurant[] = [ 
    { id: 1, name: 'NumBanhChokCorner', area: 'DaunPenh' }, 
    { id: 2, name: 'LokLakHouse', area: 'BKK1' }, 
    { id: 3, name: 'AmokGarden', area: 'ToulKork' }, 
  ];

  get(id: number): Restaurant | undefined {
    return this.restaurants.find(r => r.id === id);
  }
}
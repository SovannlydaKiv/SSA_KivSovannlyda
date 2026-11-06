// src/ordering/orders.controller.ts
import { Controller, Get, Post, Body, Param, Headers } from '@nestjs/common';
import { OrdersService } from './orders.service.js';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async placeOrder(
    @Body() body: { restaurantId: number; items: string[] },
    @Headers('idempotency-key') key?: string,
  ) {
    // Controller only handles the HTTP request, then passes data to the service
    return this.ordersService.place(body.restaurantId, body.items, key);
  }

  @Get(':id')
  async getOrder(@Param('id') id: string) {
    return this.ordersService.get(id);
  }

  @Post(':id/status') // Note: If your Week 4 code used @Patch for this, change it to @Patch
  async changeStatus(
    @Param('id') id: string,
    @Body('status') status: string,
  ) {
    return this.ordersService.changeStatus(id, status);
  }
}
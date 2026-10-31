import { Body, Controller, Headers, HttpCode, NotFoundException, ConflictException, Post, Get, Patch, Param, Res } from '@nestjs/common';
import type { Response } from 'express';
import { ArrayNotEmpty, IsInt, IsString, IsIn } from 'class-validator';
import { randomUUID } from 'node:crypto';
import { IDEMPOTENCY, ORDERS, RESTAURANTS } from './data.js';

export class CreateOrderDto {
  @IsInt() 
  restaurantId: number;
  
  @ArrayNotEmpty() 
  @IsString({ each: true }) 
  items: string[];
}

export class UpdateOrderStatusDto {
  @IsIn(['COOKING', 'DELIVERING', 'DELIVERED', 'CANCELLED'])
  status: string;
}

@Controller('v1/orders')
export class OrdersController {
  @Post()
  @HttpCode(201)
  create(
    @Body() dto: CreateOrderDto,
    @Headers('idempotency-key') key: string | undefined,
    @Res({ passthrough: true }) res: Response
  ) {
    if (key && IDEMPOTENCY.has(key)) {
      res.status(200);
      return ORDERS.get(IDEMPOTENCY.get(key)!);
    }
    
    if (!RESTAURANTS.some(r => r.id === dto.restaurantId)) {
      throw new NotFoundException('restaurant not found');
    }
    
    const order = { id: randomUUID(), status: 'PLACED', ...dto };
    ORDERS.set(order.id, order);
    
    if (key) {
      IDEMPOTENCY.set(key, order.id);
    }
    
    return order;
  }

  @Get(':id')
  getOrder(@Param('id') id: string) {
    const order = ORDERS.get(id);
    if (!order) throw new NotFoundException('order not found');
    return order;
  }

  @Patch(':id')
  updateOrderStatus(@Param('id') id: string, @Body() dto: UpdateOrderStatusDto) {
    const order = ORDERS.get(id);
    if (!order) throw new NotFoundException('order not found');

    const validTransitions: Record<string, string[]> = {
      'PLACED': ['COOKING', 'CANCELLED'],
      'COOKING': ['DELIVERING'],
      'DELIVERING': ['DELIVERED'],
      'DELIVERED': [],
      'CANCELLED': []
    };

    if (!validTransitions[order.status]?.includes(dto.status)) {
      throw new ConflictException(`invalid status transition`);
    }

    order.status = dto.status;
    return order;
  }
}
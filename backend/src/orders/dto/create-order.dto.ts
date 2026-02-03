import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsUUID, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export enum OrderType {
    DINE_IN = 'DINE_IN',
    DELIVERY = 'DELIVERY',
    TAKE_AWAY = 'TAKE_AWAY',
}

export enum OrderStatus {
    PENDING = 'PENDING',
    PREPARING = 'PREPARING',
    READY = 'READY',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED',
}

export class CreateOrderItemDto {
    @IsUUID()
    @IsNotEmpty()
    productId: string;

    @IsNumber()
    @Min(1)
    quantity: number;
}

export class CreateOrderDto {
    @IsEnum(OrderType)
    @IsOptional()
    type?: OrderType;

    @IsUUID()
    @IsOptional()
    tableId?: string;

    @IsUUID()
    @IsOptional()
    serverId?: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateOrderItemDto)
    items: CreateOrderItemDto[];
}

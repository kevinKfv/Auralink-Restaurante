import { IsNumber, Min, IsOptional, IsEnum } from 'class-validator';

export enum TableStatus {
    AVAILABLE = 'AVAILABLE',
    OCCUPIED = 'OCCUPIED',
    RESERVED = 'RESERVED',
}

export class CreateTableDto {
    @IsNumber()
    @Min(1)
    number: number;

    @IsNumber()
    @Min(1)
    @IsOptional()
    capacity?: number;

    @IsEnum(TableStatus)
    @IsOptional()
    status?: TableStatus;
}

import { IsString, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateIngredientDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    unit: string;

    @IsNumber()
    @Min(0)
    cost: number;

    @IsNumber()
    @Min(0)
    stock: number;

    @IsNumber()
    @Min(0)
    minStock: number;
}

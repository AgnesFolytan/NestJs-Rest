import {IsDefined, IsNumber, IsString, Min } from "class-validator"

export class createProductDto {
    @IsDefined({
        message: "The product name is required!"
    })
    @IsString()
    name: string;

    @IsDefined()
    @IsNumber()
    @Min(1, {message: "The price must be a positive number."})
    price: number;
}
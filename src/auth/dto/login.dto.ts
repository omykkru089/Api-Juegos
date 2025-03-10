import { Transform } from "class-transformer";
import { IsEmail, IsOptional, IsString, MinLength,  } from "class-validator";

export class LoginDto {
    @IsEmail()
    email:string;
    @Transform(({value}) => value.trim())
    @IsString()
    @MinLength(6)
    password:string;
    @IsString()
    @IsOptional()
    role:string;
}
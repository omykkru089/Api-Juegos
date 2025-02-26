import { IsOptional, IsString, IsEmail, MinLength } from 'class-validator';
export class CreateUserDto {
    @IsOptional()
    @IsString()
    email?:string;
    @IsOptional()
    @IsString()
    password?:string;
    @IsOptional()
    @IsString()
    nombre?: string;
    @IsOptional()
    @IsString()
    role?: string;
}

import { IsEmail, IsNotEmpty, Matches, MinLength  } from "class-validator"  


export class UserRegisterDTO { 
    
    @IsNotEmpty()
    name: string

    @IsEmail()
    @IsNotEmpty()
    email: string

    @MinLength(8)
    password: string

}
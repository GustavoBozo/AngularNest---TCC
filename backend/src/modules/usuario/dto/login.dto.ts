import { IsEmail, IsNotEmpty, Matches, MinLength  } from "class-validator"


export class loginDTO {
    
    @IsEmail()
    email: string

    @IsNotEmpty()
    @MinLength(8)
    password: string
}
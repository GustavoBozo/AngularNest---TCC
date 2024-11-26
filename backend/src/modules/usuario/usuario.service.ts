import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserRegisterDTO } from './dto/user.dto';
import { compare, hash } from 'bcrypt';
import { loginDTO } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class UsuarioService {
    constructor(private prisma:PrismaService,
         
        private jwt:JwtService
    ){}

        
    async getUser(){
        return this.prisma.user.findMany()
        
    }

    async getUserEmail(email: string){
        return this.prisma.user.findUnique({
            where: {
                email: email
            }
        })
        
    }

    async create(data: UserRegisterDTO) {
        const user = await this.prisma.user.findFirst({
            where: {
                email: data.email
            }
        })

        if(user){
            throw new HttpException({message: 'Esse email já esta cadastrado'}, HttpStatus.BAD_REQUEST) 
        }

        const hasPassword = await hash(data.password, 8)

        const res = await this.prisma.user.create({
            data: {...data, password: hasPassword}
        })

        return res
    } 

    async login(login: loginDTO):Promise<any> {
        const user = await this.prisma.user.findUnique({
            where: {
                email: login.email
            }
        })

        if(!user){
            throw new HttpException({message: 'Usuário não cadastrado'}, HttpStatus.UNAUTHORIZED)
        }


        const verify = await compare(login.password, user.password)

        if(!verify) {
            throw new HttpException({message: 'Email ou senha incorretos'}, HttpStatus.UNAUTHORIZED)
        }

        const payload = {
            id: user.id,
            nome: user.name,
            email: user.email,
        }

        const accesToken = await this.jwt.signAsync(payload, {
            secret: process.env.ACCES_TOKEN_KEY,
            expiresIn: '1h'
        })


        const refreshToken = await this.jwt.signAsync(payload, {
            secret: process.env.REFRESEH_TOKEN_KEY,
            expiresIn: '7d'
        })

        
        

        return {
            accesToken,
            refreshToken
        }

        

    }
}

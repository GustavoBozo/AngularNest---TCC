import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { CookieService } from 'ngx-cookie-service';

@Module({
  controllers: [UsuarioController],
  providers: [UsuarioService, PrismaService, JwtService, CookieService],
})
export class UsuarioModule {}

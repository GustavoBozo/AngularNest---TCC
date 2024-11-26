import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { EquipeService } from '../equipe/equipe.service';

@Module({
  controllers: [UsuarioController],
  providers: [UsuarioService, PrismaService, JwtService, EquipeService],
})
export class UsuarioModule {}

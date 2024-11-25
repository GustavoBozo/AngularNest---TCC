import { Module } from '@nestjs/common';
import { MetadadoService } from './metadado.service';
import { MetadadoController } from './metadado.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [MetadadoController],
  providers: [MetadadoService, PrismaService],
})
export class MetadadoModule {}

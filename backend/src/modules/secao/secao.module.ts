import { Module } from '@nestjs/common';
import { SecaoService } from './secao.service';
import { SecaoController } from './secao.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [SecaoController],
  providers: [SecaoService, PrismaService],
})
export class SecaoModule {}

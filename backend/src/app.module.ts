import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { PrismaService } from './prisma.service';
import { MetadadoModule } from './modules/metadado/metadado.module';
import { EquipeModule } from './modules/equipe/equipe.module';
import { DocumentoModule } from './modules/documento/documento.module';
import { SecaoModule } from './modules/secao/secao.module';

@Module({
  imports: [UsuarioModule, MetadadoModule, EquipeModule, DocumentoModule, SecaoModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}

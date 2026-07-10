import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

// Módulo global para não precisar reimportar o PrismaService em cada módulo de domínio.
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}

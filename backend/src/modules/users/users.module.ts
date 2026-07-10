import { Module } from '@nestjs/common';
import { UsersRepository } from './domain/ports/users.repository';
import { CreateUserUseCase } from './application/use-cases/create-user.use-case';
import { UpdateUserUseCase } from './application/use-cases/update-user.use-case';
import { FindUserUseCase } from './application/use-cases/find-user.use-case';
import { UsersPrismaRepository } from './infrastructure/prisma/users.prisma.repository';
import { UsersController } from './presentation/controllers/users.controller';

// Aqui é onde a "mágica" da inversão de dependência acontece:
// o domínio pede um UsersRepository (abstrato), e o Nest injeta o adapter concreto (Prisma).
@Module({
  controllers: [UsersController],
  providers: [
    CreateUserUseCase,
    UpdateUserUseCase,
    FindUserUseCase,
    { provide: UsersRepository, useClass: UsersPrismaRepository },
  ],
  exports: [UsersRepository, CreateUserUseCase],
})
export class UsersModule {}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../common/prisma/prisma.service';
import { UserEntity } from '../../domain/entities/user.entity';
import { UsersRepository } from '../../domain/ports/users.repository';
import { UserMapper } from '../mappers/user.mapper';

// Implementação concreta da porta UsersRepository usando Prisma + MySQL.
@Injectable()
export class UsersPrismaRepository implements UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: { name: string; email: string; password: string }): Promise<UserEntity> {
    const raw = await this.prisma.user.create({ data });
    return UserMapper.toDomain(raw);
  }

  async update(
    id: string,
    data: Partial<{ name: string; email: string; avatarUrl: string }>,
  ): Promise<UserEntity> {
    const raw = await this.prisma.user.update({ where: { id }, data });
    return UserMapper.toDomain(raw);
  }

  async findById(id: string): Promise<UserEntity | null> {
    const raw = await this.prisma.user.findUnique({ where: { id } });
    return raw ? UserMapper.toDomain(raw) : null;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const raw = await this.prisma.user.findUnique({ where: { email } });
    return raw ? UserMapper.toDomain(raw) : null;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }
}

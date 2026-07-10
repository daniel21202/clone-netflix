import { User as PrismaUser } from '@prisma/client';
import { UserEntity } from '../../domain/entities/user.entity';

// Converte entre o modelo do Prisma (banco) e a entidade pura de domínio.
export class UserMapper {
  static toDomain(raw: PrismaUser): UserEntity {
    return new UserEntity(
      raw.id,
      raw.name,
      raw.email,
      raw.password,
      raw.avatarUrl,
      raw.createdAt,
    );
  }
}

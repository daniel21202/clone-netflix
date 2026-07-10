import { UserEntity } from '../entities/user.entity';

// Contrato (porta) exigido pelo domínio. A infraestrutura é quem implementa isso.
export abstract class UsersRepository {
  abstract create(data: {
    name: string;
    email: string;
    password: string;
  }): Promise<UserEntity>;

  abstract update(
    id: string,
    data: Partial<{ name: string; email: string; avatarUrl: string }>,
  ): Promise<UserEntity>;

  abstract findById(id: string): Promise<UserEntity | null>;

  abstract findByEmail(email: string): Promise<UserEntity | null>;

  abstract delete(id: string): Promise<void>;
}

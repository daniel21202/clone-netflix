import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from '../../domain/ports/users.repository';

@Injectable()
export class FindUserUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(id: string) {
    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }
    return user.toPublic();
  }
}

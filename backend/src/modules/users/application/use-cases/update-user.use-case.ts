import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from '../../domain/ports/users.repository';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UpdateUserUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(id: string, dto: UpdateUserDto) {
    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    const updated = await this.usersRepository.update(id, dto);
    return updated.toPublic();
  }
}

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserUseCase } from '../../../users/application/use-cases/create-user.use-case';
import { RegisterDto } from '../dto/register.dto';

// Reaproveita o caso de uso de criação de usuário do módulo users
// e adiciona a regra específica de autenticação: gerar o token ao final.
@Injectable()
export class RegisterUseCase {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly jwtService: JwtService,
  ) {}

  async execute(dto: RegisterDto) {
    const user = await this.createUserUseCase.execute(dto);
    const accessToken = this.jwtService.sign({ sub: user.id, email: user.email });
    return { user, accessToken };
  }
}

import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../../auth/infrastructure/guards/jwt-auth.guard';
import { UpdateUserDto } from '../../application/dto/update-user.dto';
import { FindUserUseCase } from '../../application/use-cases/find-user.use-case';
import { UpdateUserUseCase } from '../../application/use-cases/update-user.use-case';

// Endpoint REST (adapter de apresentação). Só traduz HTTP <-> caso de uso.
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(
    private readonly findUserUseCase: FindUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
  ) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findUserUseCase.execute(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.updateUserUseCase.execute(id, dto);
  }
}

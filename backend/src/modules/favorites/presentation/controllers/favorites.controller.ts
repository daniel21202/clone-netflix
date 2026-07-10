import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../../auth/infrastructure/guards/jwt-auth.guard';
import { CreateFavoriteDto } from '../../application/dto/create-favorite.dto';
import { AddFavoriteUseCase } from '../../application/use-cases/add-favorite.use-case';
import { ListFavoritesUseCase } from '../../application/use-cases/list-favorites.use-case';
import { RemoveFavoriteUseCase } from '../../application/use-cases/remove-favorite.use-case';

@Controller('favorites')
@UseGuards(JwtAuthGuard)
export class FavoritesController {
  constructor(
    private readonly addFavoriteUseCase: AddFavoriteUseCase,
    private readonly removeFavoriteUseCase: RemoveFavoriteUseCase,
    private readonly listFavoritesUseCase: ListFavoritesUseCase,
  ) {}

  @Get()
  list(@Req() req: any) {
    return this.listFavoritesUseCase.execute(req.user.id);
  }

  @Post()
  add(@Req() req: any, @Body() dto: CreateFavoriteDto) {
    return this.addFavoriteUseCase.execute(req.user.id, dto);
  }

  @Delete(':movieId')
  remove(@Req() req: any, @Param('movieId', ParseIntPipe) movieId: number) {
    return this.removeFavoriteUseCase.execute(req.user.id, movieId);
  }
}

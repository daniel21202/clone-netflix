import { Module } from '@nestjs/common';
import { FavoritesRepository } from './domain/ports/favorites.repository';
import { AddFavoriteUseCase } from './application/use-cases/add-favorite.use-case';
import { RemoveFavoriteUseCase } from './application/use-cases/remove-favorite.use-case';
import { ListFavoritesUseCase } from './application/use-cases/list-favorites.use-case';
import { FavoritesPrismaRepository } from './infrastructure/prisma/favorites.prisma.repository';
import { FavoritesController } from './presentation/controllers/favorites.controller';

@Module({
  controllers: [FavoritesController],
  providers: [
    AddFavoriteUseCase,
    RemoveFavoriteUseCase,
    ListFavoritesUseCase,
    { provide: FavoritesRepository, useClass: FavoritesPrismaRepository },
  ],
})
export class FavoritesModule {}

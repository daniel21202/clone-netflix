import { Injectable } from '@nestjs/common';
import { FavoritesRepository } from '../../domain/ports/favorites.repository';
import { CreateFavoriteDto } from '../dto/create-favorite.dto';

@Injectable()
export class AddFavoriteUseCase {
  constructor(private readonly favoritesRepository: FavoritesRepository) {}

  execute(userId: string, dto: CreateFavoriteDto) {
    return this.favoritesRepository.add({
      userId,
      movieId: dto.movieId,
      title: dto.title,
      posterUrl: dto.posterUrl ?? null,
    });
  }
}

import { Injectable } from '@nestjs/common';
import { FavoritesRepository } from '../../domain/ports/favorites.repository';

@Injectable()
export class RemoveFavoriteUseCase {
  constructor(private readonly favoritesRepository: FavoritesRepository) {}

  execute(userId: string, movieId: number) {
    return this.favoritesRepository.remove(userId, movieId);
  }
}

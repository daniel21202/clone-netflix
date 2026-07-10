import { Injectable } from '@nestjs/common';
import { FavoritesRepository } from '../../domain/ports/favorites.repository';

@Injectable()
export class ListFavoritesUseCase {
  constructor(private readonly favoritesRepository: FavoritesRepository) {}

  execute(userId: string) {
    return this.favoritesRepository.listByUser(userId);
  }
}

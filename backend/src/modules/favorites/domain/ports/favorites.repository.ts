import { FavoriteEntity } from '../entities/favorite.entity';

export abstract class FavoritesRepository {
  abstract add(data: {
    userId: string;
    movieId: number;
    title: string;
    posterUrl: string | null;
  }): Promise<FavoriteEntity>;

  abstract remove(userId: string, movieId: number): Promise<void>;

  abstract listByUser(userId: string): Promise<FavoriteEntity[]>;
}

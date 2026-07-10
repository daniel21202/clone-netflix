import { Favorite as PrismaFavorite } from '@prisma/client';
import { FavoriteEntity } from '../../domain/entities/favorite.entity';

export class FavoriteMapper {
  static toDomain(raw: PrismaFavorite): FavoriteEntity {
    return new FavoriteEntity(
      raw.id,
      raw.userId,
      raw.movieId,
      raw.title,
      raw.posterUrl,
      raw.createdAt,
    );
  }
}

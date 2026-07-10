import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../common/prisma/prisma.service';
import { FavoriteEntity } from '../../domain/entities/favorite.entity';
import { FavoritesRepository } from '../../domain/ports/favorites.repository';
import { FavoriteMapper } from '../mappers/favorite.mapper';

@Injectable()
export class FavoritesPrismaRepository implements FavoritesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async add(data: {
    userId: string;
    movieId: number;
    title: string;
    posterUrl: string | null;
  }): Promise<FavoriteEntity> {
    const raw = await this.prisma.favorite.upsert({
      where: { userId_movieId: { userId: data.userId, movieId: data.movieId } },
      update: {},
      create: data,
    });
    return FavoriteMapper.toDomain(raw);
  }

  async remove(userId: string, movieId: number): Promise<void> {
    await this.prisma.favorite.delete({
      where: { userId_movieId: { userId, movieId } },
    });
  }

  async listByUser(userId: string): Promise<FavoriteEntity[]> {
    const raws = await this.prisma.favorite.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
    return raws.map(FavoriteMapper.toDomain);
  }
}

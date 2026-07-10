import { Module } from '@nestjs/common';
import { TmdbService } from './infrastructure/tmdb/tmdb.service';
import { MoviesController } from './presentation/controllers/movies.controller';

@Module({
  controllers: [MoviesController],
  providers: [TmdbService],
  exports: [TmdbService],
})
export class MoviesModule {}

import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { TmdbService } from '../../infrastructure/tmdb/tmdb.service';

// Este controller existe para o caso de você preferir concentrar TUDO
// (auth + catálogo) num único backend. O frontend também pode chamar o TMDB
// direto via seu próprio proxy (ver src/app/api/tmdb no frontend).
@Controller('movies')
export class MoviesController {
  constructor(private readonly tmdb: TmdbService) {}

  @Get('trending')
  trending() {
    return this.tmdb.trending();
  }

  @Get('genres')
  genres() {
    return this.tmdb.genres();
  }

  @Get('by-genre/:genreId')
  byGenre(@Param('genreId', ParseIntPipe) genreId: number) {
    return this.tmdb.byGenre(genreId);
  }

  @Get('search')
  search(@Query('q') query: string) {
    return this.tmdb.search(query);
  }

  @Get(':id')
  details(@Param('id', ParseIntPipe) id: number) {
    return this.tmdb.details(id);
  }
}

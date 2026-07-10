import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';

// Adapter de infraestrutura que isola qualquer chamada externa ao TMDB.
// Se um dia trocarmos de provedor de catálogo, só este arquivo muda.
@Injectable()
export class TmdbService {
  private readonly client: AxiosInstance;

  constructor(private readonly config: ConfigService) {
    this.client = axios.create({
      baseURL: this.config.get<string>('TMDB_BASE_URL'),
      params: { api_key: this.config.get<string>('TMDB_API_KEY'), language: 'pt-BR' },
    });
  }

  private async request(path: string, params: Record<string, unknown> = {}) {
    try {
      const { data } = await this.client.get(path, { params });
      return data;
    } catch (error: any) {
      throw new HttpException(
        error?.response?.data ?? 'Erro ao consultar o TMDB',
        error?.response?.status ?? 502,
      );
    }
  }

  trending() {
    return this.request('/trending/movie/week');
  }

  byGenre(genreId: number) {
    return this.request('/discover/movie', { with_genres: genreId, sort_by: 'popularity.desc' });
  }

  genres() {
    return this.request('/genre/movie/list');
  }

  search(query: string) {
    return this.request('/search/movie', { query });
  }

  details(movieId: number) {
    return this.request(`/movie/${movieId}`, { append_to_response: 'videos,credits,similar' });
  }
}

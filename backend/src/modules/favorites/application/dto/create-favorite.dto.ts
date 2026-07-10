import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateFavoriteDto {
  @IsInt()
  movieId: number;

  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  posterUrl?: string;
}

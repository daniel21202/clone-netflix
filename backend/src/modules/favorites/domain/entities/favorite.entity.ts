export class FavoriteEntity {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly movieId: number,
    public readonly title: string,
    public readonly posterUrl: string | null,
    public readonly createdAt: Date,
  ) {}
}

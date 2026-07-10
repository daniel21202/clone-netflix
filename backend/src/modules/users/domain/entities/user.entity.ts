// Modelo puro de domínio: não conhece Prisma, HTTP ou qualquer framework.
export class UserEntity {
  constructor(
    public readonly id: string,
    public name: string,
    public email: string,
    public password: string, // já vem hasheado quando armazenado
    public avatarUrl: string | null,
    public readonly createdAt: Date,
  ) {}

  // Regra de negócio simples de exemplo: nunca expor a senha ao serializar.
  toPublic() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      avatarUrl: this.avatarUrl,
      createdAt: this.createdAt,
    };
  }
}

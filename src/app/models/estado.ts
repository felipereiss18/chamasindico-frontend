export class Estado {
  id: string;
  nome: string | undefined = '';
  ibge: number | undefined = 0

  constructor(
    id: string,
    nome?: string,
    ibge?: number
  ) {
    this.id = id;
    this.nome = nome;
    this.ibge = ibge
  }
}

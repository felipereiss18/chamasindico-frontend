export class Comunicado {
  id: number | undefined;
  data: string;
  vencimento: string;
  titulo: string;
  corpo: string;


  constructor(data: string, vencimento: string, titulo: string, corpo: string, id?: number) {
    this.id = id;
    this.data = data;
    this.vencimento = vencimento;
    this.titulo = titulo;
    this.corpo = corpo;
  }
}

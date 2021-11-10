export class Garagem {

  numero: number | undefined;
  placa: string | undefined;
  marca: string | undefined;
  modelo: string | undefined;
  anoFabricacao: number | undefined;
  anoModelo: number | undefined;

  constructor(numero?: number, placa?: string, marca?: string, modelo?: string, anoFabricacao?: number, anoModelo?: number) {
    this.numero = numero;
    this.placa = placa;
    this.marca = marca;
    this.modelo = modelo;
    this.anoFabricacao = anoFabricacao;
    this.anoModelo = anoModelo;
  }
}

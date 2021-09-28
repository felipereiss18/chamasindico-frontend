import {Estado} from "./estado";
import {Bloco} from "./bloco";

export class Condominio {
  id: number | undefined;
  nome: string | undefined;
  cnpj: string | undefined;
  cep: string | undefined;
  endereco: string | undefined;
  bairro: string | undefined;
  numero: string | undefined;
  complemento: string | undefined;
  cidade: string | undefined;
  estado: Estado | undefined;
  blocos: Bloco[] | undefined;
  situacao: boolean | undefined;


  constructor(id?: number,
              nome?: string,
              cnpj?: string,
              cep?: string,
              endereco?: string,
              bairro?: string,
              numero?: string,
              complemento?: string,
              cidade?: string,
              estado?: Estado,
              blocos?: Bloco[]) {
    this.id = id;
    this.nome = nome;
    this.cnpj = cnpj;
    this.cep = cep;
    this.endereco = endereco;
    this.bairro = bairro;
    this.numero = numero;
    this.complemento = complemento;
    this.cidade = cidade;
    this.estado = estado;
    this.blocos = blocos;
  }
}

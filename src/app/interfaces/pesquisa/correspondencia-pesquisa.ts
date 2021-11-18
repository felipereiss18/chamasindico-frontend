export interface CorrespondenciaPesqReq {
  unidade: number;
  bloco: string;
  data: string;
  entrega: string;
  remetente: string;
}

export interface CorrespondenciaPesqResp {
  id: number;
  unidade: number;
  bloco: string;
  funcionarioCriacao: string;
  funcionarioEntrega: string;
  data: string;
  entrega: string;
  remetente: string;
}

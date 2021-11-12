export interface FuncionarioPesqReq {
  nome: string;
  usuario: string;
}

export interface FuncionarioPesqResp {
  id: number;
  nome: string;
  usuario: string;
  email: string;
  telefone: string;
  nascimento: string;
  situacao: boolean;
}

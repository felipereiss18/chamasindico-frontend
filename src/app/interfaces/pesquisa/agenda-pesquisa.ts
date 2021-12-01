export interface AgendaPesquisa {
  id: number;
  unidade: number;
  bloco: string;
  data: Date;
  areaComum: string;
  inicio: string;
  termino: string;
  dono: boolean;
  confirmado: boolean;
  necessariaConfirmacao: boolean;
}

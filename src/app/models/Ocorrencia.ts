import {SituacaoOcorrencia} from "./SituacaoOcorrencia";

export class Ocorrencia {
  id: number | undefined;
  situacao: SituacaoOcorrencia | undefined;
  unidadeCriacao: number | undefined;
  blocoCriacao: string | undefined;
  unidadeDestinatario: number | undefined;
  blocoDestinatario: string | undefined;
  criador: string | undefined;
  data: Date | undefined;
  tipo: number | undefined;
  descricao: string | undefined;
  resposta: string | undefined;
  analise: Date | undefined;
  conclusao: Date | undefined;
}

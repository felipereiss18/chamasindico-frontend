import {SituacaoOcorrencia} from "../../models/SituacaoOcorrencia";

export class OcorrenciaPesqReq {
  data: string | undefined;
  tipo: number | undefined;
  situacao: SituacaoOcorrencia | undefined;
  descricao: string | undefined;
}

export class OcorrenciaPesqResp {
  id: number | undefined;
  data: Date | undefined;
  analise: Date | undefined;
  conclusao: Date | undefined;
  situacao: SituacaoOcorrencia | undefined;
  criador: string | undefined;
  unidade: number | undefined;
  bloco: string | undefined;
  tipo: number | undefined;
  dono: boolean | undefined;
}

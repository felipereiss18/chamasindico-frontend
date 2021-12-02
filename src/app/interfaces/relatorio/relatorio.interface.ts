export interface EstatisticaOcorrencia {
  name: string;
  value: number;
}

export interface EstatisticaAgendamento {
  name: string;
  value: number;
}

export interface EstatistiticaCorrespondenciaTipo {
  name: string;
  series: EstatisticaCorrespondencia[];
}

export interface EstatisticaCorrespondencia {
  name: string;
  value: string;
}

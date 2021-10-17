import {DiaSemanaEnum} from "../enums/dia-semana.enum";

export function convertEnumDiaSemanaToArray() : [{id: number, descricao: string, value: boolean}] {
  // @ts-ignore
  const array: [{id: number, descricao: string, value: boolean}] = [];

  for (const [propertyKey, propertyValue] of Object.entries(DiaSemanaEnum)) {
    if (!Number.isNaN(Number(propertyKey))) {
      continue;
    }

    // @ts-ignore
    array.push({id: propertyValue, descricao: propertyKey, value: false})
  }

  return array;
}

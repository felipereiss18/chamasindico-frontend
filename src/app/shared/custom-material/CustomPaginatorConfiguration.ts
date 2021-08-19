import {MatPaginatorIntl} from "@angular/material/paginator";

export function CustomPaginator() {
  const customPaginatorIntl = new MatPaginatorIntl();
  customPaginatorIntl.itemsPerPageLabel = 'Mostrar';
  customPaginatorIntl.firstPageLabel = "Primeira página"
  customPaginatorIntl.previousPageLabel = 'Página anterior';
  customPaginatorIntl.nextPageLabel = 'Próxima página';
  customPaginatorIntl.firstPageLabel = "Última página"
  customPaginatorIntl.getRangeLabel = (page: number, pageSize: number, length: number) => {
    let ini = (page * pageSize)
    let end = ini + pageSize
    return `itens ${page + 1} - ${end} de ${length}`
  }
  return customPaginatorIntl;
}

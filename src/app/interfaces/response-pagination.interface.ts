export interface ResponsePagination<T> {

  data: {
    content: T[]
    pageable: {
      sort: {
        sorted: boolean,
        unsorted: boolean,
        empty: boolean
      },
      offset: number,
      pageNumber: number,
      pageSize: number,
      paged: boolean,
      unpaged: boolean
    },
    last: boolean,
    totalPages: number,
    totalElements: number,
    numberOfElements: number,
    number: number,
    first: boolean,
    sort: {
      sorted: boolean,
      unsorted: boolean,
      empty: boolean
    },
    size: number,
    empty: boolean
  },
  message: string
}

export const paginate = <T>(list: T[], page: number, perPage: number) =>
  list.slice(page * perPage - perPage, page * perPage)

export const paginate = <T>(array: T[], page: number, perPage: number): T[] =>
  array.slice(page * perPage - perPage, page * perPage)

export type Paginated = {
  [key: string]: unknown
  count: number
}

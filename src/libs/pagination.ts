export function getPaginationInfo (
  { page = 1, limit = 10, total = 0 }: { page?: number, limit?: number, total?: number }
) {
  const pages = Math.ceil(total / limit)

  return {
    currentPage: page,
    limit,
    total,
    pages,
    hasNext: page < pages,
    hasPrev: page > 1
  }
}

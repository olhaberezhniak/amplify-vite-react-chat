export const listMessages = `
  query ListMessages($limit: Int, $nextToken: String, $sortDirection: ModelSortDirection) {
    listMessages(limit: $limit, nextToken: $nextToken, sortDirection: $sortDirection) {
      items {
        id
        author
        content
        timestamp
      }
      nextToken
    }
  }
`;

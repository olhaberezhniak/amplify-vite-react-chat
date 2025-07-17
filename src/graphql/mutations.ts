export const createMessage = `
  mutation CreateMessage($input: CreateMessageInput!, $condition: ModelMessageConditionInput) {
    createMessage(input: $input, condition: $condition) {
      id
      author
      content
      timestamp
    }
  }
`;
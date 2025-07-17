import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  Message: a
    .model({
      author: a.string(),
      content: a.string(),
      timestamp: a.datetime(),
    })
    .authorization((allow) => [allow.publicApiKey()]),
});

export type Schema = ClientSchema<typeof schema>;
export const data = defineData({ 
  schema, 
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    apiKeyAuthorizationMode: { expiresInDays: 30 },
  }, 
});
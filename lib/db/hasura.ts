import { MagicUserMetadata } from "magic-sdk";

export async function isNewUser(token: string, issuer: string) {
  const operationsDoc = `#graphql
    query isNewUser($issuer: String!) {
      users(where: {issuer: {_eq: $issuer}}) {
        id
        email
        issuer
      }
    }
  `;
  //did:ethr:0x22590D8c8Fb8547eA7CB60db18cD531CDC6633e9
  //0x22590D8c8Fb8547eA7CB60db18cD531CDC6633e9
  const response = await queryHasuraGQL(
    operationsDoc,
    "isNewUser",
    { issuer },
    token
  );

  console.log({ response, issuer });
  return response?.data?.users?.length === 0;
}

export async function queryHasuraGQL(
  operationsDoc: string,
  operationName: string,
  variables: Object,
  token: string
) {
  const endpoint = process.env.NEXT_PUBLIC_HASURA_ADMIN_URL || "";
  const secretKey = process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET || "";
  const result = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      query: operationsDoc,
      variables,
      operationName,
    }),
  });

  return await result.json();
}

export async function createNewUser(token: string, metadata: MagicUserMetadata) {
  const operationsDoc = `#graphql
    mutation createNewUser($issuer: String!, $email: String!, $publicAddress: String!) {
      insert_users(objects: {email: $email, issuer: $issuer, publicAddress: $publicAddress}) {
        returning {
          email
          id
          issuer
          publicAddress
        }
      }
    }
  `;
  //did:ethr:0x22590D8c8Fb8547eA7CB60db18cD531CDC6633e9
  //0x22590D8c8Fb8547eA7CB60db18cD531CDC6633e9
  const { issuer, email, publicAddress } = metadata
  const response = await queryHasuraGQL(
    operationsDoc,
    "createNewUser",
    { issuer, email, publicAddress },
    token
  );

  return response;
}

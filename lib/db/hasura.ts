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

export async function createNewUser(
  token: string,
  metadata: MagicUserMetadata
) {
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
  const { issuer, email, publicAddress } = metadata;
  const response = await queryHasuraGQL(
    operationsDoc,
    "createNewUser",
    { issuer, email, publicAddress },
    token
  );

  return response;
}

export async function findVideoIdByUser(
  token: string,
  userId: string,
  videoId: string
) {
  const operationsDoc = `#graphql
    query findVideoIdByUserId($userId: String!, $videoId: String!) {
      stats(where: {userId: {_eq: $userId}, videoId: {_eq: $videoId}}) {
        id
        userId
        videoId
        watched
        favorited
      }
    }
  `;

  const response = await queryHasuraGQL(
    operationsDoc,
    "findVideoIdByUserId",
    { videoId, userId },
    token
  );

  return response?.data?.stats;
}

export async function insertStats(
  token: string,
  {
    userId,
    videoId,
    favorited,
    watched,
  }: { userId: string; videoId: string; favorited: number; watched: boolean }
) {
  const operationsDoc = `#graphql
    mutation insertStats(
      $userId: String!,
      $videoId: String!,
      $watched: Boolean!,
      $favorited: Int!
    ) {
      insert_stats_one(object: {
        favorited: $favorited,
        userId: $userId, # "did:ethr:0x22590D8c8Fb8547eA7CB60db18cD531CDC6633e9",
        videoId: $videoId,# "gxc6y2ZVfCU",
        watched: $watched,
      }) {
        favorited
        id
        userId
        videoId
        watched
      }
    }
  `;

  // const { issuer, email, publicAddress } = metadata;
  const response = await queryHasuraGQL(
    operationsDoc,
    "insertStats",
    { userId, videoId, favorited, watched },
    token
  );

  return response;
}

export async function updateStats(
  token: string,
  {
    userId,
    videoId,
    favorited,
    watched,
  }: { userId: string; videoId: string; favorited: number; watched: boolean }
) {
  const operationsDoc = `#graphql
    mutation updateStats(
      $userId: String!,
      $videoId: String!,
      $watched: Boolean!,
      $favorited: Int!
    ) {
      update_stats(
        where: {
          videoId: {_eq: $videoId},
          userId: {_eq: $userId}
        }, 
        _set: {
          watched: $watched,
          favorited: $favorited
        }
      ) {
        returning {
          favorited
          id
          userId
          videoId
          watched
        }
      }
    }

  `;

  //const { issuer, email, publicAddress } = metadata;
  const response = await queryHasuraGQL(
    operationsDoc,
    "updateStats",
    { userId, videoId, favorited, watched },
    token
  );

  return response;
}

export async function getWatchedVideos(token: string, userId: string) {
  const operationsDoc = `#graphql
    query watchedVideos(
      $userId: String!,
    ) {
        stats(
          where: {
            watched: {_eq: true},
            userId: {_eq: $userId}
          }
        ) {
            videoId
            watched
          }
        }
  `;

  //const { issuer, email, publicAddress } = metadata;
  const response = await queryHasuraGQL(
    operationsDoc,
    "watchedVideos",
    { userId },
    token
  );

  return response?.data?.stats;
}

export async function getMyListVideos(token: string, userId: string) {
  const operationsDoc = `#graphql
    query favoritedVideos(
      $userId: String!,
    ) {
        stats(
          where: {
            favorited: {_eq: 1},
            userId: {_eq: $userId}
          }
        ) {
            videoId
          }
        }
  `;

  const response = await queryHasuraGQL(
    operationsDoc,
    "favoritedVideos",
    { userId },
    token
  );

  return response?.data?.stats;
}

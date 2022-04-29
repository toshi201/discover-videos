import { NextApiRequest, NextApiResponse } from "next";
import { magicAdmin } from "../../lib/magic";
import jwt from "jsonwebtoken";
import { createNewUser, isNewUser } from "../../lib/db/hasura";
import { setTokenCookie } from "../../lib/cookies";

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const auth = req.headers.authorization;
      const didToken = auth ? auth.substring(7) : "";
      console.log({ auth });
      console.log({ didToken });

      // invoke magic
      const metadata = await magicAdmin.users.getMetadataByToken(didToken);
      console.log({ metadata });

      // create jwt
      //      const jwt = require('jsonwebtoken');
      const payload = {
        ...metadata,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000 + 7 * 24 * 60 * 60),
        "https://hasura.io/jwt/claims": {
          "x-hasura-allowed-roles": ["user", "admin"],
          "x-hasura-default-role": "user",
          "x-hasura-user-id": `${metadata.issuer}`,
        },
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET || "");

      console.log({ token });

      //check if user exists
      const isNewUserQuery = await isNewUser(token, metadata.issuer || "");
      isNewUserQuery && await createNewUser(token, metadata);
      setTokenCookie(token, res);
      res.send({ done: true });

    } catch (error) {
      console.log("Something went wrong logging");
      res.status(500).send({ done: false });
    }
  } else {
    res.send({ done: false });
  }
}

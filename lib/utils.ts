import jwt from "jsonwebtoken";

export function veriyToken(token: string) {
  if (!token) {
    return null;
  }

  const decodedToken = jwt.verify(
    token,
    process.env.JWT_SECRET || ""
  ) as jwt.JwtPayload;
  console.log({ decodedToken });

  const userId = (decodedToken.issuer as string) || ""; //"did:ethr:0x22590D8c8Fb8547eA7CB60db18cD531CDC6633e9";
  return userId;
  // const videoId = "4zH5iYM4wJo";

}
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import {
  findVideoIdByUser,
  insertStats,
  updateStats,
} from "../../lib/db/hasura";
import { veriyToken } from "../../lib/utils";

export default async function stats(req: NextApiRequest, res: NextApiResponse) {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(403);
    } else {
      //const videoId = req.query.videoId as string;
      const inputParams = req.method === "POST" ? req.body : req.query
      const { videoId } = inputParams//req.method === "POST" ? req.body : req.query.videoId;
      const userId = veriyToken(token) || "";

      // if (!userId) {
      //   return {
      //     redirect
      //   }
      // }

      const findVideo = await findVideoIdByUser(token, userId, videoId);

      const doesStatsExist = findVideo?.length > 0;
      if (req.method === "POST") {
        const { favorited, watched = true } = req.body;
        if (doesStatsExist) {
          const response = await updateStats(token, {
            userId,
            videoId, //: "gxc6y2ZVfCU",
            favorited,
            watched,
          });
          res.send({ data: response });
        } else {
          const response = await insertStats(token, {
            userId,
            videoId,
            favorited,
            watched,
          });
          res.send({ data: response });
        }
      } else {
        if (doesStatsExist) {
          res.send(findVideo);
        } else {
          res.status(404);
          res.send({ user: null, msg: "video not found" });
        }
        console.log({ findVideoId: doesStatsExist });
      }
    }
  } catch (error: any) {
    if (error instanceof Error) {
      res.status(500).send({
        done: false,
        error: error.message,
      });
    }
  }
}

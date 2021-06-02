// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
import api from "../../services/api";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method;
  if (req.method !== "POST") {
    res.statusCode = 200;
    res.json({
      status: 500,
      message: "Method not allowed",
    });
  } else {
    const data = req.body;
    try {
      const resHeroku = await api.callJson("/member/login.php", {
        data,
        method,
      });
      res.statusCode = 200;
      res.json(resHeroku);
    } catch (e) {
      res.statusCode = 200;
      console.log("error", e);
      res.json({
        status: 500,
        message: "Interval server Error",
      });
    }
  }
};

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
import api from "../../services/api";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("cookie sv", req.headers.cookie);

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
      const currentDate = new Date();
      const nextYear = new Date(
        currentDate.getFullYear() + 1,
        currentDate.getMonth()
      );
      // const add3Day = new Date(currentDate.getFullYear(),currentDate.getMonth(),currentDate.getDate()+3)

      if (resHeroku.status === 200) {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        res.setHeader("Content-Type", "application/json");
        res.setHeader(
          "Set-Cookie",
          `token=${resHeroku.token}; expires=${nextYear.toUTCString()}; Path=/`
        );
        res.json(resHeroku);
      } else {
        res.statusCode = 302;
        res.setHeader("Location", "/login?error=DangNhapKhongThanhCong");
        res.json(resHeroku);
      }
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

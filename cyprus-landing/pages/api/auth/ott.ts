import axios from "axios";
import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { ott } = req.query;

  if (req.cookies.auth) {
    console.log("Already authenticated");
    res.redirect(`/`);
    return;
  }

  try {
    // Exchange OTT for JWT
    const { data } = await axios.post(
      `http://localhost:4000/api/v2/ott/validate`,
      {
        ott,
      }
    );

    const { token } = data;

    // Set JWT in HttpOnly Cookie
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("auth", token, {
        httpOnly: false,
        secure: process.env.NODE_ENV !== "development",
        path: "/",
        sameSite: "strict",
      })
    );

    res.redirect(`/`);
  } catch (error) {
    console.error("Error exchanging OTT:");
    res.status(500).end("Authentication failed");
  }
}

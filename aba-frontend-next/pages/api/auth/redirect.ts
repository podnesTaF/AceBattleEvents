"use server";

import { authOptions } from "@/app/(auth)/_lib/auth-options";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { redirectUri } = req.query;

  const session = await getServerSession(authOptions);

  if (typeof redirectUri === "string" && session?.user?.ott) {
    const finalUri = new URL(redirectUri);
    finalUri.searchParams.append("ott", session.user.ott as string);
    res.redirect(finalUri.toString());
  } else {
    res.status(400).json({ error: "Missing OTT or redirectUri" });
  }
}

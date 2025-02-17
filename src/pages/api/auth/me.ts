// return the user info

import { NextApiResponse } from "next";

import { NextApiRequest } from "next";

import { getSession } from "next-auth/react";

export default async function me(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  console.log("session", session);
  res.status(200).json(session);
}

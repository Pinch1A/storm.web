
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('AUTH0_CLIENT_ID:', process.env.AUTH0_CLIENT_ID);
  console.log('AUTH0_ISSUER_BASE_URL:', process.env.AUTH0_ISSUER_BASE_URL);
  res.status(200).json({ message: 'Environment variables logged on the server.' });
}

import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import { AUTH_SECRET } from '@/constants';

const handlerType = 'interests';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end('Method Not Allowed');
  }

  try {
    // Extract Keycloak access token from the session
    const token = await getToken({ req, secret: AUTH_SECRET });

    if (!token || !token.accessToken) {
      return res.status(401).json({ error: 'Unauthorized: No valid token' });
    }

    // Make request to backend with the Keycloak access token
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${handlerType}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token.accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data); // Return the data to the client
  } catch (error) {
    console.error(`Error in proxying ${handlerType} data:`, error);
    res.status(500).json({ error: `Failed to fetch ${handlerType} data` });
  }
}

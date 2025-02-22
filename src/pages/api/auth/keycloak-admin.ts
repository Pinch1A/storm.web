import { NextApiRequest, NextApiResponse } from "next";

// // pages/api/auth/keycloak-admin.js

// // import { signOut } from 'next-auth/react';
// import { NextApiRequest, NextApiResponse } from 'next';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'POST') {
//     const credentials = btoa(`${process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID}:${process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_SECRET}`);

//     const logoutUrl = `https://auth.storm.credit/realms/master/protocol/openid-connect/logout&post_logout_redirect_uri=${encodeURIComponent('http://localhost:3000/')}`;
//     // Assuming logout needs a server-side call which is unusual

//     console.log("logoutUrl", logoutUrl);
//     console.log("credentials", credentials);
//     try {
//       const response = await fetch(logoutUrl, {
//         method: 'GET', // Changed to GET if that's appropriate
//         credentials: 'include',
//         headers: {
//           'Authorization': `Basic ${credentials}`, // Basic Auth header
//           'Content-Type': 'application/x-www-form-urlencoded'
//         },
//       });

//       if (response.ok) {
//         return res.status(200).json({ success: true });
//       } else {
//         return res.status(500).json({ error: 'Failed to logout from Keycloak' });
//       }
//     } catch (error) {
//       return res.status(500).json({ error: (error as Error).message });
//     }
//   } else {
//     res.setHeader('Allow', ['POST'])
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }
// This function would be called from the client-side

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("req.body", req.body);
  if (req.method === 'POST') {
    const redirectUri = encodeURIComponent('http://localhost:3000/');
    const logoutUrl = `https://auth.storm.credit/realms/master/protocol/openid-connect/logout?client_id=${process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID}&redirect_uri=${redirectUri}`;

    // Just send the logout URL back to the client to handle the redirect
    return res.status(200).json({ logoutUrl });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

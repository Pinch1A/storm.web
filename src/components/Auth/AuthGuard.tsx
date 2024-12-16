// // components/Auth/AuthGuard.tsx
// import { useAuth } from '../../context/AuthContext';
// import { useRouter } from 'next/router';
// import { useEffect } from 'react';

// const AuthGuard = ({ children }: { children: React.ReactNode }) => {
//   const { user } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (!user) {
//       router.push('/login');
//     }
//   }, [user, router]);

//   if (!user) {
//     return null; // Optionally, show a loading spinner
//   }

//   return <>{children}</>;
// };

// export default AuthGuard;

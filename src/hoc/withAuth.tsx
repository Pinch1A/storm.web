// // src/hoc/withAuth.js
// import { useEffect } from 'react';
// import { useRouter } from 'next/router';
// import { getCookie } from 'cookies-next'; // Install cookies-next for this example

// const withAuth = (WrappedComponent: React.ComponentType<any>) => {
//   return (props: any) => {
//     const router = useRouter();
//     const isAuthenticated = Boolean(getCookie('auth_token'));

//     useEffect(() => {
//       if (!isAuthenticated) {
//         router.replace('/login');
//       }
//     }, [isAuthenticated, router]);

//     if (!isAuthenticated) {
//       return null; // Show nothing while redirecting
//     }

//     return <WrappedComponent { ...props } />;
//   };
// };

// export default withAuth;

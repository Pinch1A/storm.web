// import React, { createContext, useContext, useState } from 'react';
// import { useRouter } from 'next/navigation';

// const AuthContext = createContext<{
//   user: { email: string } | null;
//   login: (email: string, password: string) => void;
//   logout: () => void;
// } | null>(null);

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const [user, setUser] = useState<{ email: string } | null>(null);
//   const router = useRouter();

//   // Determine `isAuthenticated` dynamically
//   const login = (email: string, password: string) => {
//     // Mock login function (replace with your API logic)
//     console.log('Login function called with email:', email, 'and password:', password);
//     const userData = { email };
//     setUser(userData);
//     return userData;
//     // Redirect after ensuring the state is updated
//     // router.push('/province');
//   };

//   const logout = () => {
//     setUser(null);
//     router.push('/login'); // Redirect to login
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

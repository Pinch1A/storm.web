// pages/login.tsx
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { useRouter } from 'next/router';

const Login = () => {
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleLogin = () => {
    console.log('handleLogin', email, password);

    login(email, password);
    router.push('/province');
  };

  return (
    <div className="flex items-center justify-center w-full h-full bg-gray-100">
      <div className="flex flex-col w-full lg:w-1/3 bg-gray-100 p-6">
        <form
          onSubmit={handleLogin}
          className="bg-white p-6 rounded shadow-md w-96"
        >
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded w-full p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border rounded w-full p-2"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

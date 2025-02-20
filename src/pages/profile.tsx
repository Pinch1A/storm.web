// pages/profile.tsx

import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useUser } from '@auth0/nextjs-auth0/client';

const Profile = () => {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4">Error: {error.message}</div>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      {user && (
        <div className="bg-white shadow-md rounded p-6">
          <img
            src={user.picture ?? ""}
            alt={user.name ?? ""}
            className="h-24 w-24 rounded-full mx-auto"
          />
          <h2 className="text-xl font-semibold text-center mt-4">{user.name}</h2>
          <p className="text-center text-gray-600">{user.email}</p>
        </div>
      )}
    </div>
  );
};

export default withPageAuthRequired(Profile);

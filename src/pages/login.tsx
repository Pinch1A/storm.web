'use client';

import { useRouter } from "next/navigation";
import { StorageManager } from "@/utils/storage/dataManager";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");

  const handleLogin = async () => {
    if (username) {
      await StorageManager.user.save({ username });
      router.push("/province");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <Input
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Button onClick={handleLogin} className="mt-4">
        Login
      </Button>
    </div>
  );
}

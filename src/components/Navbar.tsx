// components/NavBar.tsx

import { useState } from 'react';
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/router';
import { Badge } from './ui/badge';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isLoading } = useUser();
  const router = useRouter();

  const toggle = () => setIsOpen(!isOpen);

  const handleLogin = () => {
    router.push('/api/auth/login');
  };

  const handleLogout = () => {
    router.push('/api/auth/logout');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left side */}
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Badge variant="outline" className="text-sm h-6 px-4 transform -rotate-12 ring-2 ring-red-500 ring-offset-2 text-white bg-red-500 shadow-md" color="red">
                Beta
              </Badge>
              <Link href="/" className="text-xl font-bold text-blue-700 ml-2">
                Storm.Credit
              </Link>
            </div>
            <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8 items-center">

              {/* {user && (
                <>
                  <Link
                    href="/province"
                    className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:border-blue-500 hover:text-gray-700"
                  >
                    Province
                  </Link>
                  <Link
                    href="/calculator"
                    className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:border-blue-500 hover:text-gray-700"
                  >
                    Calculator
                  </Link>
                </>
              )} */}
            </div>
          </div>
          {/* Right side */}
          <div className="flex items-center">
            {!isLoading && !user && (
              <button
                onClick={handleLogin}
                className="text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-md"
              >
                Log in
              </button>
            )}
            {!isLoading && user && (
              <div className="ml-4 relative">
                <button
                  onClick={toggle}
                  className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300"
                >
                  <img
                    className="h-8 w-8 rounded-full"
                    src={user.picture}
                    alt={user.name}
                  />
                </button>
                {/* Dropdown menu */}
                {isOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Log out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          {/* Mobile menu button */}
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={toggle}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon when menu is closed */}
              {!isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                // Icon when menu is open
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              href="/"
              className="block pl-3 pr-4 py-2 border-l-4 border-blue-500 bg-blue-50 text-base font-medium text-blue-700"
            >
              Home
            </Link>
            {user && (
              <>
                <Link
                  href="/province"
                  className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800"
                >
                  Province
                </Link>
                <Link
                  href="/calculator"
                  className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800"
                >
                  Calculator
                </Link>
              </>
            )}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            {!isLoading && !user && (
              <div className="px-4">
                <button
                  onClick={handleLogin}
                  className="w-full text-center text-base font-medium text-white bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-md"
                >
                  Log in
                </button>
              </div>
            )}
            {!isLoading && user && (
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <img className="h-10 w-10 rounded-full" src={user.picture} alt={user.name} />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">{user.name}</div>
                  <div className="text-sm font-medium text-gray-500">{user.email}</div>
                </div>
              </div>
            )}
            {user && (
              <div className="mt-3 space-y-1">
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-base font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-base font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                >
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;

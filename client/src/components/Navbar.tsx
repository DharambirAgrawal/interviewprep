"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import { APP_NAME, MAIN_NAVIGATION } from "@/lib/constants/index";
import { SimpleAuthButtons } from "@/components/auth/SimpleAuthButtons";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow dark:bg-gray-900 fixed top-0 w-full z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/img/logo.svg"
                alt="PrepAI Logo"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="text-xl font-semibold text-indigo-600 dark:text-white">
                {APP_NAME}
              </span>
            </Link>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-8">
            {MAIN_NAVIGATION.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium"
              >
                {item.name}
              </Link>
            ))}

            {/* Auth Buttons */}
            <SimpleAuthButtons />
          </div>

          {/* Mobile toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 focus:outline-none"
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 shadow-md">
          <div className="px-4 pt-2 pb-4 space-y-2">
            {MAIN_NAVIGATION.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="block text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium py-2"
              >
                {item.name}
              </Link>
            ))}

            {/* Mobile Auth Buttons */}
            <SimpleAuthButtons mobile onLinkClick={() => setMenuOpen(false)} />
          </div>
        </div>
      )}
    </header>
  );
}

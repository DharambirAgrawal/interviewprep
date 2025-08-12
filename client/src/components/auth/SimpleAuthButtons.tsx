"use client";

import Link from "next/link";
import { ROUTES } from "@/lib/constants";

interface SimpleAuthButtonsProps {
  mobile?: boolean;
  onLinkClick?: () => void;
}

// Simple auth status component that can be used before implementing full auth
export function SimpleAuthButtons({
  mobile = false,
  onLinkClick,
}: SimpleAuthButtonsProps) {
  if (mobile) {
    return (
      <div className="flex flex-col space-y-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <Link
          href={ROUTES.LOGIN}
          onClick={onLinkClick}
          className="text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium py-2 text-center"
        >
          Sign In
        </Link>
        <Link
          href={ROUTES.SIGNUP}
          onClick={onLinkClick}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded-lg font-medium transition-colors duration-200 text-center"
        >
          Get Started
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-3">
      <Link
        href={ROUTES.LOGIN}
        className="text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium px-3 py-2 rounded-lg transition-colors duration-200"
      >
        Sign In
      </Link>
      <Link
        href={ROUTES.SIGNUP}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 shadow-md hover:shadow-lg"
      >
        Get Started
      </Link>
    </div>
  );
}

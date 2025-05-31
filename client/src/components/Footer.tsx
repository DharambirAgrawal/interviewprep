import Link from "next/link";
import Image from "next/image";
import React from "react";
import { Container } from "./Container";
import { APP_NAME, DEVELOPER, ABOUT, navigation } from "@/lib/data";

export default function Footer() {
  return (
    <div className="relative bg-white dark:bg-gray-900">
      <Container>
        <div className="grid max-w-screen-xl grid-cols-1 gap-10 pt-10 mx-auto mt-5 border-t border-gray-200 dark:border-gray-700 lg:grid-cols-4 sm:px-10">
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="flex items-center space-x-2 text-2xl font-semibold text-indigo-600 dark:text-white"
            >
              <Image
                src="/img/logo.svg"
                alt="PrepAI Logo"
                width={32}
                height={32}
                className="w-8"
              />
              <span>{APP_NAME}</span>
            </Link>

            <p className="max-w-md mt-4 text-gray-600 dark:text-gray-400">
              {ABOUT}
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-gray-700 dark:text-gray-200">
              Explore
            </h4>
            <div className="flex flex-col space-y-2">
              {navigation.map((item, index) => (
                <Link
                  key={index}
                  href={item.link}
                  className="text-gray-600 dark:text-gray-300 hover:text-indigo-600"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-gray-700 dark:text-gray-200">
              Connect
            </h4>
            <div className="flex space-x-5 text-gray-500 dark:text-gray-400">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="sr-only">Twitter</span>
                <Twitter />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="sr-only">LinkedIn</span>
                <Linkedin />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="sr-only">GitHub</span>
                <Github />
              </a>
            </div>
          </div>
        </div>

        <div className="my-10 text-sm text-center text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} {APP_NAME}. Crafted with ❤️ by{" "}
          <a href={DEVELOPER.link} target="_blank" rel="noopener noreferrer">
            {DEVELOPER.name}
          </a>
        </div>
      </Container>
    </div>
  );
}
const Twitter = ({ size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M24 4.37a9.6 9.6 0 0 1-2.83.8 5.04 5.04 0 0 0 2.17-2.8c-.95.58-2 1-3.13 1.22A4.86 4.86 0 0 0 16.61 2a4.99 4.99 0 0 0-4.79 6.2A13.87 13.87 0 0 1 1.67 2.92 5.12 5.12 0 0 0 3.2 9.67a4.82 4.82 0 0 1-2.23-.64v.07c0 2.44 1.7 4.48 3.95 4.95a4.84 4.84 0 0 1-2.22.08c.63 2.01 2.45 3.47 4.6 3.51A9.72 9.72 0 0 1 0 19.74 13.68 13.68 0 0 0 7.55 22c9.06 0 14-7.7 14-14.37v-.65c.96-.71 1.79-1.6 2.45-2.61z" />
  </svg>
);

const Facebook = ({ size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.32l-.53 3.5h-2.8V24C19.62 23.1 24 18.1 24 12.07" />
  </svg>
);
const Instagram = ({ size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M16.98 0a6.9 6.9 0 0 1 5.08 1.98A6.94 6.94 0 0 1 24 7.02v9.96c0 2.08-.68 3.87-1.98 5.13A7.14 7.14 0 0 1 16.94 24H7.06a7.06 7.06 0 0 1-5.03-1.89A6.96 6.96 0 0 1 0 16.94V7.02C0 2.8 2.8 0 7.02 0h9.96zm.05 2.23H7.06c-1.45 0-2.7.43-3.53 1.25a4.82 4.82 0 0 0-1.3 3.54v9.92c0 1.5.43 2.7 1.3 3.58a5 5 0 0 0 3.53 1.25h9.88a5 5 0 0 0 3.53-1.25 4.73 4.73 0 0 0 1.4-3.54V7.02a5 5 0 0 0-1.3-3.49 4.82 4.82 0 0 0-3.54-1.3zM12 5.76c3.39 0 6.2 2.8 6.2 6.2a6.2 6.2 0 0 1-12.4 0 6.2 6.2 0 0 1 6.2-6.2zm0 2.22a3.99 3.99 0 0 0-3.97 3.97A3.99 3.99 0 0 0 12 15.92a3.99 3.99 0 0 0 3.97-3.97A3.99 3.99 0 0 0 12 7.98zm6.44-3.77a1.4 1.4 0 1 1 0 2.8 1.4 1.4 0 0 1 0-2.8z" />
  </svg>
);

const Linkedin = ({ size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M22.23 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0zM7.27 20.1H3.65V9.24h3.62V20.1zM5.47 7.76h-.03c-1.22 0-2-.83-2-1.87 0-1.06.8-1.87 2.05-1.87 1.24 0 2 .8 2.02 1.87 0 1.04-.78 1.87-2.05 1.87zM20.34 20.1h-3.63v-5.8c0-1.45-.52-2.45-1.83-2.45-1 0-1.6.67-1.87 1.32-.1.23-.11.55-.11.88v6.05H9.28s.05-9.82 0-10.84h3.63v1.54a3.6 3.6 0 0 1 3.26-1.8c2.39 0 4.18 1.56 4.18 4.89v6.21z" />
  </svg>
);
const Github = ({ size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M12 .5C5.648.5.5 5.648.5 12c0 5.086 3.292 9.396 7.86 10.919.574.104.785-.25.785-.558 0-.275-.01-1.01-.015-1.982-3.2.695-3.878-1.542-3.878-1.542-.522-1.33-1.277-1.684-1.277-1.684-1.043-.713.08-.699.08-.699 1.152.08 1.757 1.183 1.757 1.183 1.025 1.754 2.69 1.247 3.343.953.104-.742.4-1.247.726-1.534-2.555-.293-5.244-1.278-5.244-5.683 0-1.256.45-2.284 1.184-3.09-.12-.292-.513-1.47.112-3.064 0 0 .968-.31 3.17 1.18.92-.256 1.905-.384 2.886-.388.98.004 1.965.132 2.886.388 2.2-1.49 3.166-1.18 3.166-1.18.627 1.594.233 2.772.113 3.064.737.806 1.184 1.834 1.184 3.09 0 4.415-2.693 5.386-5.255 5.673.41.353.772 1.047.772 2.111 0 1.524-.015 2.753-.015 3.126 0 .31.208.666.79.555C20.212 21.394 23.5 17.086 23.5 12c0-6.352-5.148-11.5-11.5-11.5z" />
  </svg>
);

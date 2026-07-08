"use client";

import Link from "next/link";
import { useUser, SignInButton, UserButton } from "@clerk/nextjs";

export default function Navbar() {
  const { isSignedIn } = useUser();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-neutral-800/50 bg-neutral-950/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-8">

        <Link href="/" className="text-xl font-bold">
          UniSync
        </Link>

        <div className="flex items-center gap-8 text-sm text-neutral-400">

          <a href="#features" className="hover:text-white transition">
            Features
          </a>

          <a href="#how" className="hover:text-white transition">
            How It Works
          </a>

          <a
            href="https://github.com/"
            target="_blank"
            className="rounded-lg border border-neutral-700 px-4 py-2 hover:border-blue-500 transition"
          >
            GitHub
          </a>

          {!isSignedIn ? (
            <SignInButton mode="modal">
              <button className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-500 transition">
                Sign In
              </button>
            </SignInButton>
          ) : (
            <UserButton afterSignOutUrl="/" />
          )}

        </div>
      </div>
    </nav>
  );
}
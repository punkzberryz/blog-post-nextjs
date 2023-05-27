"use client";
import Link from "next/link";
import userAuth from "../hooks/useAuth";
import { useContext } from "react";
import { AuthenticationContext } from "../context/AuthContext";

export default function Navbar() {
  const { data, error, loading } = useContext(AuthenticationContext);
  const { signOut } = userAuth();
  return (
    <>
      <h1 className="text-4xl capitalize">
        <Link href="/">blog-post-nextJS</Link>
      </h1>
      <div>
        <Link
          className="m-2 p-2 border rounded bg-purple-600 text-center text-white"
          href="/post/new"
        >
          new post
        </Link>
        {loading ? null : data ? (
          <>
            <button
              className="m-2 p-2 border rounded bg-purple-600 text-center text-white"
              onClick={signOut}
            >
              Sign out
            </button>
          </>
        ) : (
          <>
            <Link
              className="m-2 p-2 border rounded bg-purple-600 text-center text-white"
              href="/auth/signin"
            >
              Sign in
            </Link>
            <Link
              className="m-2 p-2 border rounded bg-purple-600 text-center text-white"
              href="/auth/signup"
            >
              Sign up
            </Link>
          </>
        )}
      </div>
    </>
  );
}

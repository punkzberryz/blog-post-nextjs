"use client";
import Link from "next/link";
import useAuth from "../hooks/useAuth";
import { useContext } from "react";
import { AuthenticationContext } from "../context/AuthContext";
import Button from "./Button";

export default function Navbar() {
  const { data, error, loading } = useContext(AuthenticationContext);
  const { signOut } = useAuth();
  return (
    <div className="pb-5">
      <h1 className="text-4xl capitalize m-2 p-2">
        <Link href="/">blog-post-nextJS</Link>
      </h1>
      <div>
        {loading ? null : data ? (
          <>
            <Link
              className="m-2 p-2 border rounded bg-purple-600 text-center text-white"
              href="/post/new"
            >
              new post
            </Link>
            <Button onClick={signOut}>Sign out</Button>
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
    </div>
  );
}

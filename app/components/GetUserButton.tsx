"use client";
import axios from "axios";
import { getCookie } from "cookies-next";
import userAuth from "../hooks/useAuth";
import { useContext } from "react";
import { AuthenticationContext } from "../context/AuthContext";

export default function GetUserButton() {
  const { signIn, signOut } = userAuth();
  const { data, loading, error } = useContext(AuthenticationContext);

  const handleSignIn = () => {
    const [email, password] = ["kanggive@gmail.com", "kang1234"];
    signIn({ email, password });
  };
  return (
    <div className="bg-red-300">
      <button className="m-10 bg-violet-500 p-5" onClick={handleSignIn}>
        Sign in
      </button>
      <button
        className="m-10 bg-violet-500 p-5"
        onClick={() => {
          console.log(data?.user);
        }}
      >
        Get User
      </button>
      <button className="m-10 bg-violet-500 p-5" onClick={signOut}>
        Sign out
      </button>

      {data ? <div>{`hello ${data.user.username}`}</div> : null}
      {error ? <div>{`Error!! ${error}`}</div> : null}
    </div>
  );
}

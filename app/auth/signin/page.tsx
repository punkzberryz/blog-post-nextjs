"use client";

import { AuthenticationContext } from "@/app/context/AuthContext";
import userAuth from "@/app/hooks/useAuth";
import { useContext, useEffect, useState } from "react";
import CircularProgress from "@mui/joy/CircularProgress";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const { signIn } = userAuth();
  const { data, error, loading } = useContext(AuthenticationContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(true);

  const router = useRouter();

  const handleOnClickSubmit = async () => {
    await signIn({ email, password });
    if (data) {
      setTimeout(() => router.push("/"), 1000);
    }
  };
  useEffect(() => {
    if (data) {
      setTimeout(() => router.push("/"), 1000);
      // router.push("/");
    }
    if (password && email) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [password, email, data]);

  return (
    <>
      <h1>Sign in page</h1>
      <div>
        <input
          className="m-2 bg-sky-200 p-2"
          type="text"
          name="email"
          id="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="m-2 bg-sky-200 p-2 "
          type="password"
          name="password"
          id="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="m-2 p-2 border px-4 rounded w-30 h-14"
          disabled={disabled}
          onClick={handleOnClickSubmit}
        >
          {!loading ? (
            "Sign in"
          ) : (
            <CircularProgress
              color="info"
              determinate={false}
              variant="solid"
            />
          )}
        </button>
        {data ? (
          <>
            <div>{`Hello ${data.user.username}`}</div>
            <div>Sign in success!, redirecting you to homepage...</div>
          </>
        ) : null}
        {error ? <div>{error}</div> : null}
      </div>
    </>
  );
}

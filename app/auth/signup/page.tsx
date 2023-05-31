"use client";

import useAuth from "@/app/hooks/useAuth";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthenticationContext } from "@/app/context/AuthContext";
import CircularProgress from "@mui/joy/CircularProgress";

export default function SignUpPage() {
  const { signUp } = useAuth();
  const { data, error, loading } = useContext(AuthenticationContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [disabled, setDisabled] = useState(true);

  const router = useRouter();
  const handleOnClickSubmit = async () => {
    await signUp({ email, password, username });
    if (data) {
      setTimeout(() => router.push("/"), 1000);
    }
  };

  useEffect(() => {
    if (data) {
      setTimeout(() => router.push("/"), 1000);
    }
    if (username && password && email) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [username, password, email, data]);

  return (
    <>
      <h1>Sign up page</h1>
      <div>
        <input
          className="m-2 bg-sky-200 p-2"
          type="text"
          name="username"
          id="username"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
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
          className="m-2 p-2 border px-4 rounded"
          disabled={disabled}
          onClick={handleOnClickSubmit}
        >
          {!loading ? (
            "Sign up"
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

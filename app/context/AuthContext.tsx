"use client";

import axios from "axios";
import { useState, createContext, useEffect } from "react";
import { users, User } from "@/db";
import { getCookie } from "cookies-next";

interface UserProps {
  user: User;
}

interface AuthState {
  loading: boolean;
  error: String | null;
  data: UserProps | null;
}

interface AuthContextProps extends AuthState {
  setAuthState: React.Dispatch<React.SetStateAction<AuthState>>;
}

export const AuthenticationContext = createContext<AuthContextProps>({
  loading: false,
  data: null,
  error: null,
  setAuthState: () => {},
});

export default function AuthContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authState, setAuthState] = useState<AuthState>({
    loading: true,
    data: null,
    error: null,
  });

  const fetchUser = async () => {
    try {
      setAuthState({ data: null, error: null, loading: true });
      const jwt = getCookie("jwt");
      if (!jwt) {
        return setAuthState({
          data: null,
          loading: false,
          error: null,
        });
      }

      const response = await axios.get(
        `${process.env.SERVER_HOST}/api/auth/current-user`,
        {
          headers: {
            Authorization: jwt,
          },
        }
      );

      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
      setAuthState({ data: response.data, error: null, loading: false });
    } catch (error: any) {
      setAuthState({
        data: null,
        error: error.response.data,
        loading: false,
      });
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthenticationContext.Provider value={{ ...authState, setAuthState }}>
      {children}
    </AuthenticationContext.Provider>
  );
}

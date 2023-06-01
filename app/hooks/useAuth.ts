import axios from "axios";
import { removeCookies } from "cookies-next";
import { useContext } from "react";
import { AuthenticationContext } from "../context/AuthContext";

const useAuth = () => {
  const { data, error, loading, setAuthState } = useContext(
    AuthenticationContext
  );

  const signIn = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    setAuthState({ data: null, error: null, loading: true });
    try {
      const response = await axios.post(
        `${process.env.SERVER_HOST}/api/auth/signin`,
        { email, password }
      );
      setAuthState({ data: response.data, error: null, loading: false });
    } catch (error: any) {
      setAuthState({ data: null, error: error.response.data, loading: false });
    }
  };

  const signUp = async ({
    username,
    email,
    password,
  }: {
    username: string;
    email: string;
    password: string;
  }) => {
    setAuthState({ data: null, error: null, loading: true });
    try {
      const response = await axios.post(
        `${process.env.SERVER_HOST}/api/auth/signup`,
        {
          username,
          email,
          password,
        }
      );

      setAuthState({ data: response.data, error: null, loading: false });
    } catch (error: any) {
      setAuthState({ data: null, error: error.response.data, loading: false });
    }
  };

  const signOut = () => {
    removeCookies("jwt");
    setAuthState({
      data: null,
      error: null,
      loading: false,
    });
  };

  return { signIn, signUp, signOut };
};
export default useAuth;

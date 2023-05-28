import * as jose from "jose";
export const createToken = async ({
  email,
  id,
}: {
  email: string;
  id: number;
}) => {
  const alg = "HS256";
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const token = await new jose.SignJWT({ email, id })
    .setProtectedHeader({ alg })
    .setExpirationTime("24h")
    .sign(secret);
  return token;
};

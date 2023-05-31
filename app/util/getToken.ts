export const getToken = (tokenInput: string) => {
  const bearerToken = tokenInput.split(" ");
  if (!bearerToken[1]) return tokenInput;
  return bearerToken[1];
};

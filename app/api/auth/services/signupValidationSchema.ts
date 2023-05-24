import validator from "validator";
export const signupValidationSchema = ({
  username,
  email,
  password,
}: {
  username: string;
  email: string;
  password: string;
}) => {
  const errors: string[] = [];
  const validationSchema: { valid: boolean; errorMessage: string }[] = [
    {
      valid: validator.isLength(username, {
        min: 1,
        max: 20,
      }),
      errorMessage: "Username length is not within 1-20 characters",
    },
    {
      valid: validator.isLength(password, {
        min: 1,
        max: 20,
      }),
      errorMessage: "Password is not strong",
    },
    { valid: validator.isEmail(email), errorMessage: "Email is invalid" },
  ];
  validationSchema.forEach((check) => {
    if (!check.valid) {
      errors.push(check.errorMessage);
    }
  });
  return errors;
};

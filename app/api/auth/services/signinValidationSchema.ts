import validator from "validator";
export const signinValidationSchema = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const errorMessage = "Email or password is invalid";
  const errors: string[] = [];
  const validationSchema: { valid: boolean; errorMessage: string }[] = [
    {
      valid: validator.isLength(password, {
        min: 1,
        max: 20,
      }),
      errorMessage,
    },
    { valid: validator.isEmail(email), errorMessage },
  ];
  validationSchema.forEach((check) => {
    if (!check.valid) {
      errors.push(check.errorMessage);
    }
  });
  return errors;
};

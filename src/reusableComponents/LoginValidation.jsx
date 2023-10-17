
const LoginValidation = (formValues) => {
  const errors = {};
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  if (!formValues.email) {
    errors.email = "Email is required";
  } else if (!regex.test(formValues.email)) {
    errors.email = "This is not a valid email format";
  }

  if (!formValues.password) {
    errors.password = "Password is required";
  } else if (formValues.password.length < 6) {
    errors.password = "Password must be atleast 6 characters";
  } else if (formValues.password.length > 14) {
    errors.password = "Password should not exceed 10 characters";
  }
  return errors;
};

export default LoginValidation;

import toast from "react-hot-toast";

/** validate login page username */
export async function usernameValidate(values) {
  const errors = usernameVerify({}, values);
  return errors;
}

/** validate password */
export async function passwordValidate(values) {
  const errors = passwordVerify({}, values);
  return errors;
}

function usernameVerify(error = {}, values) {
  // check is username is falsy value (0,false,"empty string",`empty string `,null,undefined,Nan)
  if (!values.username) {
    error.username = "Username Required....!";
    toast.error(error.username);
  } else if (values.username.includes(" ")) {
    error.username = "Invalid Username....!";
    toast.error(error.username);
  }
  return error;
}

function passwordVerify(error = {}, values) {
  const specialChars = "!@#$%^&*()_+-=[]{};':\"\\|,.<>/?";
  const passwordRegex = new RegExp(
    `^(?=.*[${specialChars.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}])`
  );

  if (!values.password) {
    error.password = toast.error("Password Required!");
  } else if (values.password.includes(" ")) {
    error.password = toast.error("Wrong Password!");
  } else if (values.password.length < 4) {
    error.password = toast.error("Password must be more than 4 character");
  } else if (!passwordRegex.test(values.password)) {
    error.password = toast.error("Password must have special characters");
  }
  return error;
}

//** validate profile page */
export async function profileValidation(values) {
  const errors = emailVerify({}, values);
  return errors;
}

/* validate reset password */

export async function resetPasswordValidation(values) {
  const errors = passwordVerify({}, values);

  if (values.password !== values.confirm_pwd) {
    errors.exist = toast.error("Password not match...!");
  }
  return errors;
}

//** validate the register form */
export async function registerValidation(values) {
  const errors = usernameVerify({}, values);
  passwordVerify(errors, values);
  emailVerify(errors, values);
  return errors;
}

function emailVerify(error = {}, values) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!values.email) {
    error.email = toast.error("Email Required...!");
  } else if (values.email.includes(" ")) {
    error.email = toast.error("Invalid email address!");
  } else if (!emailRegex.test(values.email)) {
    error.email = toast.error("Invalid email address!");
  }

  return error;
}

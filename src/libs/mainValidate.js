export const validateFullName = (fullname) => {
  const rg = /^[a-zA-Z ]{2,}$/g;
  if (!rg.test(fullname)) return false;
  return true;
};

export const validateUsername = (username) => {
  const rg = /^[a-zA-Z0-9]+$/;
  if (!rg.test(username)) return false;
  return true;
};

export const validatePassword = (password) => {
  if (password.length <= 6) return false;
  return true;
};

export const validateConfirmPassword = (password1, password2) => {
  if (password1 !== password2) return false;
  return true;
};

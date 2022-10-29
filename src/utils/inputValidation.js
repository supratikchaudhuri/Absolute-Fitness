export const validatemail = (email) => {
  const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return email.match(mailformat)
}

export const validatePassword = (password) => {
  return password.length > 0
}
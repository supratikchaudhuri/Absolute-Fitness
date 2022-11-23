export const validatemail = (email) => {
  const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return email.match(mailformat)
}

export const validatePassword = (password) => {
  const re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  return re.test(password);
}

export const validateText = (text) => {
  return text.length > 0 && text.match(/^[A-z ]+$/)
}

export const validPhone = (phone) => {
  return  phone.match(/\d/g).length===10;
}
export const checkIfPhoneIsValid = value => {
  const phoneRegex = /^01[0-9]{9}$/i;
  if (!phoneRegex.test(value)) {
    return false;
  }
  return true;
};

export const checkIfEmailIsValid = value => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]+$/i;
  if (!emailRegex.test(value)) {
    return false;
  }
  return true;
};

export const checkIfPasswordIsValid = value => {
  const passwordRegex = /^.{6,}$/i;
  if (!passwordRegex.test(value)) {
    return false;
  }
  return true;
};

export const checkIfUrlIsValid = value => {
  const urlRegex =
    /^(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/i;
  if (!urlRegex.test(value)) {
    return false;
  }
  return true;
};

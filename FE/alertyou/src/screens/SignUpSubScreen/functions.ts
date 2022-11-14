import { Alert } from "react-native";

export const passwordValidation = (password: string): boolean => {
  //영문 대소문자, 숫자, 특수문자, 길이(4~20)
  if (
    /^[A-Za-z0-9`~!@#\$%\^&\*\(\)\{\}\[\]\-_=\+\\|;:'"<>,\./\?]{3,20}$/.test(
      password,
    )
  ) {
    return true;
  } else {
    return false;
  }
};

export const phoneValidation = (phone: string): boolean => {
  //하이픈없는 전화번호
  if (/^[0-9]{2,3}[0-9]{3,4}[0-9]{4}/.test(phone)) {
    return true;
  } else {
    return false;
  }
};

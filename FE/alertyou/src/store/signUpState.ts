import {atom, selector} from 'recoil';

interface signUpType {
  phone: string;
  password: string;
  name: string;
  school: string;
  grade: number;
  class: number;
}

interface schoolInfoType {
  school: string;
  grade: string;
  class: string;
}

interface accountType {
  phone: string;
  password: string;
  name: string;
}

export const schoolState = atom<schoolInfoType>({
  key: 'schoolState',
  default: {
    school: '',
    grade: '',
    class: '',
  },
});

export const accountState = atom<accountType>({
  key: 'accountState',
  default: {
    phone: '',
    password: '',
    name: '',
  },
});

export const signUpState = selector<signUpType>({
  key: 'signUpState',
  get: ({ get }) => {
    const school = get(schoolState)
    const account = get(accountState)
    return {
      school: school.school,
      grade: school.grade ? parseInt(school.grade): 0,
      class: school.class ? parseInt(school.class): 0,
      phone: account.phone,
      password: account.password,
      name: account.name
    }
  }
});

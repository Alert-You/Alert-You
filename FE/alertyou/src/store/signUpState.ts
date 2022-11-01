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
interface phoneType {
  phone: string
}

interface accountType {
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
    password: '',
    name: '',
  },
});

export const phoneState = atom<phoneType>({
  key: 'phoneState',
  default: {
    phone: ''
  }
})

export const signUpState = selector<signUpType>({
  key: 'signUpState',
  get: ({ get }) => {
    const school = get(schoolState)
    const account = get(accountState)
    const phone = get(phoneState)
    return {
      school: school.school,
      grade: school.grade ? parseInt(school.grade): 0,
      class: school.class ? parseInt(school.class): 0,
      phone: phone.phone,
      password: account.password,
      name: account.name
    }
  }
});

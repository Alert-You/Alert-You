import {atom, selector} from 'recoil';

export interface signUpType {
  phone: string;
  password: string;
  username: string;
  schoolId: number|null;
}

export interface schoolInfoType {
  name: string;
  address: string;
}
interface phoneType {
  phone: string
}

interface accountType {
  password: string;
  username: string;
}


export const schoolState = atom<schoolInfoType>({
  key: 'schoolState',
  default: {
    name: '',
    address: ''
  },
});

export const classListState = atom<string[][]>({
  key: 'classListState',
  default: []
})

export const accountState = atom<accountType>({
  key: 'accountState',
  default: {
    password: '',
    username: '',
  },
});

export const phoneState = atom<phoneType>({
  key: 'phoneState',
  default: {
    phone: ''
  }
})

export const schoolIdState = atom<number|null>({
  key: 'schoolIdState',
  default: null
})

export const signUpState = selector<signUpType>({
  key: 'signUpState',
  get: ({ get }) => {
    const account = get(accountState)
    const phone = get(phoneState)
    const schoolId = get(schoolIdState)
    return {
      phone: phone.phone.trim(),
      password: account.password.trim(),
      username: account.username.trim(),
      schoolId: schoolId
    }
  }
});

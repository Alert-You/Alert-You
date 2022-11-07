import {atom, selector} from 'recoil';

interface signUpType {
  phone: string;
  password: string;
  name: string;
}

interface schoolInfoType {
  name: string;
  address: string;
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
    const account = get(accountState)
    const phone = get(phoneState)
    return {
      phone: phone.phone.trim(),
      password: account.password.trim(),
      name: account.name.trim()
    }
  }
});

import { atom, DefaultValue, selector } from 'recoil';

interface profileFormType {
  username: string;
  password: string;
  schoolId: number;
  phone: string;
}
export const editUsernameState = atom<string>({
  key: 'editUsernameState',
  default: ''
});

export const editPhoneState = atom<string>({
  key: 'editPhoneState',
  default: ''
});

export const editPasswordState = atom<string>({
  key: 'editPasswordState',
  default: ''
});

export const editSchoolIdState = atom<string>({
  key: 'editSchoolIdState',
  default: ''
});

export const editSchoolNameState = atom<string>({
  key: 'editSchoolNameState',
  default: ''
});

export const profileFormState = selector<profileFormType>({
  key: 'profileFormState',
  get: ({get}) => {
    const username = get(editUsernameState);
    const phone = get(editPhoneState);
    const schoolId = get(editSchoolIdState);
    const password = get(editPasswordState);
    return {
      phone: phone.trim(),
      password: password.trim(),
      username: username.trim(),
      schoolId: parseInt(schoolId),
    };
  },
  set: ({set}, value) => {
    if (!(value instanceof DefaultValue)) {
      //resetter가 아닐 때
      set(editUsernameState, value.username)
      set(editPhoneState, value.phone)
      set(editSchoolIdState, String(value.schoolId))
      set(editPasswordState, value.password)
    }
  }
});
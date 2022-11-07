import {atom} from 'recoil';

export const splashState = atom<boolean>({
  key: 'splashState',
  default: false,
});

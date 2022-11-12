import {atom} from 'recoil';

export const isEmergencyState = atom<boolean>({
  key: 'isEmergencyState',
  default: true,
});

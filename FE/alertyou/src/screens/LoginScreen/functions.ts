import type {loginActionType, loginValueType} from './types';
export const loginInitialState: loginValueType = {
  phoneNumber: '',
  password: '',
};
export const loginReducer = (
  state: loginValueType,
  action: loginActionType,
): loginValueType => {
  switch (action.type) {
    case 'phoneNumber': {
      return {
        ...state,
        phoneNumber: action.payload,
      };
    }
    case 'password': {
      return {
        ...state,
        password: action.payload,
      };
    }
    default:
      return state;
  }
};

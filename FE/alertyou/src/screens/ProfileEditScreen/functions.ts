export const loginInitialState: any = {
  phone: '',
  password: '',
};

export const loginReducer = (
  state: any,
  action: any,
): any => {
  switch (action.type) {
    case 'phone': {
      return {
        ...state,
        phone: action.payload.trim(),
      };
    }
    case 'password': {
      return {
        ...state,
        password: action.payload.trim(),
      };
    }
    case 'phone': {
      return {
        ...state,
        phone: action.payload.trim()
      }
    }
    case 'schoolId': {
      return {
        ...state,
        schoolId: action.payload
      }
    }
    default:
      return state;
  }
};

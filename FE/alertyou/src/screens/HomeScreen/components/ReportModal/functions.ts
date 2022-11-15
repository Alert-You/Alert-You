import type { ReportModalActionType, ReportModalInputType } from './types';

export const reportModalInitialState: ReportModalInputType = {
  place: '',
  content: '',
};

export const reportModalReducer = (
  state: ReportModalInputType,
  action: ReportModalActionType,
): ReportModalInputType => {
  switch (action.type) {
    case 'place': {
      return {
        ...state,
        place: action.payload,
      };
    }
    case 'content': {
      return {
        ...state,
        content: action.payload,
      };
    }
    default:
      return state;
  }
};

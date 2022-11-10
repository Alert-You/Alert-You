import {LocationType} from '@/types';

export interface ReportModalInputType {
  place: string;
  content: string;
}

export interface ReportModalDataType extends LocationType {
  place: string;
  content: string;
}

export interface ReportModalActionType {
  type: string;
  payload: string;
}

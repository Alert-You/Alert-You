import AxiosInstance from "@/apis/Axios"
import { PROFILE } from "@/apis/urls"
import { proofType, repType, studentsType, studentType } from "@/types"
import { profileResponseType } from "./types"

type data = {
  grade: any,
  classRoom: string
}

export const requestUserProfile = async (): Promise<profileResponseType> => {
  const { data } = await AxiosInstance.get(PROFILE)
  return data
}

export const getClasses = async (): Promise<string[][] | undefined> => {
  const result = await AxiosInstance.get(`school`)
    .then((response) => response);
  return result.data.classes;
};

export const getStudents = async (grade: any, schoolRoom: string): Promise<studentsType[]> => {
  const result = await AxiosInstance.get(`teacher?grade=${grade}&classRoom=${schoolRoom}`)
    .then((response) => response)
  return result.data.students;
};

export const getStudent = async (studentId: number | undefined): Promise<studentType> => {
  const result = await AxiosInstance.get(`teacher/student?studentId=${studentId}`)
    .then((response) => response);
  return result.data.student;
};

export const getReportList = async (studentId: number | undefined): Promise<repType[]> => {
  const result = await AxiosInstance.get(`report/list?userId=${studentId}`)
    .then((response) => response);
  return result.data.reports;
}

export const getProofList = async (studentId: number | undefined): Promise<proofType[]> => {
  const result = await AxiosInstance.get(`proof?userId=${studentId}`)
    .then((response) => response);
  return result.data.proofs;
}

export const downloadProof = async (proofId: number | undefined): Promise<string> => {
  const result = await AxiosInstance.get(`proof/download?proofId=${proofId}`)
    .then((response) => response);
  return result.data
}

export const handleBodyguard = async (guardId: number | undefined) => {
  const result = await AxiosInstance.post(`bodyguard?guardId=${guardId}`)
    .then((response) => response);
  return true
}

export const excludeStudent = async (studentId: number | undefined) => {
  const result = await AxiosInstance.delete(`/teacher/student?studentId=${studentId}`)
    .then((response) => response);
  return true

}


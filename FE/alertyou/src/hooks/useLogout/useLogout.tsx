import React from 'react'
import { useMutation } from '@tanstack/react-query';
import { logoutResponseType } from './types';
import { logoutRequest } from './apis';

const useLogout = () => {
  return useMutation<logoutResponseType, unknown, unknown>(logoutRequest)
}

export default useLogout
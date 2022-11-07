import React from 'react';
import {useMutation} from '@tanstack/react-query';
import {logoutResponseType} from './types';
import {logoutRequest} from './apis';
import {removeToken} from '@/utils/auth';
import { useSetRecoilState } from 'recoil';
import { isLoggedInState, tokenState } from '@/store';

const useLogout = () => {
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);
  const tokenRemover = useSetRecoilState(tokenState);
  return useMutation<logoutResponseType, unknown, string>(token => logoutRequest(token),
    {
      onSuccess: () => {
        tokenRemover('');
        removeToken();
        setIsLoggedIn(false);
      },
      onError: (e) => {
        console.log(e)
      }
    },
  );
};

export default useLogout;

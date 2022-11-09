import React from 'react';
import {useMutation} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import { useSetRecoilState } from 'recoil';

import { isLoggedInState, tokenState } from '@/store';
import { removeToken, saveToken } from '@/utils/auth';
import { splashState } from '@/store/splashState';

import {requestRefreshToken} from './apis';
import { refreshType } from './types';

//자동 로그인.
//토큰이 만료되면 로그인으로 이동
//토큰이 유효하면 accessToken 발급 및 refreshToken 갱신
const useRefreshToken = () => {
  const setToken = useSetRecoilState(tokenState);
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);
  const setSplashState = useSetRecoilState(splashState);

  return useMutation<refreshType, AxiosError, string>(
    refreshToken => requestRefreshToken(refreshToken),
    {
      onSuccess: (res) => {
        console.log("성공했어")
        setToken(res.accessToken);
        setIsLoggedIn(true);
        saveToken(res.refreshToken);
        setTimeout(() => {
          setSplashState(true);
        }, 2000);
      },
      onError: () => {
        console.log('실패했어');
        setToken('')
        setIsLoggedIn(false);
        removeToken();
        setTimeout(() => {
          setSplashState(true);
        }, 2000);
      }
    },
  );
};

export default useRefreshToken;
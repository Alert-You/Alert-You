import React from 'react';
import {useMutation} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import { useSetRecoilState } from 'recoil';

import { isLoggedInState, tokenState } from '@/store';
import { removeAccessToken, removeToken, saveAccessToken, saveToken } from '@/utils/auth';
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
        setToken(res.accessToken);
        saveAccessToken(res.accessToken);
        setIsLoggedIn(true);
        saveToken(res.refreshToken);
        setTimeout(() => {
          setSplashState(true);
        }, 3000);
      },
      onError: () => {
        setToken('');
        removeAccessToken();
        setIsLoggedIn(false);
        removeToken();
        setTimeout(() => {
          setSplashState(true);
        }, 3000);
      }
    },
  );
};

export default useRefreshToken;

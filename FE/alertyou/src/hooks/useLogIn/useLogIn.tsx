import React from 'react';
import {useSetRecoilState} from 'recoil';
import {isLoggedInState, tokenState} from '@/store';
import {useMutation} from '@tanstack/react-query';
import {saveAccessToken, saveToken} from '@/utils/auth';
import {onFailHandler} from '@/screens/LoginScreen/functions';
import {AxiosError} from 'axios';

import {loginValueType, TokenType} from './types';
import {loginRequest} from './apis';

const useLogIn = () => {
  const setToken = useSetRecoilState(tokenState);
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);
  //타입 => <요청을 보내고 받은 데이터, 에러, 요청보낼때 필요한 데이터>
  return useMutation<TokenType, AxiosError, loginValueType>(
    credentials => loginRequest(credentials),
    {
      onSuccess: successData => {
        //로그인 성공 => access토큰은 atom, refresh토큰은 EncryptedStorage
        setToken(successData.accessToken);
        saveAccessToken(successData.accessToken);
        setIsLoggedIn(true);
        saveToken(successData.refreshToken);
      },
      onError: () => {
        onFailHandler();
      }
    }
  );
};

export default useLogIn;

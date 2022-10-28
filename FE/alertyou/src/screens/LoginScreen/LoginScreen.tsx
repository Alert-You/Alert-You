import {View, Button, Text} from 'react-native';
import React from 'react';
import {tokenState} from '@/store';
import {useSetRecoilState} from 'recoil';

type Props = {
  navigation: any;
};

const LoginScreen = ({navigation}: Props) => {
  const setTmpToken = useSetRecoilState(tokenState);
  const createTmpToken = () => {
    setTmpToken('1');
  }
  return (
    <View>
      <Text>LoginHello</Text>
      <Button
        title="회원가입"
        onPress={() => navigation.navigate('SignUpScreen')}
      />
      <Button 
        title="토큰부여"
        onPress={createTmpToken}/>
    </View>
  );
};

export default LoginScreen;

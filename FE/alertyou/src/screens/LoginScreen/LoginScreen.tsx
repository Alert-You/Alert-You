import {View, Button, Text, TextInput} from 'react-native';
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
      <TextInput/>
      <Button 
        title="토큰부여"
        onPress={createTmpToken}/>
    </View>
  );
};

export default LoginScreen;

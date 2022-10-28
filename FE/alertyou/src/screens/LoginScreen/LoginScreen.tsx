import {View, Button, Text} from 'react-native';
import React from 'react';
import {tokenState} from '@/store';
import {useRecoilState} from 'recoil';

type Props = {
  navigation: any;
};

// const createTmpToken = () => {
//   setTmpToken('1');
// }

const LoginScreen = ({navigation}: Props) => {
  const [tmpToken, setTmpToken] = useRecoilState(tokenState);
  return (
    <View>
      <Text>LoginHello</Text>
      <Button
        title="회원가입"
        onPress={() => navigation.navigate('SignUpScreen')}
      />
      <Button 
        title="토큰부여"
        onPress={() => setTmpToken("hhihihi")}/>
    </View>
  );
};

export default LoginScreen;

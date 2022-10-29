import {View, Button} from 'react-native';
import {FormControl, Icon, Input, Stack} from 'native-base';
import React from 'react';
import {tokenState} from '@/store';
import {useSetRecoilState} from 'recoil';

import {styles} from './style';
import {COLOR} from '@/theme/colorVariants';

type Props = {
  navigation: any;
};

const LoginScreen = ({navigation}: Props) => {
  const setTmpToken = useSetRecoilState(tokenState);
  const createTmpToken = () => {
    setTmpToken('1');
  };
  return (
    <View style={styles.container}>
      <Stack space={3}>
        <FormControl isRequired>
          <Input
            variant="underlined"
            placeholder="휴대폰 번호"
            keyboardType="numeric"
            size="sm"
            color={COLOR.mainFont}
            focusOutlineColor={COLOR.red}
          />
          <Input
            variant="underlined"
            placeholder="비밀번호"
            size="sm"
            color={COLOR.mainFont}
            focusOutlineColor={COLOR.red}
            type="password"
          />
          <Button title="로그인" onPress={createTmpToken} />
        </FormControl>
      </Stack>
      <Button title="토큰부여" onPress={createTmpToken} />
    </View>
  );
};

export default LoginScreen;

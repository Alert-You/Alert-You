import { View, Text, Button } from 'react-native'
import React from 'react'
import { useRecoilState } from 'recoil';
import { tokenState } from '@/store';

type Props = {
  navigation: any
}

const ProfileScreen = ({ navigation }: Props) => {
  const [tmpToken, setTmpToken] = useRecoilState(tokenState);
  return (
    <View>
      <Text>profileScreen</Text>
      <Button title="로그인페이지 이동" onPress={() => setTmpToken('')} />
    </View>
  );
}

export default ProfileScreen
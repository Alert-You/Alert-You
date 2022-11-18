import { View, Text } from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { MAIN } from '@/theme/colorVariants';

type Props = {
  name: string | undefined;
  schoolName: string | undefined;
  role: string | undefined;
  phone: string | undefined;
};

const ProfileInfo = ({ name, schoolName, role, phone }: Props) => {
  return (
    <>
      <View style={{ marginBottom: 10 }}>
        <Text
          style={{
            fontSize: 24,
            color: 'black',
            fontWeight: '500',
          }}>
          {name ? name : '이름을 등록하세요.'}
        </Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <MaterialCommunityIcons name="school" size={20} color={MAIN.mainFont} />
        <Text
          style={{
            fontSize: 16,
            color: 'black',
            fontWeight: '400',
            marginLeft: 10,
            marginBottom: 5,
          }}>
          {schoolName ? schoolName : "학교 정보가 없습니다."}
        </Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <MaterialCommunityIcons
          name="account"
          size={20}
          color={MAIN.mainFont}
        />
        <Text
          style={{
            fontSize: 16,
            color: 'black',
            fontWeight: '400',
            marginLeft: 10,
            marginBottom: 5,
          }}>
          {role ? role : "맡은 역할이 없습니다."}
        </Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <MaterialCommunityIcons name="phone" size={20} color={MAIN.mainFont} />
        <Text
          style={{
            fontSize: 16,
            color: 'black',
            fontWeight: '400',
            marginLeft: 10,
          }}>
          {phone ? phone : '전화번호 정보가 없습니다.'}
        </Text>
      </View>
    </>
  );
};

export default ProfileInfo;

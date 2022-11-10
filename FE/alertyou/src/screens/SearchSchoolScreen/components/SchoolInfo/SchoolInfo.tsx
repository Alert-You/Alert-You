import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {Flex, Badge} from 'native-base';
import {useSetRecoilState} from 'recoil';
import {AxiosError} from 'axios';
import {useQuery} from '@tanstack/react-query';

import {classListState, schoolState} from '@/store/signUpState';
import {useNavigation} from '@react-navigation/native';

import {styles} from './style';
import {gradeClassType} from './types';
import {requestGradeClass} from './apis';
import {failedFetchGrade} from './functions';

type Props = {
  address: string;
  name: string;
  idx: number;
};

const SchoolInfo = ({address, name, idx}: Props) => {
  const navigation = useNavigation<any>();
  const setClassList = useSetRecoilState(classListState);
  const setPickSchool = useSetRecoilState(schoolState);
  const {refetch} = useQuery<gradeClassType, AxiosError>(
    ['classGrade', idx],
    () => requestGradeClass(name, address),
    {
      suspense: true,
      enabled: false,
      cacheTime: 0,
      onSuccess: value => {
        setClassList(value.classes);
        setPickSchool({name, address});
        navigation.navigate('SignUp', {screen: 'SignUpScreen'});
      },
      onError: () => {
        failedFetchGrade();
      },
    },
  );

  //선택한 학교 저장, 학급 및 반 요청 후 이전 페이지로 이동
  const getGradeAndClass = (): void => {
    refetch();
  };

  return (
    <>
      <Pressable onPress={getGradeAndClass}>
        <View style={styles.container}>
          <Flex w="100%" direction="row" alignItems="center">
            <Badge variant="solid" colorScheme="warning">
              학교
            </Badge>
            <Text style={styles.schoolText}>{name}</Text>
          </Flex>
          <Flex w="100%" direction="row" alignItems="center">
            <Badge colorScheme="warning">주소</Badge>
            <Text style={styles.schoolText}>{address}</Text>
          </Flex>
        </View>
      </Pressable>
    </>
  );
};

export default SchoolInfo;

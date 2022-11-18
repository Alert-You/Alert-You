import {View, Keyboard, Pressable, ScrollView} from 'react-native';
import React, {Suspense, useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import {Divider, Input, SearchIcon, Spinner} from 'native-base';
import ErrorBoundary from 'react-native-error-boundary';

import {MAIN} from '@/theme/colorVariants';

import {requestSchoolData} from './apis';
import {schoolResponseType} from './types';
import {styles} from './style';
import { EditSchoolInfo } from './components';

const EditSchoolScreen = () => {
  const [school, setSchool] = useState<string>('');
  //리턴값, 에러, data에 담길 데이터, 쿼리 키 타입
  const {data, refetch, fetchStatus} = useQuery<schoolResponseType, AxiosError>(
    ['editSchoolList'],
    () => requestSchoolData(school),
    {
      suspense: true,
      enabled: false,
      cacheTime: 0,
      onError: (err) => {
        console.log(err)
      }
    },
  );

  const getSchoolList = (): void => {
    Keyboard.dismiss();
    refetch();
  };

  const changeSchool = (e: string): void => {
    setSchool(e);
  };

  //선택 시, 해당 정보를 가지고 뒤돌아가기
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Input
          type="text"
          // rounded="md"
          variant="underlined"
          placeholder="ex) 싸피고등학교"
          size="md"
          color={MAIN.mainFont}
          focusOutlineColor={MAIN.red}
          InputRightElement={
            <Pressable onPress={getSchoolList}>
              <SearchIcon mr="3" size="md" />
            </Pressable>
          }
          autoCorrect={false}
          onChangeText={changeSchool}
          onSubmitEditing={getSchoolList}
        />
      </View>
      <Suspense>
        <ErrorBoundary>
          <View style={styles.schoolListContainer}>
            {fetchStatus === 'idle' || fetchStatus !== 'fetching' ? (
              <ScrollView style={styles.scrollViewContainer}>
                <Divider mb="3"/>
                {data?.schools.map((item, idx) => {
                  return (
                    <EditSchoolInfo
                      address={item.address}
                      name={item.name}
                      key={`schoolKey ${idx}`}
                      idx={idx}
                    />
                  );
                })}
              </ScrollView>
            ) : (
              <Spinner color={MAIN.red} size="lg" />
            )}
          </View>
        </ErrorBoundary>
      </Suspense>
    </View>
  );
};

export default EditSchoolScreen;

import {Pressable, View, Keyboard} from 'react-native';
import React, {Suspense, useState} from 'react';
import {Input, ScrollView, SearchIcon, Spinner} from 'native-base';
import {useQuery} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import ErrorBoundary from 'react-native-error-boundary';

import {MAIN} from '@/theme/colorVariants';

import {styles} from './style';
import {SchoolInfo} from './components';
import {requestSchoolData} from './apis';
import {schoolResponseType} from './types';

const SearchSchoolScreen = () => {
  const [school, setSchool] = useState<string>('');
  //리턴값, 에러, data에 담길 데이터, 쿼리 키 타입
  const {data, refetch, fetchStatus, status} = useQuery<schoolResponseType, AxiosError>(
    ['schoolList'],
    () => requestSchoolData(school),
    {
      suspense: true,
      enabled: false,
      cacheTime: 0,
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
          {fetchStatus === 'idle' || fetchStatus !== 'fetching' ? 
            <ScrollView style={styles.scrollViewContainer}>
              {data?.schools.map((item, idx) => {
                return (
                  <SchoolInfo
                  address={item.address}
                    name={item.name}
                    key={`schoolKey ${idx}`}
                    idx={idx}
                  />
                  );
              })}
            </ScrollView>
            : <Spinner color={MAIN.red} size="lg"/>}
          </View>
        </ErrorBoundary>
      </Suspense>
      </View>
      );
};

export default SearchSchoolScreen;

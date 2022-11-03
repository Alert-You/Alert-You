import {View} from 'react-native';
import React from 'react';
import {Input, SearchIcon} from 'native-base';
import { useRecoilState } from 'recoil';

import {MAIN} from '@/theme/colorVariants';
import { schoolState } from '@/store/signUpState';

import {styles} from './style';
import {SchoolInfo} from './components';

const SearchSchoolScreen = () => {
  const [school, setSchool] = useRecoilState(schoolState);
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
          InputRightElement={<SearchIcon mr="3" size="md" />}
          autoCorrect={false}
          onSubmitEditing={() => setSchool((state) => { return {...state, school: "싸피고등학교"}})}
        />
      </View>
      {/* flatList + 아무것도 없다면 검색하시오 띄우기 */}
      <View style={styles.schoolListContainer}>
        <SchoolInfo />
        <SchoolInfo />
        <SchoolInfo />
        <SchoolInfo />
        <SchoolInfo />
      </View>
    </View>
  );
};

export default SearchSchoolScreen;

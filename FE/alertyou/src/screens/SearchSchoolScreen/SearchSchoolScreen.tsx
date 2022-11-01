import {View} from 'react-native';
import React from 'react';
import {Input, SearchIcon} from 'native-base';
import {MAIN} from '@/theme/colorVariants';

import {styles} from './style';
import {SchoolInfo} from './components';

const SearchSchoolScreen = () => {
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
          onSubmitEditing={() => {}}
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

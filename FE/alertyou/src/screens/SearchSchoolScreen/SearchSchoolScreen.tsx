import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {Divider, Flex, Input, SearchIcon} from 'native-base';
import {MAIN} from '@/theme/colorVariants';
import {styles} from './style';

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
      <View style={styles.schoolListContainer}>
        <View>
          <Flex direction='row' w="100%">
            <Text>학교명</Text>
            <Divider orientation='vertical' mx='2'/>
            <Text>주소</Text>
          </Flex>
        </View>
      </View>
    </View>
  );
};

export default SearchSchoolScreen;

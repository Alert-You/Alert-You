import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {Input, SearchIcon} from 'native-base';
import {MAIN} from '@/theme/colorVariants';

const SearchSchoolScreen = () => {
  return (
    <View>
      <Pressable onPress={() => {}}>
        <Input
          type="text"
          variant="filled"
          editable={false}
          placeholder="ex) 싸피고등학교"
          size="md"
          h="9"
          color={MAIN.mainFont}
          focusOutlineColor={MAIN.red}
          InputRightElement={<SearchIcon size="md"/>}
          autoCorrect={false}
          // value={val}
        />
      </Pressable>
    </View>
  );
};

export default SearchSchoolScreen;

import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {Badge, Divider, Flex, Input, SearchIcon} from 'native-base';
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
        <View style={{borderWidth:0.5, paddingHorizontal: 6, paddingVertical: 6}}>
          {/* <Flex direction='row' w="100%">
            <Text>학교명</Text>
            <Divider orientation='vertical' mx='2'/>
            <Text>주소</Text>
          </Flex> */}
          <Flex w='100%' direction='row' alignItems="center">
            {/* <Divider mx="3"/> */}
            <Badge variant="solid" colorScheme="warning">학교</Badge>
            <Text style={{fontSize: 12, marginLeft:4}}>싸피고등학교</Text>
          </Flex>
          <Flex w='100%' direction='row' alignItems="center" mt="1">
            {/* <Divider mx="3"/> */}
            <Badge colorScheme="warning">주소</Badge>
            <Text style={{fontSize: 12, marginLeft:4}}>대전 서구 둔산동 싸피로13</Text>
          </Flex>
        </View>
      </View>
    </View>
  );
};

export default SearchSchoolScreen;

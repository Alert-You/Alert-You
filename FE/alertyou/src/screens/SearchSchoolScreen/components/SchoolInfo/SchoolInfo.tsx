import {View, Text} from 'react-native';
import React from 'react';
import {Flex, Badge} from 'native-base';

import {styles} from './style';

type Props = {};

const SchoolInfo = (props: Props) => {
  return (
      <View style={styles.container}>
        <Flex w="100%" direction="row" alignItems="center">
          <Badge variant="solid" colorScheme="warning">
            학교
          </Badge>
          <Text style={styles.schoolText}>싸피고등학교</Text>
        </Flex>
        <Flex w="100%" direction="row" alignItems="center" >
          <Badge colorScheme="warning">주소</Badge>
          <Text style={styles.schoolText}>
            대전 서구 둔산동 싸피로13
          </Text>
        </Flex>
      </View>
  );
};

export default SchoolInfo;

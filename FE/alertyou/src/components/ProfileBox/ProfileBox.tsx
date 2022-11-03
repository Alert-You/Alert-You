import {View, Text} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {MAIN} from '@/theme/colorVariants';
import {Divider} from 'native-base';

import {styles} from './style';
import {Props} from './types';

const ProfileBox = ({schoolInfo, role, phone}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <MaterialCommunityIcons
          name="map-marker"
          size={28}
          color={MAIN.mainFont}
        />
        <View>
          <Text style={styles.contentTitleText}>학교</Text>
          <Text style={styles.contentText}>{schoolInfo}</Text>
        </View>
      </View>
      <Divider w="90%" />
      <View style={styles.contentContainer}>
        <MaterialCommunityIcons
          name="account"
          size={28}
          color={MAIN.mainFont}
        />
        <View>
          <Text style={styles.contentTitleText}>직급</Text>
          <Text style={styles.contentText}>{role}</Text>
        </View>
      </View>
      <Divider w="90%" />
      <View style={styles.contentContainer}>
        <MaterialCommunityIcons name="phone" size={28} color={MAIN.mainFont} />
        <View>
          <Text style={styles.contentTitleText}>연락처</Text>
          <Text style={styles.contentText}>{phone}</Text>
        </View>
      </View>
    </View>
  );
};

export default ProfileBox;

import {View, Text} from 'react-native';
import React from 'react';
import {styles} from './style';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {MAIN} from '@/theme/colorVariants';

type Props = {};

const ProfileBox = (props: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <MaterialCommunityIcons
          name="map-marker"
          size={25}
          color={MAIN.mainFont}
        />
        <Text style={styles.contentText}>hello</Text>
      </View>
      <View style={styles.contentContainer}>
        <MaterialCommunityIcons
          name="account"
          size={25}
          color={MAIN.mainFont}
        />
        <Text style={styles.contentText}>hello</Text>
      </View>
      <View style={styles.contentContainer}>
        <MaterialCommunityIcons name="phone" size={25} color={MAIN.mainFont} />
        <Text style={styles.contentText}>hello</Text>
      </View>
    </View>
  );
};

export default ProfileBox;

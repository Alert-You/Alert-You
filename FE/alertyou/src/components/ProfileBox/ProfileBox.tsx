import { View, Text } from 'react-native'
import React from 'react'
import { styles } from './style';
import { Icon } from 'native-base';


type Props = {}

const ProfileBox = (props: Props) => {
  return (
    <View style={styles.container}>
      <Text>ProfileBox</Text>
      <Icon/>
    </View>
  )
}

export default ProfileBox
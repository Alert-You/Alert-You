import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { styles } from './style';
type Props = {
  navigation: any
}

const NoticeScreen = ({ navigation }: Props) => {
  return (
    <View style={styles.container}>
      <View>
        <Pressable>
          <Text style={styles.readContainer}>모두 읽기</Text>
        </Pressable>
      </View>
      <View>
        <Text style={styles.textContainer}>오늘</Text>
      </View>
    </View>
  )
}

export default NoticeScreen
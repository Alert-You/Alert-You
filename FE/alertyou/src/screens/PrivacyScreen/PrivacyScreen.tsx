import { View, Text, ScrollView } from 'react-native'
import React from 'react'

import { styles } from './style'

type Props = {}

const PrivacyScreen = (props: Props) => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>알럿유 개인정보 처리 방침</Text>
      <Text></Text>
    </ScrollView>
  )
}

export default PrivacyScreen
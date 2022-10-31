import { View, Text } from 'native-base'
import React from 'react'
import { noticeListType } from '@/types'

const NoticeItem: React.FC<{ item: noticeListType }> = ({ item }) => {
  return (
    <View>
      {item.isVictim ? <Text>긴급신고</Text> : <Text>목격자 신고</Text>}
      <Text>{item.noticeDate}</Text>
      <Text>{item.noticeTime}</Text>
    </View>
  )
}

export default NoticeItem
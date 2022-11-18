import React from 'react'
import { View, Text } from 'react-native'

import { NoticeItem } from '@/screens/NoticeScreen'
import { noticeItemType } from '@/types'



const NoticeList: React.FC<{ noticeList: noticeItemType[] | undefined; read: boolean }> = ({ noticeList, read }) => {

  return (
    <View>
      {noticeList?.length !== 0 &&
        noticeList?.map((item) => {
          return <View key={item.noticeDateTime + item.reportId}>
            <NoticeItem item={item} read={read} />
          </View>
        })}
    </View>
  )
}

export default NoticeList
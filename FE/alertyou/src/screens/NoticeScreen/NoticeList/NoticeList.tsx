import React, { useCallback } from 'react'
import { View, Text } from 'react-native'
import { NoticeItem } from '@/screens/NoticeScreen'
import { noticeListType } from '@/types'
import { FlatList } from 'native-base'

const NoticeList: React.FC<{ noticeList: noticeListType[] }> = ({ noticeList }) => {
  const renderItem = useCallback(({ item }: { item: noticeListType }) => {
    return <NoticeItem item={item} />;
  }, []);

  return (
    <View>
      <FlatList
        data={noticeList}
        renderItem={renderItem}
      />
    </View>
  )
}

export default NoticeList
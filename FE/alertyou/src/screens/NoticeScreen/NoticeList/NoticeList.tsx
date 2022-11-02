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
      {noticeList ?
        <FlatList
          data={noticeList}
          renderItem={renderItem}
        />
        : <Text>알림내역이 없습니다.</Text>}
    </View>
  )
}

export default NoticeList
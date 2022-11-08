import React, { useCallback } from 'react'
import { View, Text } from 'react-native'
import { NoticeItem } from '@/screens/NoticeScreen'
import { noticeItemType } from '@/types'
import { FlatList } from 'native-base'


const NoticeList: React.FC<{ noticeList: noticeItemType[] | undefined; read: boolean }> = ({ noticeList, read }) => {
  const renderItem = useCallback(({ item }: { item: noticeItemType }) => {
    return <NoticeItem item={item} read={read} />;
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
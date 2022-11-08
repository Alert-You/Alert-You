import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { styles } from './style';
import { NoticeList } from '@/screens/NoticeScreen'
import { useRecoilState } from 'recoil';
import { noticeListState } from '@/store'

type Props = {
  navigation: any
}

const NoticeScreen = ({ navigation }: Props) => {
  const [noticeList, setNoticeList] = useRecoilState(noticeListState)

  return (
    <View style={styles.container}>
      <Pressable>
        <Text style={styles.readContainer}>모두 읽기</Text>
      </Pressable>
      <NoticeList noticeList={noticeList} />
    </View>
  )
}

export default NoticeScreen
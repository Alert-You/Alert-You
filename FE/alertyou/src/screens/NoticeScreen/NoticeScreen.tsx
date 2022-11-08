import { View, Text, Pressable } from 'react-native'
import React, { Suspense, useEffect } from 'react'
import { ScrollView } from 'native-base';

import { useIsFocused } from '@react-navigation/native';
import { NoticeList } from '@/screens/NoticeScreen'
import { useMutation, useQuery } from '@tanstack/react-query';

import { checkNoticeAll, getNoticeList } from './api';
import { styles } from './style';

type Props = {
  navigation: any
}

const NoticeScreen = ({ navigation }: Props) => {
  const isFocused = useIsFocused();
  const { data, refetch } = useQuery(["getNoticeList"], getNoticeList, { suspense: true, enabled: isFocused })

  const checkMutation = useMutation(checkNoticeAll, {
    onError: (error) => {
      console.log(error)
    },
    onSuccess: () => {
      refetch();
    },
  })

  const readAllNotive = () => {
    checkMutation.mutate()
  }
  return (
    <View style={styles.container}>
      <Pressable onPress={readAllNotive}>
        <Text style={styles.readContainer}>모두 읽기</Text>
      </Pressable>
      <Suspense >
        <View style={{ flex: 1 }}>
          <NoticeList noticeList={data?.unRead} read={false} />
          <NoticeList noticeList={data?.read} read={true} />
        </View>
      </Suspense>
    </View>
  )
}

export default NoticeScreen
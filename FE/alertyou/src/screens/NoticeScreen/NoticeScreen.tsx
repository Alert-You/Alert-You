import { View, Pressable, Image, Dimensions } from 'react-native'
import React, { Suspense } from 'react'
import { Center, ScrollView, Text } from 'native-base';

import { useIsFocused } from '@react-navigation/native';
import { NoticeList } from '@/screens/NoticeScreen'
import { useMutation, useQuery } from '@tanstack/react-query';
import zeroNotice from '@assets/zeronotice.png'

import { checkNoticeAll, getNoticeList } from './api';
import { styles } from './style';

type Props = {
  navigation: any
}

const NoticeScreen = ({ navigation }: Props) => {
  const isFocused = useIsFocused();
  const { data, refetch } = useQuery(["getNoticeList"], getNoticeList, { suspense: true, enabled: isFocused })

  const checkMutation = useMutation(checkNoticeAll, {
    onSuccess: () => {
      refetch();
    },
  })

  const readAllNotice = () => {
    checkMutation.mutate()
  }
  return (
    <View style={styles.container}>
      {data?.unRead.length !== 0 &&
        <Pressable onPress={readAllNotice}>
          <Text style={styles.readContainer}>모두 읽음 표시</Text>
        </Pressable>
      }
      <Suspense>
        {data?.unRead.length !== 0 || data?.read.length !== 0 ?
          <ScrollView>
            <NoticeList noticeList={data?.unRead} read={false} />
            <NoticeList noticeList={data?.read} read={true} />
          </ScrollView>
          :
          <View style={{ flex: 1, justifyContent: 'center', marginBottom: 100 }}>
            <Center>
              <Image
                source={zeroNotice}
                style={{ width: Dimensions.get('window').width - 250, height: Dimensions.get('window').height - 500 }} />
            </Center>
          </View>
        }
      </Suspense>
    </View>
  )
}

export default NoticeScreen
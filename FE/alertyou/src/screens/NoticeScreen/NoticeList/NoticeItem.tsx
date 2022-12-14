import { View } from 'native-base'
import React, { useCallback } from 'react'
import { Pressable, TouchableOpacity } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { noticeItemType } from '@/types'
import { FlatListItem } from '@/components'
import { WHITE, RED, PURPLE } from '@/theme/colorVariants'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import { NoticeParamList } from '@/navigations/NoticeNavigation/NoticeNavigation'
import { useMutation } from '@tanstack/react-query'

import { checkNotice } from '../api'

const NoticeItem: React.FC<{ item: noticeItemType; read: boolean }> = ({ item, read }) => {
  const navigation = useNavigation<NavigationProp<NoticeParamList>>()

  let notice: string = ''
  let bgColor: string = WHITE.white
  if (item.isVictim) {
    notice = '구조요청이 도착했습니다!'
  } else if (!item.isVictim) {
    notice = '목격자 제보가 도착했습니다!'
  }
  const date = new Date()
  const noticeDateTime = item.noticeDateTime.replace(/-/gi, '/')
  const writeDay = new Date(noticeDateTime)

  let dif = date.getTime() - writeDay.getTime()
  dif = Math.trunc(dif / 1000);
  // 초 
  const seconds = 1;
  // 분
  const minute = seconds * 60;
  // 시
  const hour = minute * 60;
  // 일
  const day = hour * 24;

  let subTitle = '방금 전'
  if (dif < hour) {
    subTitle = Math.trunc(dif / minute) + '분 전';
    //시보다 작으면 몇분전인지
  } else if (dif < day) {
    subTitle = Math.trunc(dif / hour) + '시간 전 ';
    //일보다 작으면 몇시간전인지 
  } else {
    subTitle = writeDay.getFullYear() + '년 ' + (writeDay.getMonth() + 1) + '월 ' + writeDay.getDate() + '일 ' + writeDay.getHours() + '시 ' + writeDay.getMinutes() + '분'
  }

  const checkMutation = useMutation(checkNotice, {
    onError: (error) => {
      console.log(error)
    },
    onSuccess: (data) => {
      console.log("success");
    },
  }
  )
  const onClick = useCallback(() => {
    checkMutation.mutate(item.alertId)
    navigation.navigate('NoticeMap', { reportId: item.reportId })
  }, [navigation]);

  let icon = <View>
    <MaterialCommunityIcons
      name="account-group"
      size={32}
      color={PURPLE.purple400} />
  </View>
  if (item.isVictim) {
    icon = <View>
      <MaterialCommunityIcons
        name='bell-alert'
        size={32}
        color={RED.red400} />
    </View>
  }

  if (!read) {
    if (item.isVictim) {
      bgColor = RED.red400p
    } else if (!item.isVictim) {
      bgColor = PURPLE.purple500
    }
  }

  return (
    <View>
      <TouchableOpacity activeOpacity={0.8} onPress={onClick}>
        <FlatListItem
          title={notice}
          subTitle={subTitle}
          bgColor={bgColor}
          rightContent=""
          bdColor={RED.red300}
          bdbColor=""
          cbgColor={RED.redBg}
          bdWidth={0}
          icon={icon}
        />
      </TouchableOpacity>
    </View>
  );
}

export default NoticeItem
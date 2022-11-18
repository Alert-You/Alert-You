import { FlatListItem } from '@/components'
import { PURPLE, RED } from '@/theme/colorVariants'
import { repType } from '@/types'
import { View } from 'native-base'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const ReportItem: React.FC<{ item: repType }> = ({ item }) => {

  let bgColor: string = PURPLE.purple500
  let title: string = "학교폭력 현장 목격 제보"
  let icon = <View>
    <MaterialCommunityIcons
      name="account-group"
      size={32}
      color={PURPLE.purple500} />
  </View>
  if (item.isVictim) {
    icon = <View>
      <MaterialCommunityIcons
        name='bell-alert'
        size={32}
        color={RED.red500}
      />
    </View>
  }
  if (item.isVictim) {
    bgColor = RED.red500
    title = "긴급 도움 요청"
  }
  const writeDay = new Date(item?.noticeDateTime.replace(/-/gi, '/') + '')
  const convertDay = writeDay.getFullYear() + '년 ' + (writeDay.getMonth() + 1) + '월 ' + writeDay.getDate() + '일 ' + writeDay.getHours() + '시 ' + writeDay.getMinutes() + '분'

  return (
    <View>
      <FlatListItem
        title={title}
        subTitle={convertDay}
        bgColor={bgColor}
        rightContent=''
        bdColor={bgColor}
        bdbColor={bgColor}
        cbgColor={RED.redBg}
        bdWidth={1}
        icon={icon} />
    </View>
  )
}

export default ReportItem
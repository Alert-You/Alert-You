import React from 'react'
import { Pressable, View } from 'native-base'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { studentType } from '@/types'
import { FlatListItem } from '@/components'
import { MAIN, RED, WHITE } from '@/theme/colorVariants'

const StudentItem: React.FC<{ item: studentType }> = ({ item }) => {
  const moveToDetail = <Pressable>
    <MaterialCommunityIcons
      name='chevron-right'
      size={25}
      color={MAIN.mainFont} />
  </Pressable>

  let icon = <View>
    <MaterialCommunityIcons
      name="account-outline"
      size={32}
      color={RED.red400} />
  </View>
  if (item.isGuard) {
    icon = <View>
      <MaterialCommunityIcons
        name='shield-star-outline'
        size={32}
        color={RED.red400} />
    </View>
  }
  return (
    <View>
      <FlatListItem
        title={item.name}
        subTitle={item.phone}
        bgColor={WHITE.white}
        rightContent={moveToDetail}
        bdColor={RED.red500}
        bdbColor={RED.red300}
        cbgColor={RED.redBg}
        bdWidth={1}
        icon={icon} />
    </View>
  )
}

export default StudentItem
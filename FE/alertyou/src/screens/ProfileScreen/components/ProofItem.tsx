import { Text, View } from 'native-base'
import React from 'react'

import { proofType } from '@/types'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { MAIN, PURPLE, RED, WHITE } from '@/theme/colorVariants'
import { FlatListItem } from '@/components'
import { Pressable } from 'react-native'
const ProofItem: React.FC<{ item: proofType }> = ({ item }) => {
  let title: string = "녹취 파일 "
  let rightContent = <View>
    <Pressable>
      <MaterialCommunityIcons
        name="download"
        size={32}
        color={WHITE.white400}
      />
    </Pressable>
  </View>
  let icon = <View>
    <MaterialCommunityIcons
      name="microphone"
      size={32}
      color={PURPLE.purple400} />
  </View>
  if (item.type) {
    icon = <View>
      <MaterialCommunityIcons
        name='image'
        size={32}
        color={RED.red400}
      />
    </View>
  }
  if (item.type) {
    title = "사진 파일"
  }


  return (
    <View>
      <FlatListItem
        title={title}
        subTitle={item.createDate}
        bgColor={WHITE.white}
        rightContent={rightContent}
        bdColor={WHITE.white}
        bdbColor={RED.red300}
        cbgColor={RED.redBg}
        bdWidth={1}
        icon={icon} />
    </View>
  )
}

export default ProofItem
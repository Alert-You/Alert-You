import React, { useState } from 'react'
import { Center, Divider, Pressable, Text, View } from 'native-base'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { useRoute, RouteProp, useNavigation, NavigationProp } from '@react-navigation/native'
import { ProfileParamList } from '@/navigations/ProfileNavigation/ProfileNavigation'
import { studentType, repType, proofType } from '@/types'
import { ProfileBox } from '@/components'
import { MAIN, RED } from '@/theme/colorVariants'
import { ReportList, ProofList } from '@/screens'

import { styles } from './style'

const StudentDetail = () => {
  const navigation = useNavigation<NavigationProp<ProfileParamList>>()
  const studentId = useRoute<RouteProp<ProfileParamList>>().params?.studentId

  const [isOpened, setIsOpened] = useState<boolean>(false)
  const [tabNum, setTabNum] = useState<number>(1)

  let tabOneColor: string = ''
  let tabTwoColor: string = ''
  let tabTwoTextColor: string = ''
  let tabOneTextColor: string = ''

  if (tabNum === 1) {
    tabOneColor = RED.red700
    tabTwoColor = MAIN.lightGrey
    tabOneTextColor = RED.red700
    tabTwoTextColor = MAIN.mainFont
  } else if (tabNum === 2) {
    tabOneColor = MAIN.lightGrey
    tabTwoColor = RED.red700
    tabOneTextColor = MAIN.mainFont
    tabTwoTextColor = RED.red700
  }

  const student: studentType = {
    school: '싸피고등학교 2학년 2반',
    name: '이현정',
    role: '보디가드',
    phone: '010-1234-5678'
  }

  const reports: repType[] = [
    {
      reportId: 1,
      noticeDateTime: "2022-11-03 13:23",
      isVictim: true,
    },
    {
      reportId: 2,
      noticeDateTime: "2022-11-07 13:23",
      isVictim: false,
    }
  ]

  const proofs: proofType[] = [
    {
      proofId: 1,
      url: '',
      type: true,
      createDate: "2022-11-07 13:23"
    },
    {
      proofId: 2,
      url: '',
      type: false,
      createDate: "2022-11-07 13:25"
    },
  ]

  return (
    <View style={styles.teacherScreenContainer}>
      <View style={styles.headerBox}>
        <Pressable onPress={() => { navigation.goBack() }}>
          <MaterialCommunityIcons
            name='arrow-left'
            size={25}
            style={styles.arrowBox}
          />
        </Pressable>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          {student.role === '보디가드' && <MaterialCommunityIcons
            name='shield-star-outline'
            size={24}
            color={RED.red400} />}
          <Text style={styles.textBox}>{student.name}</Text>
        </View>
        <View>
          <Pressable onPress={() => { setIsOpened(!isOpened) }}>
            <MaterialCommunityIcons
              name='dots-vertical'
              size={24} />
          </Pressable>
        </View>
        {isOpened &&
          <View style={styles.dotContainer}>
            <View style={styles.dotContent}>
              <Pressable>
                <Text style={styles.guardText}>보디가드 임명</Text>
              </Pressable>
            </View>
            <Divider />
            <View style={styles.dotContent}>
              <Pressable>
                <Text style={styles.excludeText}>학급에서 제외</Text>
              </Pressable>
            </View>
          </View>
        }
      </View>
      <View style={styles.profileBox}>
        <ProfileBox
          schoolInfo={student.school}
          role={student.role}
          phone={student.phone}
        />
      </View>
      <View style={styles.tabBoxGroup}>
        <View style={[styles.tabBox, { borderBottomWidth: 1, borderBottomColor: tabOneColor }]}>
          <Pressable onPress={() => { setTabNum(1) }}>
            <Text style={[styles.tabText, { color: tabOneTextColor }]}>신고내역</Text>
          </Pressable>
        </View>
        <View style={[styles.tabBox, { borderBottomWidth: 1, borderBottomColor: tabTwoColor }]}>
          <Pressable onPress={() => { setTabNum(2) }}>
            <Text style={[styles.tabText, { color: tabTwoTextColor }]}>사진 및 녹취 자료</Text>
          </Pressable>
        </View>
      </View>
      <View>
        {tabNum === 1 &&
          <ReportList reports={reports} />
        }
        {tabNum === 2 &&
          <ProofList proofs={proofs} />}
      </View>
    </View>

  )
}

export default StudentDetail
import React, { useState } from 'react'
import { Divider, Pressable, Text, View } from 'native-base'
import { Alert } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { useRoute, RouteProp, useNavigation, NavigationProp } from '@react-navigation/native'
import { ProfileParamList } from '@/navigations/ProfileNavigation/ProfileNavigation'
import { ProfileBox } from '@/components'
import { MAIN, RED } from '@/theme/colorVariants'
import { ReportList, ProofList } from '@/screens'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { styles } from './style'
import { excludeStudent, getProofList, getReportList, getStudent, handleBodyguard } from './apis'

const StudentDetail = () => {
  const navigation = useNavigation<NavigationProp<ProfileParamList>>()
  const studentId = useRoute<RouteProp<ProfileParamList>>().params?.studentId
  const queryClient = useQueryClient();
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
  // 학생 상세정보
  const { data: student, refetch } = useQuery(['getStudent'], () => getStudent(studentId),
    {
      suspense: true,
    })

  // 특정 학생의 신고 내역
  const { data: reports } = useQuery(['getReportList'], () => getReportList(studentId),
    {
      suspense: true,
    })

  // 특정 학생의 증거 자료
  const { data: proofs } = useQuery(['getProofList'], () => getProofList(studentId),
    {
      suspense: true,
    })

  // 보디가드 임명 뮤테이션
  const bodyguardMutation = useMutation(handleBodyguard, {
    onSuccess: () => {
      refetch()
    },
  })

  const bodyguardHandler = (): void => {
    if (student?.role === '보디가드') {
      Alert.alert('보디가드 해제', '정말로 보디가드 역할을 해제하시겠습니까?', [
        {
          text: '취소'
        },
        {
          text: '해제',
          style: 'cancel',
          onPress: () => {
            bodyguardMutation.mutate(studentId)
            setIsOpened(!isOpened)
          }
        }
      ])
    } else {
      Alert.alert('보디가드 임명', '보디가드로 임명 하시겠습니까?', [
        {
          text: '취소'
        },
        {
          text: '임명',
          style: 'cancel',
          onPress: () => {
            bodyguardMutation.mutate(studentId)
            setIsOpened(!isOpened)
          }
        }
      ])
    }
  }

  const excludeHandler = (): void => {
    Alert.alert('학급에서 제외', '해당 학생을 우리반에서 제외 하시겠습니까?', [
      {
        text: '취소'
      },
      {
        text: '제외',
        style: 'cancel',
        onPress: () => {
          excludeStudent(studentId)
            .then(() => {
              navigation.goBack()
            })
        }
      }
    ])
  }

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
          {student?.role === '보디가드' && <MaterialCommunityIcons
            name='shield-star-outline'
            size={24}
            color={RED.red400} />}
          <Text style={styles.textBox}>{student?.name}</Text>
        </View>
        <View>
          <Pressable onPress={() => { setIsOpened(!isOpened) }}>
            <MaterialCommunityIcons
              name='dots-vertical'
              size={24}
              color={MAIN.mainFont} />
          </Pressable>
        </View>
        {isOpened &&
          <View style={styles.dotContainer}>
            <View style={styles.dotContent}>
              {student?.role === '보디가드' ?
                <Pressable onPress={bodyguardHandler}>
                  <Text style={styles.guardText}>보디가드 해제</Text>
                </Pressable>
                :
                <Pressable onPress={bodyguardHandler}>
                  <Text style={styles.guardText}>보디가드 등록</Text>
                </Pressable>
              }
            </View>
            <Divider />
            <View style={styles.dotContent}>
              <Pressable onPress={excludeHandler}>
                <Text style={styles.excludeText}>학급에서 제외</Text>
              </Pressable>
            </View>
          </View>
        }
      </View>
      <View style={styles.profileBox}>
        <ProfileBox
          schoolInfo={student?.school}
          role={student?.role}
          phone={student?.phone}
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
      <View style={{ flex: 1 }}>
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
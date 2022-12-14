import React, { Suspense, useEffect, useState } from 'react'
import { Box, Select, View } from 'native-base'
import { AxiosError } from 'axios';

import { MAIN } from '@/theme/colorVariants';
import { StudentList } from '@/screens'
import { studentsType } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { useIsFocused } from '@react-navigation/native';

import { styles } from './style';
import { getClasses, getStudents, requestUserProfile } from './apis';
import { profileResponseType } from './types';

const TeacherScreen = () => {

  const { data } = useQuery<profileResponseType, AxiosError>(
    ['userProfile'],
    requestUserProfile,
    { suspense: true },
  );
  const schoolName: any = data?.schoolName.split(' ')
  const [grade, setGrade] = useState<any>(schoolName[1].replace('학년', ''))
  const [classRoom, setClassRoom] = useState<string>(schoolName[2].replace('반', ''))
  const [students, setStudents] = useState<studentsType[]>([])

  const isFocused = useIsFocused()

  const { data: classes } = useQuery(
    ["getClasses"],
    getClasses,
    {
      enabled: true,
      suspense: true,
    })


  useEffect(() => {
    if (isFocused && grade && classRoom) {
      getStudents(grade, classRoom)
        .then((res) => {
          setStudents(res)
        })
    }
  }, [isFocused])




  return (
    <View style={styles.teacherScreenContainer}>
      <View style={styles.selectBoxGroup}>
        <Box width='45%' style={styles.selectBox}>
          <Select selectedValue={grade} accessibilityLabel="Choose Grade" placeholder="학년" placeholderTextColor={MAIN.mainFont} borderColor={MAIN.red} _selectedItem={{
            bg: MAIN.red
          }} onValueChange={itemValue => { setGrade(itemValue); setClassRoom('') }}>
            {classes?.length !== 0 && classes?.map((classList, idx) => {
              if (classList.length !== 0) {
                return <Select.Item key={idx} label={(idx) + "학년"} value={(idx) + ''} />
              }
            })}
          </Select>
        </Box>
        <Box width='45%' style={styles.selectBox}>
          <Select selectedValue={classRoom} accessibilityLabel="Choose Class" placeholder="반" placeholderTextColor={MAIN.mainFont} borderColor={MAIN.red} _selectedItem={{
            bg: MAIN.red
          }} onValueChange={
            itemValue => {
              setClassRoom(itemValue)
              getStudents(grade, itemValue)
                .then((res) => {
                  setStudents(res)
                })
            }}>
            {grade && classes !== undefined && classes[grade]?.map((classNum: string) => {
              return <Select.Item key={classNum} label={(classNum) + "반"} value={(classNum)} />
            })}
          </Select>
        </Box>
      </View>
      <View>
        <Suspense>
          <StudentList students={students} grade={grade} classRoom={classRoom} />
        </Suspense>
      </View>
    </View>
  )
}

export default TeacherScreen
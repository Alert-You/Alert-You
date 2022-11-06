import React, { useState } from 'react'
import { Box, Select, View } from 'native-base'

import { MAIN } from '@/theme/colorVariants';
import { StudentList } from '@/screens'
import { studentType } from '@/types';

import { styles } from './style';

const TeacherScreen = () => {
  const [grade, setGrade] = useState<any>('')
  const [classRoom, setClassRoom] = useState<string>('')
  const classes: string[][] = [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ['1', '2', '3', '4', '5', '6',],
    ['믿음', '소망', '사랑', '기쁨', '행복', '희망'],
  ]
  const students: studentType[] = [
    {
      userId: 1,
      name: '이현정',
      phone: '010-1234-5678',
      isGuard: false
    },
    {
      userId: 2,
      name: '송상진',
      phone: '010-2345-6789',
      isGuard: true
    },
    {
      userId: 3,
      name: '박승훈',
      phone: '010-3456-7890',
      isGuard: false
    },
    {
      userId: 4,
      name: '박시원',
      phone: '010-4567-8901',
      isGuard: true
    },

  ]
  return (
    <View style={styles.teacherScreenContainer}>
      <View style={styles.selectBoxGroup}>
        <Box width='45%' style={styles.selectBox}>
          <Select selectedValue={grade} accessibilityLabel="Choose Grade" placeholder="학년" placeholderTextColor={MAIN.mainFont} borderColor={MAIN.red} _selectedItem={{
            bg: MAIN.red
          }} onValueChange={itemValue => { setGrade(itemValue); setClassRoom('') }}>
            {classes.length !== 0 && classes.map((classList, idx) => {
              return <Select.Item key={idx} label={(idx + 1) + "학년"} value={(idx) + ''} />
            })}
          </Select>
        </Box>
        <Box width='45%' style={styles.selectBox}>
          <Select selectedValue={classRoom} accessibilityLabel="Choose Class" placeholder="반" placeholderTextColor={MAIN.mainFont} borderColor={MAIN.red} _selectedItem={{
            bg: MAIN.red
          }} onValueChange={itemValue => setClassRoom(itemValue)}>
            {grade && classes[grade].map((classNum: string) => {
              return <Select.Item key={classNum} label={(classNum) + "반"} value={(classNum)} />
            })}
          </Select>
        </Box>
      </View>
      <View>
        <StudentList students={students} grade={grade} classRoom={classRoom} />
      </View>
    </View>
  )
}

export default TeacherScreen
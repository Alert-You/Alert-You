import React, { useCallback } from 'react'
import { FlatList, Text, View } from 'native-base'

import { studentType } from '@/types';

import { styles } from '../style';
import StudentItem from './StudentItem';

const StudentList: React.FC<{ students: studentType[]; grade: string; classRoom: string }> = ({ students, grade, classRoom }) => {
  let gradeNum: number = 0

  if (grade === '0') {
    gradeNum = 1
  } else if (grade === '1') {
    gradeNum = 2
  } else if (grade === '2') {
    gradeNum = 3
  } else if (grade === '4') {
    gradeNum = 5
  } else {
    gradeNum = 6
  }

  const renderItem = useCallback(({ item }: { item: studentType }) => {
    return <StudentItem item={item} />;
  }, []);
  return (
    <View>
      {gradeNum && classRoom ?
        <View>
          <View style={styles.countBox}>
            <Text style={styles.countText}>{gradeNum}학년 {classRoom}반</Text>
            <Text style={styles.countText}>{students.length}명</Text>
          </View>
          <View>
            {students ?
              <FlatList
                data={students}
                renderItem={renderItem}
              />
              : <Text>해당 반에 학생이 없습니다.</Text>}
          </View>
        </View>
        : <View>
          <Text style={styles.selectText}>학년 및 반을 선택해 주세요.</Text>
        </View>
      }
    </View>
  )
}

export default StudentList
import React, { useCallback } from 'react'
import { FlatList, ScrollView, Text, View } from 'native-base'

import { studentsType } from '@/types';

import { styles } from '../style';
import StudentItem from './StudentItem';
import { Dimensions } from 'react-native';

const StudentList: React.FC<{ students: studentsType[] | undefined; grade: string; classRoom: string; }> = ({ students, grade, classRoom }) => {

  return (
    <View>
      {grade && classRoom ?
        <View>
          <View style={styles.countBox}>
            <Text style={styles.countText}>{grade}학년 {classRoom}반</Text>
            <Text style={styles.countText}>{students?.length}명</Text>
          </View>
          <ScrollView style={{ height: Dimensions.get('window').height - 225 }}>
            {students?.length !== 0 ?
              students?.map((item) => {
                return <View key={item.phone}>
                  <StudentItem item={item} />
                </View>
              })
              : <Text>해당 반에 학생이 없습니다.</Text>}
          </ScrollView>
        </View>
        : <View>
          <Text style={styles.selectText}>학년 및 반을 선택해 주세요.</Text>
        </View>
      }
    </View>
  )
}

export default StudentList
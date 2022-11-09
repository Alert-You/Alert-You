import React, { useCallback } from 'react'
import { FlatList, Text, View } from 'native-base'

import { studentsType } from '@/types';

import { styles } from '../style';
import StudentItem from './StudentItem';

const StudentList: React.FC<{ students: studentsType[] | undefined; grade: string; classRoom: string; }> = ({ students, grade, classRoom }) => {

  const renderItem = useCallback(({ item }: { item: studentsType }) => {
    return <StudentItem item={item} />;
  }, []);
  return (
    <View>
      {grade && classRoom ?
        <View>
          <View style={styles.countBox}>
            <Text style={styles.countText}>{grade}학년 {classRoom}반</Text>
            <Text style={styles.countText}>{students?.length}명</Text>
          </View>
          <View>
            {students?.length !== 0 ?
              <FlatList
                data={students}
                renderItem={renderItem}
                keyExtractor={item => item.phone}
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
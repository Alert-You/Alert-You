import React, { useCallback } from 'react'
import { Center, FlatList, ScrollView, Text, View } from 'native-base'

import { studentsType } from '@/types';
import gradeClass from '@assets/grade.png'
import noStudent from '@assets/nostudent.png'

import { styles } from '../style';
import StudentItem from './StudentItem';
import { Dimensions, Image } from 'react-native';

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
              :
              <View style={{ marginTop: Dimensions.get('window').width - 300 }}>
                <Center>
                  <Image
                    source={noStudent}
                    style={{ width: Dimensions.get('window').width - 250, height: Dimensions.get('window').height - 500 }} />
                </Center>
              </View>
            }
          </ScrollView>
        </View>
        :
        <View style={{ marginTop: Dimensions.get('window').width - 300 }}>
          <Center>
            <Image
              source={gradeClass}
              style={{ width: Dimensions.get('window').width - 250, height: Dimensions.get('window').height - 500 }} />
          </Center>
        </View>
      }
    </View>
  )
}

export default StudentList
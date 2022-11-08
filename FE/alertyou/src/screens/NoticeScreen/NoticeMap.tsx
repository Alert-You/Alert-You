import React, { useState } from 'react'
import { Center, Pressable, Text, View, Circle, Button, Modal } from 'native-base'
import { useRoute, RouteProp } from '@react-navigation/native'
import { NoticeParamList } from '@/navigations/NoticeNavigation/NoticeNavigation'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import NaverMapView, { Marker, Path } from "react-native-nmap"
import { reportType } from '@/types';
import { styles } from './style';
import { MAIN } from '@/theme/colorVariants';

type Props = {
  navigation: any
}

const NoticeMap = ({ navigation }: Props) => {
  const reportId = useRoute<RouteProp<NoticeParamList>>().params?.reportId
  const [showModal, setShowModal] = useState(true);

  const report: reportType = {
    reportId: reportId,
    noticeDateTime: '2022-11-01 23:50',
    content: '101호 강의실에서 애리가 원우를 폭행해요!',
    isVictim: false,
    location: '대전 유성구 동서대로 98-39',
    latitude: 36.35599,
    logitude: 127.29983,
  }

  const start = { latitude: 36.35523, longitude: 127.29809 }
  const end = { latitude: 36.35599, longitude: 127.29983 }
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.headerBox}>
        <Pressable onPress={() => { navigation.goBack() }}>
          <MaterialCommunityIcons
            name='arrow-left'
            size={25}
            style={styles.arrowBox}
          />
        </Pressable>
        <Center p={4}>
          <Text style={styles.textBox}>{report.isVictim ? '긴급 도움 요청' : '목격자 제보'}</Text>
        </Center>
      </View>
      <View style={{ position: 'relative' }}>
        {/* 신고 상세내역 창 */}
        <View style={styles.circleBox}>
          <Pressable onPress={() => setShowModal(true)} style={styles.circle}>
            {({
              isPressed
            }) => {
              return <Circle size="42px" bg={isPressed ? "coolGray.300" : "white"} shadow={6}>
                <Circle size="20px" bg={isPressed ? "coolGray.300" : "white"} borderColor="black" borderWidth="1">
                  <MaterialCommunityIcons
                    name='exclamation'
                    size={16}
                    color='black' />
                </Circle>
              </Circle>
            }}
          </Pressable>
          {/* 상세내역 창 모달 */}
          <Modal isOpen={showModal} onClose={() => setShowModal(false)} backdropVisible={false}>
            <Modal.Content width="90%" maxH="212" style={styles.modalBox}>
              <Modal.Body>
                <View style={styles.reportBox}>
                  <MaterialCommunityIcons
                    name='clock-time-eight-outline'
                    size={24}
                    color='black' />
                  <Text style={styles.reportTitle}>신고 일시</Text>
                  <Text>{report.noticeDateTime}</Text>
                </View>
                <View style={styles.reportBox}>
                  <MaterialCommunityIcons
                    name='map-marker-radius-outline'
                    size={24}
                    color='black' />
                  <Text style={styles.reportTitle}>신고 위치</Text>
                  <Text>{report.location}</Text>
                </View>
                {!report.isVictim && report.content &&
                  <View style={styles.reportBox}>
                    <MaterialCommunityIcons
                      name='message-processing-outline'
                      size={24}
                      color='black' />
                    <Text style={styles.reportTitle}>신고 내용</Text>
                    <Text style={styles.reportContent}>{report.content}</Text>
                  </View>
                }
              </Modal.Body>
              <Button.Group style={{ justifyContent: 'flex-end', marginTop: -30 }}>
                <Button variant="ghost" colorScheme="warning" onPress={() => {
                  setShowModal(false);
                }}>
                  <Text style={styles.closeText}>닫기</Text>
                </Button>
              </Button.Group>
            </Modal.Content>
          </Modal>
        </View>

        {/* 네이버 지도 들어가는 부분 */}
        <NaverMapView
          style={{ width: '100%', height: '100%' }}
          // 내 위치 찾기 버튼
          showsMyLocationButton={true}
          // + - 버튼으로 줌 컨드롤 하는 기능
          zoomControl={false}
          center={{
            zoom: 16,
            tilt: 0,
            latitude: (start.latitude + end.latitude) / 2,
            longitude: (start.longitude + end.longitude) / 2,
          }}>
          <Marker
            coordinate={{
              latitude: start.latitude,
              longitude: start.longitude,
            }}
            pinColor="blue"
            caption={{
              text: '지금 내 위치',
              color: 'black'
            }}
          />
          <Path
            color='blue'
            coordinates={[
              {
                latitude: start.latitude,
                longitude: start.longitude,
              },
              { latitude: end.latitude, longitude: end.longitude },
            ]}
          />
          <Marker
            coordinate={{
              latitude: end.latitude,
              longitude: end.longitude
            }}
            pinColor="red"
            caption={{
              text: '신고 위치',
              color: '#C43100'
            }}
          />
        </NaverMapView>
      </View>
    </View >
  )
}

export default NoticeMap
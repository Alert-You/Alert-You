import React, { Suspense, useState } from 'react'
import { Center, Pressable, Text, View, Circle, Button, Modal, Spinner } from 'native-base'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import NaverMapView, { Marker, Path } from "react-native-nmap"

import { useRoute, RouteProp } from '@react-navigation/native'
import { NoticeParamList } from '@/navigations/NoticeNavigation/NoticeNavigation'
import { useQuery } from '@tanstack/react-query';
import { useCurrentLocation } from '@/hooks/useCurrentLocation';


import { styles } from './style';
import { getNoticeItem } from './api';
import { Dimensions } from 'react-native';

type Props = {
  navigation: any
}



const NoticeMap = ({ navigation }: Props) => {
  const reportId = useRoute<RouteProp<NoticeParamList>>().params?.reportId
  const [showModal, setShowModal] = useState(true);

  const { location } = useCurrentLocation();
  const { data } = useQuery(['getNoticeItem'], () => getNoticeItem(reportId),
    {
      suspense: true,
      onSuccess: data => {
        // 성공시 호출
      },
      onError: e => {
        // 실패시 호출 (401, 404 같은 error가 아니라 정말 api 호출이 실패한 경우만 호출됩니다.)
        // 강제로 에러 발생시키려면 api단에서 throw Error 날립니다. (참조: https://react-query.tanstack.com/guides/query-functions#usage-with-fetch-and-other-clients-that-do-not-throw-by-default)
        console.log(e);
      }
    })
  console.log(location, data)
  const writeDay = new Date(data?.noticeDateTime + '')
  const convertDay = writeDay.getFullYear() + '년 ' + (writeDay.getMonth() + 1) + '월 ' + writeDay.getDate() + '일 ' + writeDay.getHours() + '시 ' + writeDay.getMinutes() + '분'
  // 차후에 내 위치 정보, 신고자 위치 정보로 갈아끼워야 함

  if (!location || !data) {
    return (
      <Center justifyContent="center" flex={1}>
        <Spinner size="lg" />
      </Center>
    )
  }

  return (


    <Suspense>
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
            <Text style={styles.textBox}>{data?.isVictim ? '긴급 도움 요청' : '목격자 제보'}</Text>
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
                    <Text>{convertDay}</Text>
                  </View>
                  <View style={styles.reportBox}>
                    <MaterialCommunityIcons
                      name='map-marker-radius-outline'
                      size={24}
                      color='black' />
                    <Text style={styles.reportTitle}>신고 위치</Text>
                    <Text style={styles.reportContent}>{data?.location}</Text>
                  </View>
                  {!data?.isVictim && data?.content &&
                    <View style={styles.reportBox}>
                      <MaterialCommunityIcons
                        name='message-processing-outline'
                        size={24}
                        color='black' />
                      <Text style={styles.reportTitle}>신고 내용</Text>
                      <Text style={styles.reportContent}>{data.content}</Text>
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
            style={{
              width: Dimensions.get('window').width,
              height: Dimensions.get('window').height - 110
            }}
            // 내 위치 찾기 버튼
            showsMyLocationButton={true}
            // + - 버튼으로 줌 컨드롤 하는 기능
            zoomControl={true}
            center={{
              zoom: 15,
              tilt: 0,
              latitude: (location.latitude + data.latitude) / 2,
              longitude: (location.longitude + data.longitude) / 2,
            }}>
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              pinColor="blue"
              caption={{
                text: '지금 내 위치',
                color: 'black',
              }}
            />
            <Path
              color='blue'
              coordinates={[
                {
                  latitude: location.latitude,
                  longitude: location.longitude,
                },
                { latitude: data.latitude, longitude: data.longitude },
              ]}
            />
            <Marker
              coordinate={{
                latitude: data.latitude,
                longitude: data.longitude
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
    </Suspense>
  )
}

export default NoticeMap
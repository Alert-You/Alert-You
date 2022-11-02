import React from 'react'
import { Dimensions } from 'react-native'
import { Pressable, Text, View } from 'native-base'
import { useRoute, RouteProp } from '@react-navigation/native'
import { NoticeParamList } from '@/navigations/NoticeNavigation/NoticeNavigation'
import NaverMapView, { Marker, Path } from "react-native-nmap"
type Props = {
  navigation: any
}

const NoticeMap = ({ navigation }: Props) => {
  const reportId = useRoute<RouteProp<NoticeParamList>>().params?.reportId
  const start = { latitude: 36.35523, longitude: 127.29809 }
  const end = { latitude: 36.35599, longitude: 127.29983 }
  return (
    <View>
      <Pressable onPress={() => { navigation.goBack() }}>
        <Text>알림 디테일 페이지 {reportId}</Text>
      </Pressable>
      <View
        style={{
          height: 800,
          marginTop: 10,
        }}>
        <NaverMapView
          style={{ width: '100%', height: '100%' }}
          // 내 위치 찾기 버튼
          showsMyLocationButton={true}
          // + - 버튼으로 줌 컨드롤 하는 기능
          zoomControl={false}
          center={{
            zoom: 17,
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
    </View>
  )
}

export default NoticeMap
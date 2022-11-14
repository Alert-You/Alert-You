import React, {} from 'react';
import {styles} from './style';
import {Button, Center, View} from 'native-base';
import {Image} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {HomeParamList} from '@/navigations/HomeNavigation/HomeNavigation';
import Toast from 'react-native-toast-message';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { reportFile } from '@/screens/HomeScreen/api';

interface PropsType {
  navigation: any;
}

const CameraCheckScreen = ({navigation}: PropsType) => {
  const uri = useRoute<RouteProp<HomeParamList>>().params?.uri;
  const reportImage = async (imgURI: string|undefined) => {
    const responseStatus = await reportFile(imgURI);
    if (responseStatus === 201){
      Toast.show({
        type: 'info',
        text1: '현장 사진 접수 완료',
        text2: '현장 사진 접수가 완료되었습니다!',
      });
      navigation.navigate('HomeScreen');
    } else {
      Toast.show({
        type: 'error',
        text1: '오류',
        text2: '사진 파일 접수에 실패했습니다.',
      });
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Center>
          <Image style={styles.previewImage} source={{uri}} />
        </Center>
      </View>
      <View style={styles.cameraButtonContainer}>
        <Button style={styles.reportButton} onPress={() => reportImage(uri)}>
        <MaterialCommunityIcons
          name="email-send-outline"
          size={40}
          color="white"
        />
        </Button>
      </View>
    </>
  );
};

export default CameraCheckScreen;

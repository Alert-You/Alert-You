import React, {} from 'react';
import {styles} from './style';
import {Button, Center, View} from 'native-base';
import {Image} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {HomeParamList} from '@/navigations/HomeNavigation/HomeNavigation';
import Toast from 'react-native-toast-message';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface PropsType {
  navigation: any;
}

const CameraCheckScreen = ({navigation}: PropsType) => {
  const path = useRoute<RouteProp<HomeParamList>>().params?.path;
  const uri = useRoute<RouteProp<HomeParamList>>().params?.uri;

  const reportImage = (imgURI: string | undefined) => {
    const fileURI = `file://${imgURI}}`;
    Toast.show({
      type: 'info',
      text1: '현장 촬영 접수 완료',
      text2: '현장 촬영 사진 접수가 완료되었습니다!',
    });
    navigation.navigate('HomeScreen');
  };

  return (
    <>
      <View style={styles.container}>
        <Center>
          <Image style={styles.previewImage} source={{uri}} />
        </Center>
      </View>
      <View style={styles.cameraButtonContainer}>
        <Button style={styles.reportButton} onPress={() => reportImage(path)}>
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

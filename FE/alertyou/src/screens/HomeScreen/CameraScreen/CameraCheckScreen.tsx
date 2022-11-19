import { HomeParamList } from '@/navigations/HomeNavigation/HomeNavigation';
import { RouteProp, useRoute } from '@react-navigation/native';
import { reportFile } from '@/screens/HomeScreen/api';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-toast-message';
import { Button, Center, View } from 'native-base';
import { reportImageFailureToastProps, reportImageSuccessToastProps } from '@/constants/toastProps';
import { Image } from 'react-native';
import { styles } from './style';
import { useState } from 'react';
import { LoadingView } from '@/components/LoadingView';

interface PropsType {
  navigation: any;
}

const CameraCheckScreen = ({ navigation }: PropsType) => {
  const uri = useRoute<RouteProp<HomeParamList>>().params?.uri;
  const [isLoading, setIsLoading] = useState(false);

  const reportImage = async (imgURI: string | undefined) => {
    setIsLoading(true);
    const responseStatus = await reportFile(imgURI);
    if (responseStatus === 200 || responseStatus === 201) {
      Toast.show(reportImageSuccessToastProps);
      navigation.navigate('HomeScreen');
    } else {
      Toast.show(reportImageFailureToastProps);
    }
    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      {isLoading ? <LoadingView /> : <></>}
      <Center>
        <Image style={styles.previewImage} source={{ uri }} />
      </Center>
      <View style={styles.cameraButtonContainer}>
        <Button style={styles.reportButton} onPress={() => reportImage(uri)}>
          <MaterialCommunityIcons
            name="email-send-outline"
            size={40}
            color="white"
          />
        </Button>
      </View>
    </View>
  );
};

export default CameraCheckScreen;

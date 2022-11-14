import { HomeParamList } from '@/navigations/HomeNavigation/HomeNavigation';
import { RouteProp, useRoute } from '@react-navigation/native';
import { reportFile } from '@/screens/HomeScreen/api';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-toast-message';
import { Button, Center, View } from 'native-base';
import { reportImageFailureToastProps, reportImageSuccessToastProps } from '@/constants/toastProps';
import { Image } from 'react-native';
import { styles } from './style';

interface PropsType {
  navigation: any;
}

const CameraCheckScreen = ({ navigation }: PropsType) => {
  const uri = useRoute<RouteProp<HomeParamList>>().params?.uri;
  const reportImage = async (imgURI: string | undefined) => {
    const responseStatus = await reportFile(imgURI);
    if (responseStatus === 201) {
      Toast.show(reportImageSuccessToastProps);
      navigation.navigate('HomeScreen');
    } else {
      Toast.show(reportImageFailureToastProps);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Center>
          <Image style={styles.previewImage} source={{ uri }} />
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

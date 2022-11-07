import {useState} from 'react';
import {Box, ScrollView} from 'native-base';
import {styles} from './style';

import {
  HomeTitle,
  HelpText,
  MainBtn,
  ReportBtns,
  ToggleBtn,
} from '@/screens/HomeScreen/components';
import {emergencyBgStyle, nonEmergencyBgStyle} from '@/theme/Home/gradient';

type Props = {
  navigation: any;
};

const HomeScreen = ({navigation}: Props) => {
  let [isEmergency, setIsEmergency] = useState(true);

  const toggleIsEmergency = () => {
    setIsEmergency((emergency: boolean) => !emergency);
  };

  return (
    <ScrollView style={styles.container}>
      <Box
        bg={isEmergency ? emergencyBgStyle : nonEmergencyBgStyle}
        style={styles.innerContainer}
        >
        <HomeTitle
          content={isEmergency ? '긴급 도움 요청' : '현장 목격 신고'}
        />
        <MainBtn isEmergency={isEmergency} />
        <ToggleBtn
          toggleIsEmergency={toggleIsEmergency}
          isEmergency={isEmergency}
        />
        {isEmergency ? <HelpText /> : <ReportBtns navigation={navigation}/>}
      </Box>
    </ScrollView>
  );
};

export default HomeScreen;

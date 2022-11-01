import {useState} from 'react';
import {Box, Button, ScrollView} from 'native-base';
import {
  HomeTitle,
  HelpText,
  MainBtn,
  ReportBtns,
} from '@/screens/HomeScreen/components';

type Props = {
  navigation: any;
};

const HomeScreen = ({navigation}: Props) => {
  let [isEmergency, setIsEmergency] = useState(true);

  const toggleIsEmergency = () => {
    setIsEmergency((emergency: boolean) => !emergency);
  };

  const emergencyBgStyle = {
    linearGradient: {
      colors: ['#250704', '#FF7843'],
      start: [0, 0],
      end: [1, 1],
    },
  };

  const nonEmergencyBgStyle = {
    linearGradient: {
      colors: ['#7979F7', '#202A43'],
      start: [0, 0],
      end: [1, 1],
    },
  };

  return (
    <>
      <ScrollView>
        <Box
          bg={isEmergency ? emergencyBgStyle : nonEmergencyBgStyle}
          p="6"
          pt="10"
          height="100%">
          <HomeTitle
            content={isEmergency ? '긴급 도움 요청' : '현장 목격 신고'}
          />
          <MainBtn />
          <Button onPress={toggleIsEmergency}>Click Me</Button>
          {isEmergency ? <HelpText /> : <ReportBtns />}
        </Box>
      </ScrollView>
    </>
  );
};

export default HomeScreen;

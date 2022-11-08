import {Text} from 'react-native';
import React from 'react';
import {styles} from './style';
import {Center, Divider, VStack} from 'native-base';

const HelpText = () => {
  const titleStyle = {
    fontSize: '20',
    fontWeight: 'bold',
    color: 'white',
  }

  const paragraphStyle = {
    fontSize: '15',
    color: 'white',
  }
  return (
    <>
      <Center>
        <VStack style={styles.helpText} width="100%">
          <Center
            _text={titleStyle}>
            이용 안내
          </Center>
          <Divider my="2" thickness="1" bg="white" />
          <Center
            _text={paragraphStyle}>
            위 버튼을 클릭하면 즉시 신고가 접수됩니다.
          </Center>
          <Center
            _text={paragraphStyle}>
            보디가드와 선생님에게 알림이 발송됩니다.
          </Center>
          <Center
            _text={paragraphStyle}>
            신고가 접수되면 녹음 기능이 활성화 됩니다.
          </Center>
        </VStack>
      </Center>
    </>
  );
};

export default HelpText;

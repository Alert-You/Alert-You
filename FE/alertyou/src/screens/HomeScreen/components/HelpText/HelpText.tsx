import { Center, Text, VStack } from 'native-base';
import React from 'react';
import { styles } from './style';
import { helpTextStyle } from '@/theme/Home/gradient';

const HelpText = () => {

  return (
    <Center>
      <VStack style={styles.container} alignItems="center" bg={helpTextStyle} >
        <Text style={styles.title}>이용 안내</Text>
        <Text style={styles.paragraph}>
          위 버튼을 클릭하면 즉시 신고가 접수됩니다.
        </Text>
        <Text style={styles.paragraph}>
          보디가드와 선생님에게 알림이 발송됩니다.
        </Text>
        <Text style={styles.paragraph}>
          신고가 접수되면 녹음 기능이 활성화됩니다.
        </Text>
        <Text style={styles.paragraph}>
          녹음 시간은 최대 3분이며, 초과하면 자동저장됩니다.
        </Text>
      </VStack>
    </Center>
  );
};

export default HelpText;

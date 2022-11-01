import { View, Text, Pressable } from 'react-native'
import React from 'react'

import { styles } from './style';
import { LogoImage, SpinnerButton } from '@/components';
import { CloseIcon, FormControl, Input, Stack } from 'native-base';
import { MAIN } from '@/theme/colorVariants';

type Props = {}

const PhoneAuthScreen = (props: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <LogoImage />
      </View>
      <View style={styles.formContainer}>
        <View style={styles.infoTextContainer}>
          <Text style={styles.infoText}>휴대폰 인증을 진행하세요</Text>
        </View>
        <View style={styles.formsList}>
          <Stack space={4}>
            <FormControl isRequired>
              <FormControl.Label>휴대폰 번호</FormControl.Label>
              <Input
                variant="underlined"
                placeholder="010xxxx0000"
                keyboardType="numeric"
                size="md"
                h="9"
                color={MAIN.mainFont}
                focusOutlineColor={MAIN.red}
                InputRightElement={
                  <Pressable onPress={()=>{}}>
                    {/* {state.phone ? <CloseIcon color={MAIN.red} /> : null} */}
                  </Pressable>
                }
                onChangeText={()=> {}}
                autoCorrect={false}
                // value={state.phone}
              />
            </FormControl>
          </Stack>
          <SpinnerButton onPress={()=> {}}>다음</SpinnerButton>
        </View>
      </View>
    </View>
  );
}

export default PhoneAuthScreen
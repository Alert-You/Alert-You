import {View, Text, Pressable, Dimensions} from 'react-native';
import React from 'react';
import {
  Center,
  CloseIcon,
  FormControl,
  HStack,
  Input,
  SearchIcon,
  Stack,
} from 'native-base';
import {useRecoilState} from 'recoil';

import {LogoImage, SpinnerButton} from '@/components';
import {MAIN} from '@/theme/colorVariants';
import {schoolState} from '@/store/signUpState';

import {styles} from './style';
import {formIsNotFilled} from './functions';

const SignUpScreen = ({navigation}: any) => {
  const [school, setSchool] = useRecoilState(schoolState);

  const changeGrade = (e: string): void => {
    setSchool(state => {
      return {...state, grade: e.trim()};
    });
  };

  const changeClass = (e: string): void => {
    setSchool(state => {
      return {...state, class: e.trim()};
    });
  };

  const deleteGrade = (): void => {
    setSchool(state => {
      return {...state, grade: ''};
    });
  };

  const deleteClass = (): void => {
    setSchool(state => {
      return {...state, class: ''};
    });
  };

  const moveToSearchSchool = (): void => {
    navigation.navigate('SignUp', {
      screen: 'searchSchoolScreen',
    });
  };

  const moveToNextPage = (): void => {
    if (school.class && school.school && school.grade) {
      navigation.navigate('SignUp', {
        screen: 'SignUpSubScreen',
      });
    } else {
      formIsNotFilled();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <LogoImage />
      </View>
      <View style={styles.formContainer}>
        <View style={styles.infoTextContainer}>
          <Text style={styles.infoText}>학교 정보를 입력하세요.</Text>
        </View>
        <View style={styles.formsList}>
          <Stack space={4}>
            <FormControl isRequired>
              <FormControl.Label>학교 검색</FormControl.Label>
              <Pressable onPress={moveToSearchSchool}>
                <Input
                  type="text"
                  variant="underlined"
                  editable={false}
                  placeholder="ex) 싸피고등학교"
                  size="md"
                  h="9"
                  color={MAIN.mainFont}
                  focusOutlineColor={MAIN.red}
                  InputRightElement={
                    <Pressable onPress={moveToSearchSchool}>
                      <SearchIcon size="md" />
                    </Pressable>
                  }
                  autoCorrect={false}
                  value={school.school}
                />
              </Pressable>
            </FormControl>
            <HStack justifyContent="space-between">
              <Center w={(Dimensions.get('window').width - 32) / 2 - 20}>
                <FormControl isRequired>
                  <FormControl.Label>학년</FormControl.Label>
                  <Input
                    type="text"
                    variant="underlined"
                    keyboardType="numeric"
                    maxLength={2}
                    placeholder="ex) 1"
                    size="md"
                    h="9"
                    color={MAIN.mainFont}
                    focusOutlineColor={MAIN.red}
                    InputRightElement={
                      <Pressable onPress={deleteGrade}>
                        {school.grade ? <CloseIcon color={MAIN.red} /> : null}
                      </Pressable>
                    }
                    onChangeText={changeGrade}
                    autoCorrect={false}
                    value={school.grade}
                  />
                </FormControl>
              </Center>
              <Center w={(Dimensions.get('window').width - 32) / 2 - 20}>
                <FormControl isRequired>
                  <FormControl.Label>반</FormControl.Label>
                  <Input
                    type="text"
                    variant="underlined"
                    keyboardType="numeric"
                    maxLength={2}
                    placeholder="ex) 2"
                    size="md"
                    h="9"
                    color={MAIN.mainFont}
                    focusOutlineColor={MAIN.red}
                    InputRightElement={
                      <Pressable onPress={deleteClass}>
                        {school.class ? <CloseIcon color={MAIN.red} /> : null}
                      </Pressable>
                    }
                    onChangeText={changeClass}
                    autoCorrect={false}
                    value={school.class}
                  />
                </FormControl>
              </Center>
            </HStack>
          </Stack>
          <View style={styles.spinnerButtonStyle}>
            <SpinnerButton onPress={moveToNextPage}>다음</SpinnerButton>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SignUpScreen;

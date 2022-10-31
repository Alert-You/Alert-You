import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {LogoImage, SpinnerButton} from '@/components';
import {styles} from './style';
import {
  Center,
  CloseIcon,
  FormControl,
  HStack,
  Input,
  SearchIcon,
  Stack,  
} from 'native-base';
import {MAIN} from '@/theme/colorVariants';
import {Dimensions} from 'react-native';
import {useRecoilState} from 'recoil';
import {schoolState} from '@/store/signUpState';

const SignUpScreen = ({navigation}:any) => {
  const [school, setSchool] = useRecoilState(schoolState);

  const changeGrade = (e: string): void => {
    setSchool(state => {
      return {...state, grade: e};
    });
  };

  const changeClass = (e: string): void => {
    setSchool(state => {
      return {...state, class: e};
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
      screen: 'searchSchoolScreen'
    });
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
          <SpinnerButton onPress={() => {}}>다음</SpinnerButton>
        </View>
      </View>
    </View>
  );
};

export default SignUpScreen;

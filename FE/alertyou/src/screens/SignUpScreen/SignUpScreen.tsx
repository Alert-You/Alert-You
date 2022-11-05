import {View, Text, Pressable, Dimensions} from 'react-native';
import React, {useMemo, useState} from 'react';
import {
  Center,
  CloseIcon,
  FormControl,
  HStack,
  Input,
  SearchIcon,
  Select,
  Stack,
} from 'native-base';
import {useRecoilState, useRecoilValue} from 'recoil';

import {LogoImage, SpinnerButton} from '@/components';
import {MAIN} from '@/theme/colorVariants';
import {classListState, schoolState} from '@/store/signUpState';

import {styles} from './style';
import {formIsNotFilled} from './functions';

const SignUpScreen = ({navigation}: any) => {
  const [grade, setGrade] = useState<string>('');
  const [classroom, setClassroom] = useState<string>('');
  const schoolValue = useRecoilValue(schoolState);
  const [school, setSchool] = useRecoilState(schoolState);
  // const classList = useRecoilValue(classListState);
  const classList: string[][] = [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ['1', '2', '3', '4', '5', '6'],
    ['믿음', '소망', '사랑', '기쁨', '행복', '희망'],
  ];
  const hasChosenSchool = useMemo(() => classList.length !== 0, [classList]);
  const hasChosenGrade = useMemo(() => !!grade, [grade])
  const moveToSearchSchool = (): void => {
    navigation.navigate('SignUp', {
      screen: 'searchSchoolScreen',
    });
  };

  const chooseGrade = (e:string): void => {
    setGrade(e);
  }
  
  const chooseClassroom = (e: string): void => {
    setClassroom(e)
  }

  const moveToNextPage = (): void => {
    if (school.address && school.name) {
      navigation.navigate('SignUp', {
        screen: 'SignUpSubScreen',
      });
    } else {
      formIsNotFilled();
    }
  };

  console.log(!schoolValue.name)

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
                  value={school.name}
                />
              </Pressable>
            </FormControl>
            <HStack justifyContent="space-between">
              <Center w={(Dimensions.get('window').width - 32) / 2 - 20}>
                <FormControl isRequired>
                  <FormControl.Label>학년</FormControl.Label>
                  <Select
                    isDisabled={!hasChosenSchool || !schoolValue.name}
                    selectedValue={grade}
                    accessibilityLabel="학년을 선택하세요"
                    placeholder="학년"
                    placeholderTextColor={MAIN.mainFont}
                    onValueChange={chooseGrade}
                    _selectedItem={{
                      bg: MAIN.red,
                    }}>
                    {hasChosenSchool
                      ? classList.map((item, idx) => {
                          return (
                            <Select.Item
                              key={`gradeItemKey${idx}`}
                              label={`${idx + 1}학년`}
                              value={String(idx+1)}
                            />
                          );
                        })
                      : null}
                  </Select>
                </FormControl>
              </Center>
              <Center w={(Dimensions.get('window').width - 32) / 2 - 20}>
                <FormControl isRequired>
                  <FormControl.Label>반</FormControl.Label>
                  <Select
                    isDisabled={!hasChosenGrade}
                    selectedValue={classroom}
                    accessibilityLabel="반을 선택하세요"
                    placeholder="반"
                    placeholderTextColor={MAIN.mainFont}
                    onValueChange={chooseClassroom}
                    _selectedItem={{
                      bg: MAIN.red,
                    }}>
                    {hasChosenGrade ? classList[parseInt(grade)-1].map((item, idx) => {
                      return (
                        <Select.Item
                          key={`classItemKey${idx}`}
                          label={`${item}반`}
                          value={item}
                        />
                      );
                    }): null}
                  </Select>
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

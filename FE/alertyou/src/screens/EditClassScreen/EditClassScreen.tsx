import React, { Suspense, useMemo, useState } from 'react';
import { View } from 'react-native';
import { Center, FormControl, Select, Spinner, VStack } from 'native-base';
import { MAIN } from '@/theme/colorVariants';
import { styles } from './style';
import { failedFetchSchoolId, formIsNotFilled } from './functions';
import {
  editClassListState,
  editSchoolAddressState,
  editSchoolIdState,
  editSchoolNameState,
} from '@/store/profileState';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useQuery } from '@tanstack/react-query';
import { requestSchoolId } from './apis';
import { SpinnerButton } from '@/components';
import ErrorBoundary from 'react-native-error-boundary';

const EditClassScreen = ({ navigation }: any) => {
  const [grade, setGrade] = useState<string>('');
  const [classroom, setClassroom] = useState<string>('');
  const [schoolNameValue, setSchoolNameValue] =
    useRecoilState(editSchoolNameState);
  const schoolAddressValue = useRecoilValue(editSchoolAddressState);
  const classList = useRecoilValue(editClassListState);
  const setSchoolId = useSetRecoilState(editSchoolIdState);

  const hasChosenSchool = useMemo(() => classList.length !== 0, [classList]);
  const hasChosenGrade = useMemo(
    () => grade && !!classList[parseInt(grade)],
    [grade],
  );
  const formIsFilled =
    schoolAddressValue && schoolNameValue && grade && classroom;

  const { refetch } = useQuery(
    ['editSchoolIdKey'],
    () =>
      requestSchoolId(schoolNameValue, grade, classroom, schoolAddressValue),
    {
      suspense: true,
      enabled: false,
      cacheTime: 0,
      onSuccess: schoolIdData => {
        setSchoolId(String(schoolIdData.schoolId));
        moveToNextForm();
      },
      onError: () => {
        failedFetchSchoolId();
      },
    },
  );

  const moveToNextForm = (): void => {
    navigation.navigate('Profile', {
      screen: 'ProfileEditScreen',
    });
  };

  const chooseGrade = (e: string): void => {
    setGrade(e);
  };

  const chooseClassroom = (e: string): void => {
    setClassroom(e);
  };

  const moveToEditProfile = (): void => {
    if (formIsFilled) {
      refetch();
      setSchoolNameValue(state => state + ` ${grade}학년 ${classroom}반`);
    } else {
      formIsNotFilled();
    }
  };

  return (
    <Suspense fallback={<Spinner color={MAIN.red} size="lg" />}>
      <ErrorBoundary>
        <View style={styles.container}>
          <VStack>
            <Center mt={2}>
              <FormControl isRequired>
                <FormControl.Label>학년</FormControl.Label>
                <Select
                  isDisabled={!hasChosenSchool || !schoolNameValue}
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
                        if (idx === 0) return;
                        return (
                          <Select.Item
                            key={`gradeItem${idx}`}
                            label={`${idx}학년`}
                            value={String(idx)}
                          />
                        );
                      })
                    : null}
                </Select>
              </FormControl>
            </Center>
            <Center mt={2}>
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
                  {hasChosenGrade
                    ? classList[parseInt(grade)].map((item, idx) => {
                        return (
                          <Select.Item
                            key={`classItem${idx}`}
                            label={`${item}반`}
                            value={item}
                          />
                        );
                      })
                    : null}
                </Select>
              </FormControl>
              <View style={styles.spinnerButtonStyle}>
                <SpinnerButton onPress={moveToEditProfile}>완료</SpinnerButton>
              </View>
            </Center>
          </VStack>
        </View>
      </ErrorBoundary>
    </Suspense>
  );
};

export default EditClassScreen;

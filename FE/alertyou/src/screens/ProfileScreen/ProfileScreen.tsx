import { View, Text, Alert, ScrollView, TouchableOpacity } from 'react-native';
import React, { Suspense, useEffect, useMemo } from 'react';
import {
  Avatar,
  Spinner,
  Divider,
  ChevronRightIcon,
  Center,
} from 'native-base';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useIsFocused } from '@react-navigation/native';
import ErrorBoundary from 'react-native-error-boundary';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSetRecoilState } from 'recoil';

import { CustomSpinner } from '@/screens/ProfileScreen';
import { MAIN, WHITE, BLUE, RED } from '@/theme/colorVariants';
import { ProfileInfo } from '@/screens/ProfileScreen';
import { getToken } from '@/utils/auth';
import { useLogout } from '@/hooks';
import {
  editPasswordConfirmState,
  editPhoneState,
  editSchoolNameState,
  profileFormState,
} from '@/store/profileState';

import { styles } from './style';
import { requestAccountInfo, requestUserProfile } from './apis';
import { profileResponseType } from './types';
import Lottie from 'lottie-react-native';
import LinearGradient from 'react-native-linear-gradient';

const ProfileScreen = ({ navigation }: any) => {
  const isFocused = useIsFocused();
  const setProfileForm = useSetRecoilState(profileFormState);
  const setSchoolName = useSetRecoilState(editSchoolNameState);
  const setPassword2 = useSetRecoilState(editPasswordConfirmState);
  const setPhone = useSetRecoilState(editPhoneState);
  const { mutate } = useLogout();
  const userQuery = useQuery<profileResponseType, AxiosError>(
    ['accountInfo'],
    requestAccountInfo,
    {
      suspense: true,
      onSuccess: res => {
        console.log(res);
        setProfileForm({
          username: res.name,
          phone: res.phone,
          schoolId: res.schoolId,
          password: '',
        });
        setPassword2('');
        setSchoolName(res.schoolName);
        setPhone(res.phone);
      },
      refetchOnMount: true,
    },
  );
  const { data, refetch } = useQuery<profileResponseType, AxiosError>(
    ['userProfile'],
    requestUserProfile,
    { suspense: true, refetchOnMount: true },
  );

  useEffect(() => {
    userQuery.refetch();
    refetch();
  }, [isFocused]);

  const isTeacher = useMemo(() => data?.role === '??????', [data?.role]);

  const moveToTeacherScreen = (): void => {
    if (isTeacher) {
      navigation.navigate('TeacherScreen');
    } else {
      Alert.alert('?????? ?????? ??????', '?????? ????????? ????????????.', [
        {
          text: '??????',
        },
      ]);
    }
  };

  const moveToProfileEdit = (): void => {
    navigation.navigate('ProfileEditScreen');
  };

  const moveToPrivacy = (): void => {
    navigation.navigate('PrivacyScreen');
  };
  const moveToServiceAgree = (): void => {
    navigation.navigate('ServiceAgreeScreen');
  };

  const logoutHandler = (): void => {
    getToken().then(res => {
      if (res) {
        mutate(res);
      }
    });
  };

  const confirmLogout = (): void => {
    Alert.alert('????????????', '????????? ???????????? ???????????????????', [
      {
        text: '??????',
      },
      {
        text: '????????????',
        style: 'cancel',
        onPress: () => logoutHandler(),
      },
    ]);
  };

  return (
    <>
      <LinearGradient
        colors={[BLUE.blue400, RED.red300p]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.8, y: 1 }}
        style={{ width: '100%', height: '100%' }}>
        <ScrollView style={styles.container}>
          <View style={styles.profileContainer}>
            <View style={styles.avatarFlex}>
              <Avatar
                bg={WHITE.white}
                size="lg"
                shadow={5}
                justifyContent="center"
                alignItems="center">
                <Lottie
                  source={require('@/assets/cat.json')}
                  autoPlay
                  loop={true}
                />
              </Avatar>
              <View style={styles.contentMargin}>
                <Suspense fallback={<Spinner color={MAIN.red} size="md" />}>
                  <ErrorBoundary FallbackComponent={CustomSpinner}>
                    <ProfileInfo
                      name={data?.name}
                      schoolName={data?.schoolName}
                      role={data?.role}
                      phone={data?.phone}
                    />
                  </ErrorBoundary>
                </Suspense>
              </View>
            </View>
          </View>
          <Divider h="4" bgColor={MAIN.lightGrey} />
          <View style={styles.teacherButton}>
            {isTeacher ? (
              <>
                <Text style={styles.buttonText}>?????? ??????</Text>
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={moveToTeacherScreen}>
                  <View style={styles.categoryItem}>
                    <View style={styles.categoryIcon}>
                      <MaterialCommunityIcons
                        name="school-outline"
                        size={24}
                        color={MAIN.mainFont}
                      />
                      <Text style={styles.categoryText}>?????? ?????? ??????</Text>
                    </View>
                    <ChevronRightIcon size="sm" />
                  </View>
                </TouchableOpacity>
                <Center mt={4}>
                  <Divider w="94%" />
                </Center>
              </>
            ) : null}
            <Text style={styles.accountText}>?????? ??? ??????</Text>
            <View>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={moveToServiceAgree}>
                <View style={styles.categoryItem}>
                  <View style={styles.categoryIcon}>
                    <MaterialCommunityIcons
                      name="file-document-multiple-outline"
                      size={24}
                      color={MAIN.mainFont}
                    />
                    <Text style={styles.categoryText}>????????????</Text>
                  </View>
                  <ChevronRightIcon size="sm" />
                </View>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.6} onPress={moveToPrivacy}>
                <View style={styles.categoryItem}>
                  <View style={styles.categoryIcon}>
                    <MaterialCommunityIcons
                      name="shield-account-outline"
                      size={24}
                      color={MAIN.mainFont}
                    />
                    <Text style={styles.categoryText}>???????????? ????????????</Text>
                  </View>
                  <ChevronRightIcon size="sm" />
                </View>
              </TouchableOpacity>
              <Center mt={4}>
                <Divider w="94%" />
              </Center>
            </View>
            <Text style={styles.accountText}>?????? ??????</Text>
            <View>
              <TouchableOpacity activeOpacity={0.6} onPress={moveToProfileEdit}>
                <View style={styles.categoryItem}>
                  <View style={styles.categoryIcon}>
                    <MaterialCommunityIcons
                      name="account-edit-outline"
                      size={24}
                      color={MAIN.mainFont}
                    />
                    <Text style={styles.categoryText}>?????? ?????? ??????</Text>
                  </View>
                  <ChevronRightIcon size="sm" />
                </View>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.6} onPress={confirmLogout}>
                <View style={styles.categoryItem}>
                  <View style={styles.categoryIcon}>
                    <MaterialCommunityIcons
                      name="logout"
                      size={24}
                      color={MAIN.mainFont}
                    />
                    <Text style={styles.categoryText}>????????????</Text>
                  </View>
                  <ChevronRightIcon size="sm" />
                </View>
              </TouchableOpacity>
              <Center mt={4}>
                <Divider w="94%" />
              </Center>
            </View>
            <Text style={styles.accountText}>??? ??????</Text>
            <View>
              <View style={styles.categoryItem}>
                <View style={styles.categoryIcon}>
                  <MaterialCommunityIcons
                    name="layers-triple-outline"
                    size={24}
                    color={MAIN.mainFont}
                  />
                  <Text style={styles.categoryText}>????????????</Text>
                </View>
                <Text style={styles.versionText}>1.0.2</Text>
              </View>
              <Center mt={4}>
                <Divider w="94%" />
              </Center>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </>
  );
};

export default ProfileScreen;

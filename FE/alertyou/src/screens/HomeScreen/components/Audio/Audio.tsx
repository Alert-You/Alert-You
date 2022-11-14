import {Box, Button, Pressable, Text, View, VStack} from 'native-base';
import React, {Component, useEffect, useState} from 'react';
import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSet,
  AudioSourceAndroidType,
  PlayBackType,
  RecordBackType,
} from 'react-native-audio-recorder-player';
import {Platform, PermissionsAndroid, Dimensions} from 'react-native';
import Toast from 'react-native-toast-message';
import {styles} from './style';
import {AudioBtn} from '../AudioBtn';
import {emergencyBgStyle, nonEmergencyBgStyle} from '@/theme/Home/gradient';
import { reportFile } from '../../api';

interface AudioProps {
  navigation: any;
  isEmergency: boolean;
}

interface AudioState {
  isLoggingIn: boolean;
  recordSecs: number;
  recordTime: string;
  currentPositionSec: number;
  currentDurationSec: number;
  playTime: string;
  duration: string;
  page: number;
  path: string;
  uri: string;
  navigation: any;

  isShowStartRecord: boolean;
  isShowPauseRecord: boolean;
  isShowResumeRecord: boolean;
  isShowStopRecord: boolean;

  isShowStartPlay: boolean;
  isShowPausePlay: boolean;
  isShowResumePlay: boolean;
  isShowStopPlay: boolean;
}

const screenWidth = Dimensions.get('screen').width;

class Audio extends Component<AudioProps, AudioState> {
  private audioRecorderPlayer: AudioRecorderPlayer;

  constructor(props: AudioProps) {
    super(props);
    this.state = {
      isLoggingIn: false,
      recordSecs: 0,
      recordTime: '00:00:00',
      currentPositionSec: 0,
      currentDurationSec: 0,
      playTime: '00:00:00',
      duration: '00:00:00',
      page: 0,
      path: '',
      uri: '',
      navigation: props.navigation,

      isShowStartRecord: true,
      isShowPauseRecord: false,
      isShowResumeRecord: false,
      isShowStopRecord: false,

      isShowStartPlay: true,
      isShowPausePlay: false,
      isShowResumePlay: false,
      isShowStopPlay: false,
    };
    this.audioRecorderPlayer = new AudioRecorderPlayer();
    this.audioRecorderPlayer.setSubscriptionDuration(0.11);
    if (this.props.isEmergency) {
      this.onStartRecord();
    }
  }

  private onStatusPress = (e: any) => {
    const touchX = e.nativeEvent.locationX;
    const playWidth =
      (this.state.currentPositionSec / this.state.currentDurationSec) *
      (screenWidth - 32);

    const currentPosition = Math.round(this.state.currentPositionSec);

    if (playWidth && playWidth < touchX) {
      const addSecs = Math.round(currentPosition + 1000);
      this.audioRecorderPlayer.seekToPlayer(addSecs);
    } else {
      const subSecs = Math.round(currentPosition - 1000);
      this.audioRecorderPlayer.seekToPlayer(subSecs);
    }
  };

  private onStartRecord = async () => {
    if (Platform.OS === 'android') {
      try {
        const grants = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ]);

        console.log('write external storage', grants);

        if (
          grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.READ_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.RECORD_AUDIO'] ===
            PermissionsAndroid.RESULTS.GRANTED
        ) {
          console.log('permissions granted');
        } else {
          console.log('All required permissions not granted');
          return;
        }
      } catch (err) {
        console.warn(err);
        return;
      }
    }

    const audioSet: AudioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,
      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.aac,
    };

    const date = new Date().getTime();
    const path = `data/user/0/com.alertyou/cache/${date}.mp4`;
    this.setState({path});

    const uri = await this.audioRecorderPlayer.startRecorder(
      this.state.path,
      audioSet,
    );
    this.setState({uri});
    this.setState({
      isShowStartRecord: false,
      isShowPauseRecord: true,
      isShowStopRecord: true,
    });

    this.audioRecorderPlayer.addRecordBackListener((e: RecordBackType) => {
      this.setState({
        recordSecs: e.currentPosition,
        recordTime: this.audioRecorderPlayer.mmssss(
          Math.floor(e.currentPosition),
        ),
      });
      if (this.state.recordSecs > 180000) {
        this.onStopRecord();
      }
    });
  };

  private onPauseRecord = async () => {
    try {
      await this.audioRecorderPlayer.pauseRecorder();
    } catch (err) {
      console.log('pauseRecord', err);
    }

    this.setState({
      isShowPauseRecord: false,
      isShowResumeRecord: true,
    });
  };

  private onResumeRecord = async () => {
    await this.audioRecorderPlayer.resumeRecorder();
    this.setState({
      isShowResumeRecord: false,
      isShowPauseRecord: true,
    });
  };

  private onStopRecord = async () => {
    const result = await this.audioRecorderPlayer.stopRecorder();
    this.audioRecorderPlayer.removeRecordBackListener();
    if (this.props.isEmergency) {
      this.onReportAudio();
    }
    this.setState({
      recordSecs: 0,
    });
    this.setState({
      playTime: '00:00:00',
      duration: this.state.recordTime,
      page: 1,
    });
  };

  private onStartPlay = async () => {
    this.onStopPlay();
    const msg = await this.audioRecorderPlayer.startPlayer(this.state.path);
    const volume = await this.audioRecorderPlayer.setVolume(1.0);
    console.log(`file: ${msg}`, `volume: ${volume}`);
    this.setState({
      isShowStartPlay: false,
      isShowPausePlay: true,
      // isShowStopPlay: true,
    });

    this.audioRecorderPlayer.addPlayBackListener((e: PlayBackType) => {
      if (e.currentPosition === e.duration) {
        console.log('finished');
        this.audioRecorderPlayer.stopPlayer();
        this.setState({
          isShowStartPlay: true,
          isShowPausePlay: false,
        });
      }
      this.setState({
        currentPositionSec: e.currentPosition,
        currentDurationSec: e.duration,
        playTime: this.audioRecorderPlayer.mmssss(
          Math.floor(e.currentPosition),
        ),
        duration: this.audioRecorderPlayer.mmssss(Math.floor(e.duration)),
      });
    });
  };

  private onPausePlay = async () => {
    await this.audioRecorderPlayer.pausePlayer();
    this.setState({
      isShowPausePlay: false,
      isShowStartPlay: true,
      isShowResumePlay: true,
    });
  };

  private onResumePlay = async () => {
    await this.audioRecorderPlayer.resumePlayer();
    this.setState({
      isShowResumePlay: false,
      isShowPausePlay: true,
      isShowStartPlay: true,
    });
  };

  private onStopPlay = async () => {
    this.audioRecorderPlayer.stopPlayer();
    this.audioRecorderPlayer.removePlayBackListener();
  };

  private onRestartRecord = () => {
    this.setState({
      isLoggingIn: false,
      recordSecs: 0,
      recordTime: '00:00:00',
      currentPositionSec: 0,
      currentDurationSec: 0,
      playTime: '00:00:00',
      duration: '00:00:00',
      page: 0,
      path: '',
      uri: '',

      isShowStartRecord: true,
      isShowPauseRecord: false,
      isShowResumeRecord: false,
      isShowStopRecord: false,

      isShowStartPlay: true,
      isShowPausePlay: false,
      isShowResumePlay: false,
      isShowStopPlay: false,
    });
  };

  private onReportAudio = async () => {
    if (this.state.uri) {
      const responseStatus = await reportFile(this.state.uri);
      if (responseStatus === 201) {
        Toast.show({
          type: 'info',
          text1: '현장 녹음 접수 완료',
          text2: '현장 녹음 접수가 완료되었습니다!',
        });
        this.state.navigation.navigate('HomeScreen');
      }
    } else {
      Toast.show({
        type: 'error',
        text1: '오류',
        text2: '녹취 파일 접수에 실패했습니다.',
      });
    }
  };

  public render() {
    let playWidth =
      (this.state.currentPositionSec / this.state.currentDurationSec) *
      (screenWidth-32-56);

    if (!playWidth) {
      playWidth = 0;
    }

    // props
    const startRecordProps = {
      name: 'record',
      onPress: this.onStartRecord,
      isShow: this.state.isShowStartRecord,
    };
    const pauseRecordProps = {
      name: 'pause',
      onPress: this.onPauseRecord,
      isShow: this.state.isShowPauseRecord,
    };
    const resumeRecordProps = {
      // name: 'redo',
      name: 'record',
      onPress: this.onResumeRecord,
      isShow: this.state.isShowResumeRecord,
    };
    const stopRecordProps = {
      name: 'stop',
      onPress: this.onStopRecord,
      isShow: this.state.isShowStopRecord,
    };

    const startPlayProps = {
      name: 'play',
      onPress: this.onStartPlay,
      isShow: this.state.isShowStartPlay,
    };
    const pausePlayProps = {
      name: 'pause',
      onPress: this.onPausePlay,
      isShow: this.state.isShowPausePlay,
    };
    const resumePlayProps = {
      name: 'redo',
      // name: 'play',
      onPress: this.onResumePlay,
      isShow: this.state.isShowResumePlay,
    };
    const stopPlayProps = {
      name: 'stop',
      onPress: this.onStopPlay,
      isShow: this.state.isShowStopPlay,
    };

    const restartRecordProps = {
      name: 'refresh',
      onPress: this.onRestartRecord,
      isShow: true,
    };
    const reportAudioProps = {
      name: 'email-send-outline',
      onPress: this.onReportAudio,
      isShow: true,
    };

    // if(this.props.isEmergency) {
    //   this.onStartRecord();
    // }

    return (
      <View style={styles.container}>
        <VStack bg={this.props.isEmergency ? emergencyBgStyle : nonEmergencyBgStyle} style={styles.innerContainer}>
          {/* <Text style={styles.titleTxt}>
            {!this.state.page ? '녹음' : '녹음 확인'}
          </Text> */}
          {!this.state.page ? (
            <View style={styles.viewRecorder}>
              <Text style={styles.counterTxt}>{this.state.recordTime}</Text>
              <View style={styles.btnWrapper}>
                <AudioBtn props={startRecordProps} />
                <AudioBtn props={pauseRecordProps} />
                <AudioBtn props={resumeRecordProps} />
                <AudioBtn props={stopRecordProps} />
              </View>
            </View>
          ) : (
            <View style={styles.viewPlayer}>
              <Pressable
                style={styles.viewBarWrapper}
                onPress={this.onStatusPress}>
                <View style={styles.viewBar}>
                  <View style={[styles.viewBarPlay, {width: playWidth}]} />
                </View>
              </Pressable>

              <Text style={styles.counterTxt}>{this.state.playTime}</Text>
              <Text style={styles.counterTxt}>/ {this.state.duration}</Text>
              
              <View style={styles.btnWrapper}>
              <AudioBtn props={startPlayProps} />
                <AudioBtn props={pausePlayProps} />
                <AudioBtn props={resumePlayProps} />
                <AudioBtn props={stopPlayProps} />
                <AudioBtn props={restartRecordProps} />
                <AudioBtn props={reportAudioProps} />
              </View>
            </View>
          )}
        </VStack>
      </View>
    );
  }
}

export default Audio;

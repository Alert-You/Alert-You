import {Button, Divider, Pressable, Text, View} from 'native-base';
import React, {Component} from 'react';
import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSet,
  AudioSourceAndroidType,
  PlayBackType,
  RecordBackType,
} from 'react-native-audio-recorder-player';
import { Platform, PermissionsAndroid, Dimensions } from 'react-native';
import {styles} from './style';

interface AudioProps {
  navigation: any;
}

interface AudioState {
  isLoggingIn: boolean;
  recordSecs: number;
  recordTime: string;
  currentPositionSec: number;
  currentDurationSec: number;
  playTime: string;
  duration: string;
  path: string;
  navigation: any;
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
      path: '',
      navigation: props.navigation,
    };
    this.audioRecorderPlayer = new AudioRecorderPlayer();
    this.audioRecorderPlayer.setSubscriptionDuration(0.09);
  }

  private onStatusPress = (e: any) => {
    const touchX = e.nativeEvent.locationX;
    const playWidth =
      (this.state.currentPositionSec / this.state.currentDurationSec) *
      (screenWidth - 56);

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
    this.setState({
      path: `data/user/0/com.alertyou/cache/${date}.mp4`
    })
    const uri = await this.audioRecorderPlayer.startRecorder(this.state.path, audioSet);

    this.audioRecorderPlayer.addRecordBackListener((e: RecordBackType) => {
      this.setState({
        recordSecs: e.currentPosition,
        recordTime: this.audioRecorderPlayer.mmssss(
          Math.floor(e.currentPosition),
        ),
      });
    });
  };

  private onPauseRecord = async () => {
    try {
      await this.audioRecorderPlayer.pauseRecorder();
    } catch (err) {
      console.log('pauseRecord', err);
    }
  };

  private onResumeRecord = async () => {
    await this.audioRecorderPlayer.resumeRecorder();
  };

  private onStopRecord = async () => {
    const result = await this.audioRecorderPlayer.stopRecorder();
    this.audioRecorderPlayer.removeRecordBackListener();
    this.setState({
      recordSecs: 0,
    });
    console.log(result);
  };

  onStartPlay = async () => {
    const msg = await this.audioRecorderPlayer.startPlayer(this.state.path);
    const volume = await this.audioRecorderPlayer.setVolume(1.0);
    console.log(`file: ${msg}`, `volume: ${volume}`);
    
    this.audioRecorderPlayer.addPlayBackListener((e: PlayBackType) => {
      if (e.currentPosition === e.duration) {
        console.log('finished');
        this.audioRecorderPlayer.stopPlayer();
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
  };

  private onResumePlay = async () => {
    await this.audioRecorderPlayer.resumePlayer();
  };

  private onStopPlay = async () => {
    this.audioRecorderPlayer.stopPlayer();
    this.audioRecorderPlayer.removePlayBackListener();
  };

  public render() {
    let playWidth =
      (this.state.currentPositionSec / this.state.currentDurationSec) *
      (screenWidth - 56);

    if (!playWidth) {
      playWidth = 0;
    }

    return (
      <View style={styles.container}>
        <Text style={styles.titleTxt}>Audio Recorder Player</Text>
        <Text style={styles.txtRecordCounter}>{this.state.recordTime}</Text>
        <View style={styles.viewRecorder}>
          <View style={styles.recordBtnWrapper}>
            <Button
              style={styles.btn}
              onPress={this.onStartRecord}>
              Record
            </Button>
            <Button
              style={[
                styles.btn,
                {
                  marginLeft: 12,
                },
              ]}
              onPress={this.onPauseRecord}>
              Pause
            </Button>
            <Button
              style={[
                styles.btn,
                {
                  marginLeft: 12,
                },
              ]}
              onPress={this.onResumeRecord}>
              Resume
            </Button>
            <Button
              style={[styles.btn, {marginLeft: 12}]}
              onPress={this.onStopRecord}>
              Stop
            </Button>
          </View>
        </View>
        <View style={styles.viewPlayer}>
          <Pressable
            style={styles.viewBarWrapper}
            onPress={this.onStatusPress}>
            <View style={styles.viewBar}>
              <View style={[styles.viewBarPlay, {width: playWidth}]} />
            </View>
          </Pressable>
          <Text style={styles.txtCounter}>
            {this.state.playTime} / {this.state.duration}
          </Text>
          <View style={styles.playBtnWrapper}>
            <Button
              style={styles.btn}
              onPress={this.onStartPlay}>
              Play
            </Button>
            <Button
              style={[
                styles.btn,
                {
                  marginLeft: 12,
                },
              ]}
              onPress={this.onPausePlay}>
              Pause
            </Button>
            <Button
              style={[
                styles.btn,
                {
                  marginLeft: 12,
                },
              ]}
              onPress={this.onResumePlay}>
              Resume
            </Button>
            <Button
              style={[
                styles.btn,
                {
                  marginLeft: 12,
                },
              ]}
              onPress={this.onStopPlay}>
              Stop
            </Button>
          </View>
        </View>
      </View>
    );
  }
}

export default Audio;

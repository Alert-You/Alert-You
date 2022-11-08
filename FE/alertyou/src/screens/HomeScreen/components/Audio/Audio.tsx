import {Button, Divider, Text, View} from 'native-base';
import React, {Component} from 'react';
// import AudioRecorderPlayer, {
//   AVEncoderAudioQualityIOSType,
//   AVEncodingOption,
//   AudioEncoderAndroidType,
//   AudioSet,
//   AudioSourceAndroidType,
// } from 'react-native-audio-recorder-player';
import { Platform, PermissionsAndroid } from 'react-native';
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
  navigation: any;
  // audioRecorderPlayer: any;
}

class Audio extends Component<AudioProps, AudioState> {
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
      navigation: props.navigation,
      // audioRecorderPlayer: new AudioRecorderPlayer(),
    };
  }

  async componentDidMount() {
    if (Platform.OS === 'android') {
      try {
        const grants = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ]);
    
        console.log('write external stroage', grants);
    
        if (
          grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.READ_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.RECORD_AUDIO'] ===
            PermissionsAndroid.RESULTS.GRANTED
        ) {
          console.log('Permissions granted');
        } else {
          console.log('All required permissions not granted');
          return;
        }
      } catch (err) {
        console.warn(err);
        return;
      }
    }
  }

  // this.state.audioRecorderPlayer.setSubscriptionDuration(0.09); // optional. Default is 0.1

  // onStartRecord = async () => {
  //   const path = 'hello.m4a';
  //   const audioSet = {
  //     AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
  //     AudioSourceAndroid: AudioSourceAndroidType.MIC,
  //     AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
  //     AVNumberOfChannelsKeyIOS: 2,
  //     AVFormatIDKeyIOS: AVEncodingOption.aac,
  //   };
  //   console.log('audioSet', audioSet);
  //   const uri = await this.state.audioRecorderPlayer.startRecorder(
  //     path,
  //     audioSet,
  //   );
  //   this.state.audioRecorderPlayer.addRecordBackListener((e: any) => {
  //     this.setState({
  //       recordSecs: e.current_position,
  //       recordTime: this.state.audioRecorderPlayer.mmssss(
  //         Math.floor(e.current_position),
  //       ),
  //     });
  //   });
  //   console.log(`uri: ${uri}`);
  // };

  // onStopRecord = async () => {
  //   const result = await this.state.audioRecorderPlayer.stopRecorder();
  //   this.state.audioRecorderPlayer.removeRecordBackListener();
  //   this.setState({
  //     recordSecs: 0,
  //   });
  //   console.log(result);
  // };

  // onStartPlay = async () => {
  //   console.log('onStartPlay');
  //   const path = 'hello.m4a';
  //   const msg = await this.state.audioRecorderPlayer.startPlayer(path);
  //   this.state.audioRecorderPlayer.setVolume(1.0);
  //   console.log(msg);
  //   this.state.audioRecorderPlayer.addPlayBackListener((e: any) => {
  //     if (e.current_position === e.duration) {
  //       console.log('finished');
  //       this.state.audioRecorderPlayer.stopPlayer();
  //     }
  //     this.setState({
  //       currentPositionSec: e.current_position,
  //       currentDurationSec: e.duration,
  //       playTime: this.state.audioRecorderPlayer.mmssss(
  //         Math.floor(e.current_position),
  //       ),
  //       duration: this.state.audioRecorderPlayer.mmssss(Math.floor(e.duration)),
  //     });
  //   });
  // };

  // onPausePlay = async () => {
  //   await this.state.audioRecorderPlayer.pausePlayer();
  // };

  // onStopPlay = async () => {
  //   console.log('onStopPlay');
  //   this.state.audioRecorderPlayer.stopPlayer();
  //   this.state.audioRecorderPlayer.removePlayBackListener();
  // };

  render() {
    return (
      // <View style={styles.container}>
      //   <Text>{this.state.recordTime}</Text>
      //   <Button
      //     // icon="record"
      //     onPress={() => this.onStartRecord()}>
      //     RECORD
      //   </Button>

      //   <Button
      //     // icon="stop"
      //     // mode="outlined"
      //     onPress={() => this.onStopRecord()}>
      //     STOP
      //   </Button>
      //   <Divider />
      //   <Text>
      //     {this.state.playTime} / {this.state.duration}
      //   </Text>
      //   <Button
      //     // mode="contained"
      //     // icon="play"
      //     onPress={() => this.onStartPlay()}>
      //     PLAY
      //   </Button>

      //   <Button
      //     // icon="pause"
      //     // mode="contained"
      //     onPress={() => this.onPausePlay()}>
      //     PAUSE
      //   </Button>
      //   <Button
      //     // icon="stop"
      //     // mode="outlined"
      //     onPress={() => this.onStopPlay()}>
      //     STOP
      //   </Button>
      // </View>
      <Text>hellooooooo</Text>
    );
  }
}

export default Audio;

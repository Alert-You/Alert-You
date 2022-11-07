import React, {Component} from 'react';
import {
  Platform,
  PermissionsAndroid,
  View,
  Image,
  FlatList,
  Pressable,
} from 'react-native';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {styles} from './style';

interface AppProps {
  navigation: any;
}

interface AppState {
  data: any;
  navigation: any;
}

class Gallery extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      data: '',
      navigation: props.navigation,
    };
  }

  async componentDidMount() {
    if (Platform.OS === 'android') {
      const result = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Permission Explanation',
          message: 'ReactNativeForYou would like to access your photos!',
          buttonPositive: 'true',
        },
      );
      if (result !== 'granted') {
        console.log('Access to pictures was denied');
        return;
      }
    }

    CameraRoll.getPhotos({
      first: 300,
      assetType: 'Photos',
    })
      .then(res => {
        this.setState({data: res.edges});
      })
      .catch(error => {
        console.log(error);
      });
  }

  selectImage(item: any) {
    console.log(item.node.image);
    this.state.navigation.navigate('CameraCheckScreen', {uri: item.node.image.uri});
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.data}
          numColumns={3}
          renderItem={({item}) => (
            <Pressable
              onPress={() => this.selectImage(item)}>
              <Image style={styles.image} source={{uri: item.node.image.uri}} />
            </Pressable>
          )}
        />
      </View>
    );
  }
}

export default Gallery;

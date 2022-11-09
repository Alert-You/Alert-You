import { View, Text } from 'native-base'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Image, Pressable, StyleSheet, TouchableOpacity, PermissionsAndroid, Platform, Alert } from 'react-native'
import RNFetchBlob from 'rn-fetch-blob'

import { proofType } from '@/types'
import { PURPLE, RED, WHITE } from '@/theme/colorVariants'
import { FlatListItem } from '@/components'

import { downloadProof } from '../apis'

const ProofItem: React.FC<{ item: proofType }> = ({ item }) => {
  const imagePath = item?.url
  const checkPermission = async () => {
    if (Platform.OS === 'ios') {
      downloadImage();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message:
              'Application needs access to your storage to download File',
            buttonPositive: ''
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Start downloading
          downloadImage();
        } else {
          // If permission denied then show alert
          Alert.alert('Error', 'Storage Permission Not Granted');
        }
      } catch (err) {
        // To handle permission related exception
        console.log("++++" + err);
      }
    }
  };

  const downloadImage = () => {
    // Get today's date to add the time suffix in filename
    let date = new Date();
    // File URL which we want to download
    let FILE_URL = imagePath;
    // Function to get extention of the file url
    let file_ext: any = getFileExtention(FILE_URL);

    file_ext = '.' + file_ext[0];

    // config: To get response by passing the downloading related options
    // fs: Root directory path to download
    const { config, fs } = RNFetchBlob;
    let RootDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        path:
          RootDir +
          '/file_' +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          file_ext,
        description: 'downloading file...',
        notification: true,
        // useDownloadManager works with Android only
        useDownloadManager: true,
      },
    };
    config(options)
      .fetch('GET', FILE_URL)
      .then(res => {
        // Alert after successful downloading
        Alert.alert('파일이 성공적으로 저장되었습니다.');
      });
  };

  const getFileExtention = (fileUrl: any) => {
    // To get the file extension
    return /[.]/.exec(fileUrl) ?
      /[^.]+$/.exec(fileUrl) : undefined;
  };

  let title: string = "녹취 파일 "
  let rightContent = <View>
    <Pressable onPress={checkPermission}>
      <MaterialCommunityIcons
        name="download"
        size={32}
        color={WHITE.white400}
      />
    </Pressable>
  </View>
  let icon = <View>
    <MaterialCommunityIcons
      name="microphone"
      size={32}
      color={PURPLE.purple400} />
  </View>
  if (item.type) {
    icon = <View>
      <MaterialCommunityIcons
        name='image'
        size={32}
        color={RED.red400}
      />
    </View>
  }
  if (item.type) {
    title = "사진 파일"
  }

  return (
    <View>
      <FlatListItem
        title={title}
        subTitle={item.createDate}
        bgColor={WHITE.white}
        rightContent={rightContent}
        bdColor={WHITE.white}
        bdbColor={RED.red300}
        cbgColor={RED.redBg}
        bdWidth={1}
        icon={icon} />
    </View>
  )
}

export default ProofItem
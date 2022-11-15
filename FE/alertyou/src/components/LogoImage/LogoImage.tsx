import { Image } from 'react-native'
import React from 'react'
import { styles } from './style';

const LogoImage = () => {
  return (
    <>
      <Image source={require('@/assets/alertImage.png')} style={styles.logoImage} />
    </>
  )
}

export default LogoImage
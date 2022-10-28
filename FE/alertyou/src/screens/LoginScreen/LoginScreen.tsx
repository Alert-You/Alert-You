import { View, Text, Button } from 'react-native'
import React from 'react'

type Props = {
  navigation: any
}

const LoginScreen = ({ navigation }: Props) => {
  return (
    <View>
      <Text>LoginHello</Text>
      <Button title="회원가입" onPress={() => navigation.navigate("SignUpScreen")}></Button>
    </View>
  )
}

export default LoginScreen
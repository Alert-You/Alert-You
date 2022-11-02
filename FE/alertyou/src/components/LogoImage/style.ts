import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  logoImage: {
    position: 'absolute',
    top: 10,
    resizeMode: 'contain',
    width: Dimensions.get('window').width,
    height: 150,
  }
});
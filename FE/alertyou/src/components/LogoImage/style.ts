import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  logoImage: {
    position: 'absolute',
    bottom: -20,
    resizeMode: 'contain',
    width: Dimensions.get('window').width,
    height: 165,
  }
});
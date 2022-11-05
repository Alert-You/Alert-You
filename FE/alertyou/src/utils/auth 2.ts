import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveToken = async (token: string) => {
  try {
    await AsyncStorage.setItem('@token', token);
    console.log('성공!');
  } catch(e) {
    console.log(e);
  }
};

export const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('@token');
      console.log(token);
    } catch (e) {
      console.log(e);
    }
  };

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem('@token')
  } catch (e) {
    console.log(e)
  }
}
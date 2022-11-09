import EncryptedStorage from 'react-native-encrypted-storage';

export const saveToken = async (token: string) => {
  try {
    await EncryptedStorage.setItem('@token', token);
  } catch(e) {
    console.log(e);
  }
};

export const getToken = async () => {
    try {
      const token = await EncryptedStorage.getItem('@token');
      console.log(token);
      return token
    } catch (e) {
      console.log(e);
    }
  };

export const removeToken = async () => {
  try {
    await EncryptedStorage.removeItem('@token');
  } catch (e) {
    console.log(e)
  }
}

export const saveAccessToken = async (token: string) => {
  try {
    await EncryptedStorage.setItem('@accessToken', token);
  } catch(e) {
    console.log(e);
  }
};

export const getAccessToken = async () => {
    try {
      const token = await EncryptedStorage.getItem('@accessToken');
      console.log(token);
      return token
    } catch (e) {
      console.log(e);
    }
  };

export const removeAccessToken = async () => {
  try {
    await EncryptedStorage.removeItem('@accessToken');
  } catch (e) {
    console.log(e)
  }
}
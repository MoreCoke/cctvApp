import Keychain from 'react-native-keychain';

export async function getAccessToken() {
  try {
    const data = await Keychain.getGenericPassword({service: 'accessToken'});
    return data.password;
  } catch (err) {
    console.log('getAccessToken error: ', err.message);
  }
}

export async function setAccessToken(token) {
  try {
    await Keychain.setGenericPassword('accessToken', token, {
      service: 'accessToken',
    });
  } catch (err) {
    console.log('setAccessToken error: ', err.message);
  }
}

export async function removeAccessToken() {
  try {
    await Keychain.resetGenericPassword({service: 'accessToken'});
  } catch (err) {
    console.log('removeAccessToken error: ', err.message);
  }
}

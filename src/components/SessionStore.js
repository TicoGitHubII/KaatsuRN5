import AsyncStorage from 'react-native';

class SessionStore {
  async saveUser(key, value2) {
    try {
      await AsyncStorage.setItem([
        [key, JSON.stringify(value2)],
        // ['access_tok', JSON.stringify(value2)],
      ]);
    } catch (error) {
      console.log('error');
    }
  }

  async retrieveUser(key) {
    let item = await AsyncStorage.getItem(key);

    return item;
  }

  removeItem(key) {
    try {
      AsyncStorage.removeItem(key);
    } catch (error) {
      console.log('Error ' + error.value);
    }
  }

  clear() {
    try {
      AsyncStorage.clear();
    } catch (error) {
      console.log('Error ' + error.value);
    }
  }

  session_auth = {
    isAuthenticated: false,
    setAuth(cb) {
      this.isAuthenticated = true;
      setTimeout(cb, 100);
    },
  };
}
export const session = new SessionStore();

import {AsyncStorage} from 'react-native';
import React from 'react';

class LocalStor extends React.Component {
  saveUser([key, value], [key2, value2]) {
    try {
      AsyncStorage.multiSet(
        [[key, JSON.stringify(value)], [key2, JSON.stringify(value2)]],
        err => console.log(err),
      );
    } catch (error) {
      console.log('error');
    }
  }

  retrieveUser(key) {
    var item = AsyncStorage.getItem(key);

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
}
export default LocalStor;

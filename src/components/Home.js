import React from 'react';
import {
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import {Button, Text} from 'native-base';
import {Link} from 'react-router-native';
const styles = StyleSheet.create({
  textStyle: {
    fontWeight: 'bold',
    fontSize: 30,
  },
  buttonStyle: {
    backgroundColor: '#C55545',
    borderRadius: 5,
    padding: 20,
    marginTop: 10,
    width: '100%',
  },
});

export const Home = () => {
  return (
    <View>
      <Image source={require('../images/logo70.jpg')} />

      <Link to="/LoginForm" style={styles.buttonStyle}>
        <Text style={styles.buttonText}>Login</Text>
      </Link>
      <Link to="/Signup" style={styles.buttonStyle}>
        <Text style={styles.buttonText}>Signup</Text>
      </Link>
    </View>
  );
};

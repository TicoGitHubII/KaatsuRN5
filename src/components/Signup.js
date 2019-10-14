import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  TextInput,
  ActivityIndicator,
  AsyncStorage,
  Alert,
} from 'react-native';
import {history} from 'react-router-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import * as services from '../services/userServices';
import {session} from './SessionStore';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  paragraphText: {
    fontFamily: 'Lucida Sans , Lucida Sans Regular',
  },
  buttonStyle: {
    backgroundColor: '#C55545',
    borderRadius: 5,
    padding: 20,
    marginTop: 10,
    fontSize: 15,
    fontWeight: 'bold',
  },
  inputStyle: {
    width: '100%',
    padding: 25,
    marginTop: 10,
    borderRadius: 5,
    borderColor: '#000000',
    borderWidth: 2,
    fontSize: 15,
  },
  buttonText: {
    textAlign: 'center',
    padding: 5,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

const registerSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email')
    .required('Required'),

  password: yup.string().required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const handleSubmit = (values, {setSubmitting}) => {
  services
    .Register(values)
    .then(response => OnResponse(response))
    .catch(response => OnError(response));
  setSubmitting(false);
};

const OnResponse = response => {
  if (response.data.response) {
    Alert.alert(
      'Notification',
      'Done! Welcome to KaatsuApp',
      [
        {
          text: 'OK',
          onPress: () => {
            setTimeout(history.push('login'), 1000);
            console.log('OK Pressed');
          },
        },
      ],
      {cancelable: false},
    );
  } else {
    Alert.alert(
      'Error',
      'SignUp failed',
      [{text: 'OK', onPress: () => console.log('OK Pressed')}],
      {cancelable: false},
    );
  }
  console.log('Success:' + JSON.stringify(response, undefined, '\t'));
};

const OnError = response => {
  console.log(response);
};

export const Signup = props => (
  <Formik
    initialValues={{
      email: '',
      password: '',
      confirmPassword: '',
    }}
    validationSchema={registerSchema}
    onSubmit={handleSubmit}
    enableReinitialize={true}>
    {props => {
      return (
        <View style={styles.container}>
          <TextInput
            style={styles.inputStyle}
            onChangeText={props.handleChange('email')}
            placeholder="Enter Email"
            returnKeyType={'next'}
            values={props.values.email}
          />
          {props.errors.email && props.touched.email ? (
            <Text style={{color: 'red'}}>{props.errors.email}</Text>
          ) : null}

          <TextInput
            secureTypeText={true}
            style={styles.inputStyle}
            onChangeText={props.handleChange('password')}
            placeholder="Password"
            returnKeyType={'next'}
            values={props.values.password}
          />
          {props.errors.password && props.touched.password ? (
            <Text style={{color: 'red'}}>{props.errors.password}</Text>
          ) : null}

          <TextInput
            secureTypeText={true}
            style={styles.inputStyle}
            onChangeText={props.handleChange('confirmPassword')}
            placeholder="Confirm Password"
            returnKeyType={'send'}
            values={props.values.confirmPassword}
          />
          {props.errors.confirmPassword && props.touched.confirmPassword ? (
            <Text style={{color: 'red'}}>{props.errors.confirmPassword}</Text>
          ) : null}

          <TouchableOpacity onPress={props.handleSubmit}>
            <View style={styles.buttonStyle}>
              {props.isSubmitting ? (
                <Text style={styles.buttonText}> Working... </Text>
              ) : (
                <Text style={styles.buttonText}>Login </Text>
              )}
            </View>
          </TouchableOpacity>
          <View>
            <Text style={styles.paragraphText}>Forgot Password</Text>
          </View>
        </View>
      );
    }}
  </Formik>
);

import React from 'react';
import {
  ActivityIndicator,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  TextInput,
  Alert,
  AsyncStorage,
} from 'react-native';
import {withRouter, Redirect} from 'react-router-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import * as services from '../services/userServices';
import {session} from './SessionStore';
import KaatsuMonitor from './Monitor';
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

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email')
    .required('Required'),

  password: yup.string().required('Password is required'),
});

const handleSubmit = (values, {setSubmitting}) => {
  console.log(`Form Submit Values : ${values}`);
  // alert(
  //   `Your email is ${values.email} and password entered ${values.password}`,
  // );

  services
    .GetToken(values)
    .then(response => OnResponse(response))
    .catch(response => OnError(response));

  setSubmitting(false);

  return <Redirect to="\Monitor" />;
};

// Create Session Object

// const loading = () => {
//   return <ActivityIndicator size="large" color="#C55545" />;
// };
const OnResponse = response => {
  let username = response.data.userName;
  let newToken = response.data.access_token;

  // // SetSession
  // session.saveUser('access_token', newToken);
  // session.saveUser('username', username);
  // console.log(session.retrieveUser(username));
  // // Redirect

  // if (newToken) {
  //   return <displayView />;
  // } else {
  //   Alert.alert(
  //     'Failed Verification',
  //     'Please Sign Up!',
  //     [{text: 'OK', onPress: () => console.log('OK Pressed')}],
  //     {cancelable: false},
  //   );
  //   <Redirect to="/Signup" />;
  // }

  console.log('Success:' + JSON.stringify(response, undefined, '\t'));
};

const OnError = response => {
  console.log(response);
};

export const LoginForm = props => (
  <Formik
    initialValues={{
      email: '',
      password: '',
    }}
    validationSchema={loginSchema}
    onSubmit={handleSubmit}
    enableReinitialize={true}>
    {props => {
      return (
        <View style={styles.container}>
          <TextInput
            style={styles.inputStyle}
            onChangeText={props.handleChange('email')}
            placeholder="Enter Email"
            values={props.values.email}
            returnKeyType={'next'}
          />
          {props.errors.email && props.touched.email ? (
            <Text style={{color: 'red'}}>{props.errors.email}</Text>
          ) : null}
          <TextInput
            secureTypeEntry={true}
            style={styles.inputStyle}
            onChangeText={props.handleChange('password')}
            placeholder="Password"
            values={props.values.password}
            returnKeyType={'go'}
          />
          {props.errors.password && props.touched.password ? (
            <Text style={{color: 'red'}}>{props.errors.password}</Text>
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

class displayView extends React.Component {
  render() {
    return <Redirect to="\Monitor" />;
  }
}

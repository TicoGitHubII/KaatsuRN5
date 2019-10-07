import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  TextInput,
} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import * as services from '../services/userServices';

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
  console.log(values);
  // alert(
  //   `Your email is ${values.email} and password entered ${values.password}`,
  // );

  services
    .GetToken(values)
    .then(response => OnResponse(response))
    .catch(response => OnError(response));

  setSubmitting(false);
};
const OnResponse = response => {
  console.log(response);
  // on success set  AsyncStorage
  //   token and UserId and Email
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
          />
          {props.errors.email && props.touched.email ? (
            <Text style={{color: 'red'}}>{props.errors.email}</Text>
          ) : null}
          <TextInput
            style={styles.inputStyle}
            onChangeText={props.handleChange('password')}
            placeholder="Password"
            values={props.values.password}
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

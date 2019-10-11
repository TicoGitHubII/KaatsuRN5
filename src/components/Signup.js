import React ,{useState} from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  TextInput,
  AsyncStorage,
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
  const [userId, setUserId] = useState('');
  const [JWTToken, setJWTToken] = useState(0);
  const [email, setEmail] = useState('');

   let userInfo ={
        userId : setUserId(response.data.userId),
        JWTToken : setJWTToken(response.data.JWTToken),
        email : setEmail(response.data.email),
   };
     var userkeyMap = [['userId',userInfo.userId],['JWTToken',userInfo.JWTToken],['email',userInfo.email]]
   const storeUserInfo  = async userInfo =>{
     try{
        await AsyncStorage.multiSet([userkeyMap,err => {}])
     }catch(error){
       console.log('error')

     }
        
  console.log('Success:' + JSON.stringify(response, undefined, '\t'));
  // if success push to  Monitors
};

const OnError = response => {
  console.log(response);
};
// Check if user is signed in already if so rediret to back to

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

          <TextInput
            style={styles.inputStyle}
            onChangeText={props.handleChange('confirmPassword')}
            placeholder="Confirm Password"
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

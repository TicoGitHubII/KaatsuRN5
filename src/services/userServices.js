import axios from 'axios';
import React, {useContext} from 'react';
import * as appServer from '../global';
// import { Link } from "react-router-dom";
// import { SessionContext, SessionConsumer, SessionProvider } from '../cookies/MyCookies'
// import * as Cookies from "js-cookie";
const stringifyObject = require('stringify-object');
//PATH
const basePath1 = appServer.HOST_PATH + '/api/Account/';
const basePath = appServer.HOST_PATH + '/api/';
const token = appServer.HOST_PATH + '/token';
const headers = {'Content-Type': 'application/x-www-form-urlencoded'};
const headersJ = {'Content-Type': 'application/json'};
const basePath2 = appServer.HOST_PATH + '/api/twilio/';

export const GetToken = val => {
  let url = token;
  const config = {
    headers,
    method: 'POST',
    data: `grant_type=password&email=${val.email}&username=${
      val.email
    }&password=${val.password}`,
    // crossdomain: true,
  };
  return axios(url, config);
};

export const Login = data => {
  let url = basePath + 'UserInfo';
  const config = {
    headers,
    method: 'GET',
    data: data,
    // withCredentials: true,dj[]
    // crossdomain: true,
  };
  return axios(url, config);
};

// export const ProtectedHandler = props => {
//   const {session} = useContext(SessionContext);
//   if (session === undefined) {
//     props.history.push('/login');
//   }

//   return (
//     <div>
//       <h6>Protected data for {this}</h6>
//       <Link to="/logout">Logout here</Link>
//     </div>
//   );
// };

// export const LogoutHandler = () => {
//   Cookies.remove('session');
//   this.props.history.push('/login2');
//   return <div>Logging out!</div>;
// };

export const Register = data => {
  const dataNew = {
    UserName: data.email,
    password: data.password,
    email: data.email,
    ConfirmPassword: data.confirmPassword,
  };
  let url = 'https://kaatsuapp.azurewebsites.net/api/Account/' + 'Register';
  const config = {
    headers,
    method: 'POST',
    data: `grant_type=password&email=${data.email}&username=${
      data.email
    }&password=${data.password}&ConfirmPassword=${data.confirmPassword}`,
    // crossdomain: true,
  };
  return axios(url, config);
};

export const SendTwilio = data => {
  let url = basePath2 + data;
  const config = {
    headers,
    method: 'GET',
    crossdomain: true,
  };
  return axios(url, config);
};

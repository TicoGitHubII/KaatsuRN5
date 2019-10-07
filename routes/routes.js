import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import App from '../App';
import {Signup} from '../src/components/Signup';
import KaatsuMonitor from '../src/components/Monitor';
import {LoginForm} from '../src/components/LoginForm';
import {Home} from '../src/components/Home';
import {
  Route,
  Router,
  Link,
  useHistory,
  NativeRouter,
  Switch,
} from 'react-router-native';

export const Routes = ({}) => {
  return (
    <>
      <Route exact path="/" component={Home} />
      <Route path="/LoginForm" component={LoginForm} />
      <Route path="/Signup" component={Signup} />
    </>
  );
};

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  AsyncStorage,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Signup} from './src/components/Signup';
import KaatsuMonitor from './src/components/Monitor';
import {LoginForm} from './src/components/LoginForm';
import {Home} from './src/components/Home';
import {
  Route,
  Router,
  Link,
  BackButton,
  NativeRouter,
  Switch,
} from 'react-router-native';
import {Routes} from './routes/routes';

class App extends React.Component {
  render() {
    // ComponentDidMount to check or WillMount to check AsyncStorage for  token
    //  getUserId = async () => {
    //    let userId '' ;
    //    try{
    //       userId = await AsyncStorage.getItem('userId') || 'none';
    //    } catch (error){
    //      //Error retreive data
    //      console.log(error.message);
    //    }
    // return userId;
    //  }
    // if(!getUserId)
    //{
    //  history.push("/LoginForm");
    //} else { prompt(getUserId);    // this is welcome
    //   history.push('/Monitor');
    //}
    return (
      <NativeRouter>
        <BackButton>
          <View style={styles.sectionContainer}>
            <StatusBar barStyle="dark-content" />
            <BackButton />
            <Route exact path="/" component={Home} />
            <Route path="/LoginForm" component={LoginForm} />
            <Route path="/sMonitor" component={KaatsuMonitor} />
            <Route path="/Signup" component={Signup} />
          </View>
        </BackButton>
      </NativeRouter>
    );
  }
}

const styles = StyleSheet.create({
  navItem: {
    backgroundColor: '#C55545',
    borderRadius: 5,
    padding: 20,
    marginTop: 10,
    fontSize: 15,
    fontWeight: 'bold',
  },
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    flexDirection: 'row',
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

/* <SafeAreaView>
<ScrollView
contentInsetAdjustmentBehavior="automatic"
style={styles.scrollView}>
{global.HermesInternal == null ? null : (
  <View style={styles.engine}>
    <Text style={styles.footer}>Engine: Hermes</Text>
  </View> 
       </ScrollView>
          </SafeAreaView>*/

export default App;

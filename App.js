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
import {
  Header,
  Button,
  Icon,
  Left,
  Body,
  Right,
  Container,
  Title,
  Content,
} from 'native-base';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Signup} from './src/components/Signup';
import KaatsuMonitor from './src/components/Monitor';
import {LoginForm} from './src/components/LoginForm';
import {Home} from './src/components/Home';
import {Router, Route, Switch} from 'react-router-native';
import createHistory from 'history/createMemoryHistory';

let history = createHistory();
class App extends React.Component {
  render() {
    return (
      <Container>
        {/* <StatusBar barStyle="light-content" networkActivityIndicatorVisible /> */}
        <Header style={styles.head}>
          <Left>
            <Button transparent>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title style={styles.title}>Kaatsu App</Title>
          </Body>
          <Right />
        </Header>

        <Router history={history}>
          <Route exact path="/" component={Home} />
          <Route path="/LoginForm" component={LoginForm} />
          <Route path="/Monitor" component={KaatsuMonitor} />
          <Route path="/Signup" component={Signup} />
        </Router>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  head: {
    backgroundColor: '#C55545',
    fontSize: 12,
    fontWeight: '400',
    color: Colors.white,
  },
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
  title: {
    marginLeft: 'auto',
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

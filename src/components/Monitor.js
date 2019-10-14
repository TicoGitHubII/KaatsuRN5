import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import * as myServices from '../services/userServices';
import {history} from 'react-router-native';
import {session} from './SessionStore';

const styles = StyleSheet.create({
  monitor: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 5,

    width: 100,
    borderRadius: 3,
  },
  wrapperMonitor: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  box: {
    width: 100,
    padding: 10,
    borderWidth: 2,
    borderColor: '#000000',
    borderRadius: 5,
    marginLeft: 5,
    marginTop: 5,
    marginRight: 5,
  },
  boxTitle: {
    width: 125,
    padding: 5,
    marginTop: 10,
    alignContent: 'center',
    justifyContent: 'center',
  },
  box2: {
    width: 100,
    height: 'auto',
    padding: 10,
    margin: 'auto',
    borderRadius: 10,
    textAlign: 'center',
  },

  box3: {
    margin: 'auto',
    padding: 5,
  },
  textStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textStyleButton: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    color: 'white',
  },
  textStyleDigits: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  buttonStyle: {
    backgroundColor: '#C55545',
    borderRadius: 5,
    width: 100,
    padding: 5,
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
var tmp, tmp2;

class KaatsuMonitor extends React.Component {
  constructor(props) {
    super();
    this.state = {
      count: 0,
      count2: 0,
      username: '',
      toggle: false,
      toggle2: false,
    };
  }

  handleSubmit = () => {
    this.handleStopClick();
  };

  time = () => {
    this.toggle();
    tmp = setInterval(() => {
      this.setState({
        count: this.state.count + 1,
      });
    }, 100);
    return tmp;
  };

  time2 = () => {
    this.toggle2();
    tmp2 = setInterval(() => {
      this.setState({
        count2: this.state.count2 + 1,
      });
    }, 100);
    return tmp2;
  };

  toggle = () => {
    this.setState(prevState => ({
      toggle: !prevState.toggle,
    }));
  };
  toggle2 = () => {
    this.setState(prevState => ({
      toggle2: !prevState.toggle,
    }));
  };

  getPressure = () => {
    return ('' + (this.state.count % 1000)).slice(-3);
  };

  getRtPressure2 = () => {
    return ('' + (this.state.count2 % 1000)).slice(-3);
  };

  handleStartClick = e => {
    e.preventDefault();
    if (this.state.toggle && this.state.toggle2) {
      //   this.notify();
    } else {
      this.handleStartClick2();
      //icrement second by 1
      this.time();
    }
  };

  handleStartClick2 = () => {
    this.time2();
  };

  handleStopClick = e => {
    e.preventDefault();

    this.toggle();

    clearTimeout(tmp);
    clearTimeout(tmp2);
    var x = tmp;

    myServices
      .SendTwilio(x)
      .then(response => this.onSuccess(response))
      .catch(response => this.onError(response));
  };

  handleReset = () => {
    if (this.state.toggle) {
      this.toggle();
      this.toggle2();
    }
    clearInterval(tmp);
    clearInterval(tmp2);
    this.setState({
      count: 0,
      count2: 0,
    });
  };

  handleLogOut = () => {
    session.clear();
    history.push('/login');
  };

  onSuccess = response => {
    console.log(response);
  };
  onError = response => {
    console.log(response);
  };

  componentDidMount = () => {};
  render() {
    return (
      <View style={styles.wrapperMonitor}>
        <View>
          <Text style={styles.textStyle}> Kaatsu Monitor</Text>
        </View>

        <View style={styles.monitor}>
          <View style={styles.boxTitle}>
            <Text style={styles.textStyle}>Left Port </Text>
          </View>

          <View style={styles.boxTitle}>
            <Text style={styles.textStyle}>Right Port</Text>
          </View>
        </View>
        <View style={styles.monitor}>
          <View style={styles.box}>
            <Text style={styles.textStyleDigits}>{this.getPressure()}</Text>
          </View>

          <View style={styles.box}>
            <Text style={styles.textStyleDigits}>{this.getRtPressure2()}</Text>
          </View>
        </View>

        <View style="styles.monitor">
          <View style={styles.box3}>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={this.handleStartClick}>
              <Text style={styles.textStyleButton}>Start</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={this.handleStopClick}>
              <Text style={styles.textStyleButton}>Check</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.monitor}>
          <View style={styles.box}>
            <Text style={styles.textStyleDigits}>0</Text>
          </View>

          <View style={styles.box}>
            <Text style={styles.textStyleDigits}>0</Text>
          </View>
        </View>

        <View style={styles.monitor}>
          <View>
            <View style={styles.box3}>
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={this.handleReset}>
                <Text style={styles.textStyleButton}>Release</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={this.handleLogOut}>
                <Text style={styles.textStyleButton}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
export default KaatsuMonitor;

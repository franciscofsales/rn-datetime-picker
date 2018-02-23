import React, { Component } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import DateTimePicker from './lib';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
});


export default class App extends Component {



  render() {
    return (
      <View style={styles.container}>
        <DateTimePicker value={new Date()} onValueChange={dt => console.log(dt)}
        />
      </View>
    );
  }
}
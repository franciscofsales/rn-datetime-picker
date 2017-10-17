/* @flow */

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default class DateTimePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      refreshing: false,
    };
  }

  componentWillMount() {
  }

  componentWillReceiveProps(nextProps) {
  }

  componentWillUpdate(nextProps, nextState) {
  }



  render() {
    return (
      <View style={styles.container}>
        
      </View>
    );
  }
}

DateTimePicker.propTypes = {
  time: React.PropTypes.number,
  style: React.PropTypes.object,
};
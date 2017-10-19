/* @flow */

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Text,
  Dimensions
} from 'react-native';
import List from './list';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    height: height,
    width: width
  }
});

export default class DateTimePicker extends Component {
  constructor(props) {
    super(props);
    const date = props.value || (new Date());
    this.state = {
      month: date.getUTCMonth(),
      day: date.getUTCDate(),
      year: date.getUTCFullYear(),
      hour: date.getHours(),
      minute: Math.floor(date.getMinutes()/10)*10
    };
    this.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    this.years = [2017, 2018, 2019, 2020];
    this.hours = ['12am', '1am', '2am', '3am', '4am', '5am', '6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm'];
    this.minutes = Array.apply(null, {length: 6}).map((v,i) => i*10);
  }


  _handleMonth = item => this.setState({month: item});
  _handleDay = item => this.setState({day: item+1});
  _handleYear = item => this.setState({year: this.years[item]});
  _handleHours = item => this.setState({hour: item});
  _handleMinutes = item => this.setState({minute: item});

  componentDidUpdate(){
    let {year, month, day, hour, minute} = this.state;
    let {mode, onValueChange} = this.props;
    if (!mode || mode === undefined) {
      mode = 'datetime';
    }
    if(onValueChange) {
      if(mode === 'datetime'){
        onValueChange(new Date(year, month, day, hour, this.minutes[minute]));
      }
      else if( mode === 'date') {
       onValueChange(new Date(year, month, day)); 
      }
      else if( mode === 'time'){
        onValueChange(`${hour}:${this.minutes[minute]}`);
      }
    }
  }

  render() {
    const maxDaysForMonth = (new Date(this.state.year, this.state.month, 0).getDate());
    const days = Array.apply(null, {length: maxDaysForMonth}).map((v,i) => i+1);

    let {mode} = this.props;
    if (!mode || mode === undefined) {
      mode = 'datetime';
    }

    return (
      let {height, showMarker} = this.props;
      let {markerColor, markerWidth, markerHeight, lineColor, lineWidth} = this.props;
      if(!height || height === undefined) {
        height = 100;
      } 
      if(!showMarker || showMarker === undefined) {
        showMarker = false;
      }


      <View style={styles.container}>
        { (mode === 'date' || mode === 'datetime') && (
          <List 
            markerWidth={markerWidth} 
            markerColor={markerColor} 
            markerHeight={markerHeight} 
            lineWidth={lineWidth} 
            lineColor={lineColor} 
            height={height} 
            value={this.months[this.state.month]} 
            onSwipeLeft={this._handleMonth} 
            onSwipeRight={this._handleMonth} 
            showMarker={showMarker} 
            data={this.months} />)}
        { (mode === 'date' || mode === 'datetime') && (
          <List 
            markerWidth={markerWidth}
            markerColor={markerColor} 
            markerHeight={markerHeight}
            lineWidth={lineWidth}  
            lineColor={lineColor} 
            height={height} 
            value={this.state.day} 
            onSwipeLeft={this._handleDay} 
            onSwipeRight={this._handleDay} 
            showMarker={showMarker} 
            data={days} />)}
        { (mode === 'date' || mode === 'datetime') && (
          <List 
            markerWidth={markerWidth} 
            markerColor={markerColor} 
            markerHeight={markerHeight} 
            lineWidth={lineWidth} 
            lineColor={lineColor} 
            height={height} 
            value={this.state.year} 
            onSwipeLeft={this._handleYear} 
            onSwipeRight={this._handleYear} 
            showMarker={showMarker} 
            data={this.years} />)}
        { (mode === 'time' || mode === 'datetime') && (
          <List 
            markerWidth={markerWidth} 
            markerColor={markerColor} 
            markerHeight={markerHeight} 
            lineColor={lineColor} 
            lineWidth={lineWidth} 
            height={height} 
            value={this.hours[this.state.hour]} 
            onSwipeLeft={this._handleHours} 
            onSwipeRight={this._handleHours} 
            showMarker={showMarker} 
            data={this.hours} />)}
        { (mode === 'time' || mode === 'datetime') && (
          <List 
            markerWidth={markerWidth} 
            markerColor={markerColor} 
            markerHeight={markerHeight} 
            lineWidth={lineWidth} 
            lineColor={lineColor} 
            height={height} 
            value={this.minutes[this.state.minute]} 
            onSwipeLeft={this._handleMinutes} 
            onSwipeRight={this._handleMinutes} 
            showMarker={showMarker} 
            data={this.minutes} />)}
      </View>
    );
  }
}

// DateTimePicker.propTypes = {
//   style: React.PropTypes.object
// };
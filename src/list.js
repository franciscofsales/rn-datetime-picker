/* @flow */

import React, { Component } from 'react';
import {
	View,
	Animated,
	StyleSheet,
	PanResponder,
	Dimensions,
	LayoutAnimation,
	UIManager,
	Text
} from 'react-native';

const { width, height } = Dimensions.get('window');
const SWIPE_THRESHOLD = 0.18 * width;

class List extends Component {
	constructor(props) {
		super(props);
		const position = new Animated.ValueXY();
		const panResponder = PanResponder.create({
			onStartShouldSetPanResponder: () => true,
			onPanResponderMove: (event, gesture) => {
				position.setValue({ x: gesture.dx });
			},
			onPanResponderRelease: (event, gesture) => {
				
				let amountMoved = Math.floor(Math.abs(gesture.dx) / SWIPE_THRESHOLD);
				if (amountMoved > 0) {
					if(gesture.dx > 0) {
						this.props.onSwipeLeft(Math.max(0, this.state.index - 1 - amountMoved));
					} else {
						this.props.onSwipeRight(Math.min(this.props.data.length, this.state.index - 1 + amountMoved));
					}
					this.state.position.setValue({ x: 0, y: 0 });
				}
				else {
					this._resetPosition();
				}
			}
		});
		this.state = {
			panResponder,
			position,
			index: (this.props.data.indexOf(this.props.value) + 1 ) || 1
		};
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.data.indexOf(nextProps.value) < 0 ){
			// this._onSwipeComplete('right', 1);	
			this.props.onSwipeLeft(Math.max(1, this.state.index - 1));

		}
		else{
			this.setState({index: (nextProps.data.indexOf(nextProps.value) +1 ) || 1});
		}
	}

	componentWillUpdate() {
		// compatibility for android
		UIManager.setLayoutAnimationEnabledExperimental &&
			UIManager.setLayoutAnimationEnabledExperimental(true);
		const spring = {
			duration: 1000,
			delete: {
				type: LayoutAnimation.Types.spring,
				property: LayoutAnimation.Properties.opacity
			},
			update: {
				type: LayoutAnimation.Types.spring,
				springDamping: 0.5
			},
			
		};

		LayoutAnimation.configureNext(spring);
	}

	_onSwipeComplete = (direction, moves) => {
		const { data } = this.props;
		this.state.position.setValue({ x: 0, y: 0 });
		const index = direction === 'left' ? Math.min(data.length, this.state.index + moves) :  Math.max(1, this.state.index - moves);
		this.setState({ index });
	};

	
	_resetPosition = () => {
		Animated.spring(this.state.position, {
			toValue: { x: 0, y: 0 }
		}).start();
	};

	_getItemStyle = () => {
		const { position } = this.state;
		return {
			...position.getLayout()
		};
	};

	_renderItem = (item, idx) => {
	    return (
	      <View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-end'}} key={`item_${idx}`}>
	        <Text style={{fontSize: 30}}>{item}</Text>
	      </View>
	    );
	}

	_renderCards = () => {
		const {height, markerColor, showMarker, markerWidth, markerHeight, lineColor} = this.props;
		const itemStyle = {
			position: 'absolute',
			height: height ? height : 75,
			width: 0.25 * width,
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'flex-end'
		};
		const activeMarker = {
			width: markerWidth ? markerWidth : 3,
			height: markerHeight ? markerHeight : 7,
			marginBottom: 2,
			marginTop: 5,
			backgroundColor: markerColor ? markerColor : 'red'
		}
		const inactiveMarker = {
			width: markerWidth ? markerWidth : 3,
			height: markerHeight ? markerHeight : 7,
			marginBottom: 2,
			marginTop: 5,
			backgroundColor: lineColor ? lineColor : 'rgba(30, 30, 30, 0.08)'
		};
		const data = [null, ...this.props.data, null];
		return data
			.map((item, i) => {
				if (i === 0 || i > this.props.data.length) {
					return (
						<View
							key={`unique_item_${i}`}
							style={[itemStyle, {left: (i + 1 - this.state.index) * 0.33 * width}]}
						>
							
							{showMarker && <View style={[inactiveMarker, {backgroundColor: 'transparent'}]}/>}
						</View>
					);
				}

				if (i === this.state.index) {
					return (
						<View
							key={`unique_item_${i}`}
							style={[itemStyle, {left: 0.33 * width}]}
						>
							{this._renderItem(item, i)}
							{showMarker && <View style={activeMarker}/>}
						</View>
					);
				}

				return (
					<View
						key={`unique_item_${i}`}
						style={[
							itemStyle,
							{
								left: (i + 1 - this.state.index) * 0.33 * width
							}
						]}
					>
						<View style={{opacity: 0.15}}>{this._renderItem(item, i)}</View>
						{showMarker && <View style={[inactiveMarker]}/>}
					</View>
				);
			})
			.reverse();
	};

	render() {
		const {height, lineColor, lineWidth} = this.props;
		const containerStyle = {
			width: width, 
			height: height ? height : 78,
			borderBottomWidth: lineWidth ? lineWidth : 3,
			borderBottomColor: lineColor ? lineColor : 'rgba(30, 30, 30, 0.15)'
		};

		return (
			<View style={containerStyle}>
				<Animated.View style={[ this._getItemStyle()]} {...this.state.panResponder.panHandlers}>
					{this._renderCards()}
				</Animated.View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
			container: {
				flex: 1
			},
});


List.defaultProps = {
	onSwipeLeft: item => {},
	onSwipeRight: item => {}
};

export default List;
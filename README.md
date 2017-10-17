# React Native Datetime Picker

Datetime picker component for android and ios


<!-- <img align="left" width="360px" src="https://github.com/franciscofsales/react-native-animated-list/raw/master/react-native-animated-list.gif"> -->

### Example

Demo is under examples folder

To build and run a example app:

```bash
git clone https://github.com/franciscofsales/react-native-datetime-picker

cd react-native-datetime-picker/examples/simple

npm install
```

To run on iOS:

```bash
react-native run-ios
```

To run on Android:

```bash
react-native run-android
```

### Installation

#### Using npm:

```sh
$ npm install --save react-native-datetime-picker
```


### Usage

```jsx
import React, { Component } from 'react';



render() {
  return (
    
  );
}
```

#### Props

| Prop | Type | Description |
|---|---|---|
|**`animation`**|`string<opacity|scale|slideLeft|slideRight>`|Animation preset.|
|**`duration`**|`number`|Length of animation in milliseconds. _Default 300._|
|**`animationFunc`**|`() => Animated animation object`|Function to define a custom animation.|
|**`renderRow`**|`() => ReactElement<any>`|Function to render a row.|
|**`onRemove`**|`() => ReactElement<any>`|Function to delete a row.|



### Contributing
All contributions are very appreciated <3.


### License
[MIT](https://raw.githubusercontent.com/franciscofsales/react-native-datetime-picker/master/LICENSE)

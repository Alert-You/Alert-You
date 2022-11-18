import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Animated,
  TouchableOpacity
} from 'react-native';

class RecordingAnimation extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      prevIsActive: false,
      animated: new Animated.Value(0),
      opacityA: new Animated.Value(1),
    }
  }
  _runAnimation() {
    const { animated, opacityA } = this.state;

    Animated.loop(
      Animated.parallel([
        Animated.timing(animated, {
          useNativeDriver: false,
          toValue: 1,
          duration: 1000,

        }),
        Animated.timing(opacityA, {
          useNativeDriver: false,
          toValue: 0,
          duration: 1000,
        })
      ])
    ).start();
  }
  _stopAnimation() {
    const { animated, opacityA } = this.state;
    Animated.loop(
      Animated.parallel([
        Animated.timing(animated, {
          useNativeDriver: false,
          toValue: 0,
          duration: 1000
        }),
        Animated.timing(opacityA, {
          useNativeDriver: false,
          toValue: 0,
          duration: 1000
        })
      ])
    ).stop();
  }
  _micButton() {
    const { animated, opacityA } = this.state;
    if (this.props.isActive) {
      //some function
      this._runAnimation();
      return (
        <Animated.View style={{
          width: 200,
          height: 200,
          borderRadius: 100,
          backgroundColor: 'rgba(153,0,0,0.4)',
          opacity: opacityA,
          transform: [
            {
              scale: animated
            }
          ]
        }}>
          {/* icon or image */}
        </Animated.View>
      );
    } else {
      //some function
      return (
        <View style={{
          width: 100,
          height: 100,
          borderRadius: 50,
          backgroundColor: 'rgba(153,0,0,0.4)',
        }}>
          {/* icon or image */}
        </View>
      );
    }
  }

  _checkChangeIsActive() {
    if(this.props.isActive === this.state.prevIsActive) return (<View style={{
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: 'rgba(153,0,0,0.4)',
    }}>
      {/* icon or image */}
    </View>);
    this.setState({
      prevIsActive: this.props.isActive,
    })
    return this._micButton();
  }

  render() {
    return (
      <View style={styles.container}>
        {this._checkChangeIsActive()}
      </View>
    );
  }
}

export default RecordingAnimation;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },

});
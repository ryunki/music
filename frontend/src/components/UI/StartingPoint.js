import React, {useRef, useEffect, useState} from 'react'
import {Animated, Text, View, StyleSheet, PanResponder} from 'react-native'
import Svg, { Path } from 'react-native-svg'

const StartingPoint = ({positionX, positionY}) => {
  const translateX = useRef(new Animated.Value(-20)).current
  const [isVisible, setIsVisible] = useState(true);

  // spring effect when first visits the page
  useEffect(() => {
    Animated.spring(translateX, {
      toValue: 0,
      bounciness:20,
      useNativeDriver: false, // set to true if possible
    }).start()

    setTimeout(()=>{
      setIsVisible(false)
    },1000)
  }, [])

  return (<>
    {isVisible &&
      <Animated.View // Special animatable View
          style={[styles.startingPoint, {top:positionY, left:positionX, transform: [{ translateX }]}]}
        >
        <Svg width={24} height={24} viewBox="-5 0 24 24" xmlns="http://www.w3.org/2000/svg">
          {/* <Path d="m 0 0 H 12 m 0 0 L 5 -5 m 0 0 L 5 5" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/> */}
          <Path d="M 0 0 H 12 M 0 0 L 5 -5 M 0 0 L 5 5" x={3} y={10} stroke="#391D8A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </Svg>
        <Text style={styles.startText}>Start</Text>
      </Animated.View>
    }
      </>
  );
};

const styles = StyleSheet.create({
  positionedView: {
    position: 'absolute',
    top: 100, // Set the top position in pixels
    left: 50, // Set the left position in pixels
  },
  startingPoint:{
    zIndex:1,
    // backgroundColor:'gray',
    position: 'absolute',
    flexDirection:'row',
  },
  startText:{
    color:'#5931CD'
  }
});

export default StartingPoint

import React, { useState } from 'react';
import {Text, StyleSheet} from 'react-native'
const textShadowOffset = {
  width: 2,
  height: 2,
}
const StrokedText = ({text}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [position2, setPosition2] = useState({ x: 0, y: 0 });
  const [position3, setPosition3] = useState({ x: 0, y: 0 });
  const [position4, setPosition4] = useState({ x: 0, y: 0 });

  const handleTextLayout = (event) => {
    const { x, y } = event.nativeEvent.layout;
    setPosition({ x, y });
  };
  const handleTextLayout2 = (event) => {
    const { x, y } = event.nativeEvent.layout;
    setPosition2({ x, y });
  };
  const handleTextLayout3 = (event) => {
    const { x, y } = event.nativeEvent.layout;
    setPosition3({ x, y });
  };
  const handleTextLayout4 = (event) => {
    const { x, y } = event.nativeEvent.layout;
    setPosition4({ x, y });
  };
 
  console.log('position: ',position)
  console.log('position2: ',position2)
  console.log('position3: ',position3)
  console.log('position4: ',position4)
  return (
    <>
    <Text onLayout={handleTextLayout} style={[styles.textTitle]}>{text} </Text>
    <Text onLayout={handleTextLayout2} style={[styles.textTitle, styles.abs, {textShadowOffset: {width: textShadowOffset.width, height: -textShadowOffset.height}}]}>{text} </Text> 
    <Text onLayout={handleTextLayout3} style={[styles.textTitle, styles.abs, {textShadowOffset: {width: -textShadowOffset.width, height: textShadowOffset.height}, transform: [{ translateX: 6.3 }]}]}>{text}  </Text> 
    <Text onLayout={handleTextLayout4} style={[styles.textTitle, styles.abs, {textShadowOffset: {width: -textShadowOffset.width, height: -textShadowOffset.height}, transform: [{ translateX: 6.3 }]}]}>{text}  </Text> 
    </>
  )
}

export default StrokedText

const styles = StyleSheet.create({
  textTitle: {
    fontSize: 40,
    color: '#FFF500',
    textShadowColor: 'black',
    textShadowRadius: 2,
    textShadowOffset: {
      width: textShadowOffset.width,
      height: textShadowOffset.height,
    },
    // width:'100%',
    textAlign:'center'
  },
  abs: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
})
import {useState, useEffect, useRef}from 'react'

import { ImageBackground, Dimensions , StyleSheet, View, PanResponder, Pressable} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import Svg, { Path, Line, Circle, Text} from 'react-native-svg'

import { useHeaderHeight } from '@react-navigation/elements'
import CustomPath from './CustomPath'
import { COLOR, SPACING } from '../../theme/theme'

import { answerPath } from '../../store/features/drawing/drawingSlice'
import useDraw from '../hooks/useDraw'

const CustomDrawingPage2 = (props) => {

  const handlePanResponderFirstTouch = (event, gestureState) => {
    const { x0, y0 } = gestureState
    props.handleFirstTouch(x0, y0)
  }

  // this function runs whenever user touches the screen
  const handlePanResponderDraw = (event, gestureState) => {
    const { moveX, moveY } = gestureState
    props.handleDraw(moveX, moveY)
  }
  
  // this function runs whenever user release touch from the screen
  const handlePanResponderRelease = () => {
    props.handleReleaseTouch()  
  }

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: handlePanResponderFirstTouch,
    onPanResponderMove: handlePanResponderDraw,
    // user shouldnt be able to draw,
    // if modal is visible, and if user has completed the drawing
    onPanResponderMove: (!props.modalVisible && !props.isCompleted) && handlePanResponderDraw,
    onPanResponderRelease: handlePanResponderRelease,
  })
  return (
    <>
      <View {...panResponder.panHandlers} style={styles.container}>
        <Svg height="100%" width="100%">
          <CustomPath paths={props.paths} currentPath={props.currentPath} color='black' thickness={props.thickness}/>
          {props.children}
        </Svg>
      </View>
     </>
  )
}

export default CustomDrawingPage2


const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width:'100%',
  },
  eraseButton: {
    position: 'absolute',
    bottom: SPACING.space_20,
    // left: Dimensions.get('window').width / 2,
    left: '50%',
    // transform: [{ translateX: -45 }], // Adjust the translation based on the button width
    backgroundColor: COLOR.blue300,
    padding: SPACING.space_10,
    borderRadius: SPACING.space_10,
    alignItems: 'center',
    justifyContent: 'center',
    // width:100
   },
});
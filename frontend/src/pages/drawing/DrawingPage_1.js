import { useState, useEffect, useRef } from 'react'

import {
  ImageBackground,
  Dimensions,
  StyleSheet,
  View,
  PanResponder,
  Pressable,
  Text,
} from 'react-native'

import Svg, { Path, Line, Circle} from 'react-native-svg'
import { useHeaderHeight } from '@react-navigation/elements'
import CustomDrawingPage from '../../components/CustomDrawingPage'

import drawing_1 from '../../../assets/drawing/drawing_1.jpg'

import { COLOR, SPACING } from '../../../theme/theme'
import CircleOnLine from './components/CircleOnLine'
import CircleWithinLine from './components/CircleWithinLine'

const image = drawing_1

const DrawingPage_1 = () => {
  // without this header height. the drawing will begin from below where user touched


  return (
    <CustomDrawingPage>
      {/* <Path
        d='M 0 0 L 50 50 L 100 0 L 150 50 L 200 0 L 250 50' 
        fill="none" 
        stroke='black'
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={dashArray}
        x={screenWidth / 2}
        y={screenHeight / 2}
        scale={screenWidth/500}
        /> */}
      <CircleOnLine numberOfset={2}/>
      <CircleWithinLine numberOfset={2}/>
    </CustomDrawingPage>
  )
}

export default DrawingPage_1

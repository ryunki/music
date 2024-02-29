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
import CircleOnLine from './components/drawingPage_1/CircleOnLine'
import CircleWithinLine from './components/drawingPage_1/CircleWithinLine'

const image = drawing_1

const DrawingPage_1 = () => {
  // without this header height. the drawing will begin from below where user touched

  return (
    <CustomDrawingPage>
        <CircleOnLine numberOfset={2}/>
        <CircleWithinLine numberOfset={2}/>
    </CustomDrawingPage>
  )
}

export default DrawingPage_1

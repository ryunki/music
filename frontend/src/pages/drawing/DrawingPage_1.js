import {useState, useEffect, useRef}from 'react'

import { ImageBackground, Dimensions , StyleSheet, View, PanResponder, Pressable, Text} from 'react-native'
import Svg, { Path } from 'react-native-svg'
import { useHeaderHeight } from '@react-navigation/elements'
import CustomPath from '../../components/CustomPath'
import { COLOR, SPACING } from '../../../theme/theme'
import CustomDrawingPage from '../../components/CustomDrawingPage'

import drawing_1 from '../../../assets/drawing/drawing_1.jpg'
const image = drawing_1

const DrawingPage_1 = () => {

  return (
    <CustomDrawingPage image={image}/>
  )
}

export default DrawingPage_1

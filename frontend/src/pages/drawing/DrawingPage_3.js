import {useState, useEffect, useRef}from 'react'

import { ImageBackground, Dimensions , StyleSheet, View, PanResponder, Pressable, Text} from 'react-native'
import Svg, { Path } from 'react-native-svg'
import { useHeaderHeight } from '@react-navigation/elements'
import CustomPath from '../../components/CustomPath'
import { COLOR, SPACING } from '../../../theme/theme'
import CustomDrawingPage from '../../components/CustomDrawingPage'

import drawing_3 from '../../../assets/drawing/drawing_3.jpg'
const image = drawing_3

const DrawingPage_3 = () => {

  return (
    <CustomDrawingPage image={image}/>
  )
}

export default DrawingPage_3

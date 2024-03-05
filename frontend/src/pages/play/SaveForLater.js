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

import { COLOR, SPACING } from '../../../theme/theme'
import CircleOnLine from './components/CircleOnLine'
import CircleWithinLine from './components/CircleWithinLine'


const SaveForLater = () => {
  return (
    <CustomDrawingPage>
        <CircleOnLine numberOfset={2}/>
        <CircleWithinLine numberOfset={2}/>
    </CustomDrawingPage>
  )
}

export default SaveForLater
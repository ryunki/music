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

import Svg, { Path, Line, Circle, SvgUri, SvgXml } from 'react-native-svg'
import { useHeaderHeight } from '@react-navigation/elements'

import { COLOR, SPACING } from '../../../theme/theme'
import { screenSize } from '../../../utils/screenFunctions'
import TrebleClef from "../../../assets/play/treble_clef.svg";
// phone
const SMALLEST_MOBILE = 3.2
const SMALL_MOBILE = 3.7
// Tablet
const MEDIUM_MOBILE = 4.8
const LARGE_MOBILE = 5.2

const PlayPage_3 = () => {
  const {screenHeight, screenWidth} = screenSize()
  console.log(screenHeight, screenWidth)
  // without this header height. the drawing will begin from below where user touched
  function adjustedX () {
    if(screenWidth < 375){
      // the width of the SVG used for this page is 100 pixels
      // when it is scaled to 2.7 SVG's width scales to 270 pixels. half of it would be 135
      // this would center the SVG in the screen width
      return screenWidth / 2 
    }else if(screenWidth >= 375 && screenWidth < 414){
      return screenWidth / 2
    }else if(screenWidth >= 414 && screenWidth < 600){
      return screenWidth / 2
    }else if(screenWidth >= 600){
      return screenWidth / 2
    }
  }
  function adjustedY () {
    if(screenWidth < 375){
      // the width of the SVG used for this page is 100 pixels
      // when it is scaled to 2.7 SVG's width scales to 270 pixels. half of it would be 135
      // this would center the SVG in the screen width
      return screenHeight / 2 - 100
    }else if(screenWidth >= 375 && screenWidth < 414){
      return screenHeight / 2 - 150
    }else if(screenWidth >= 414 && screenWidth < 600){
      // return screenWidth / 2 - (MEDIUM_MOBILE * 100 / 2)
      return screenHeight / 2 - 200
    }else if(screenWidth >= 600){
      return screenHeight / 2 - 300
    }
  }
  
  return (
    <View>
      <Svg>
        <Path 
          d='m 0 0 c -2.6875 -0.1523 -5.4297 -1.7969 -7.0703 -3.6836 c -1.9023 -2.1875 -2.6836 -5.1602 -2.4844 -7.6016 c 0.5898 -7.1758 8.5898 -11.418 11.5508 -14.5508 c 1.9805 -2.0977 2.3945 -3.1211 2.8398 -4.1992 c 0.8555 -2.0898 0.9922 -4.5352 -0.707 -4.7188 c -1.6211 -0.1758 -2.9531 2.3125 -3.5508 4.0156 c -0.5352 1.5273 -0.8906 3.0625 -0.5703 5.3711 c 0.1445 1.0352 4.1328 29.9492 4.2031 30.3945 c 0.6719 4.4805 -1.957 6.3359 -4.6367 6.6641 c -5.7852 0.7109 -7.6445 -5.0273 -5.0508 -7.207 c 2 -1.6758 4.9023 -0.2344 4.7461 2.5234 c -0.1367 2.4414 -2.5938 2.5156 -3.2227 2.457 c 0.9648 1.6875 8.2266 2.5664 7.1094 -5.0469 c -0.1563 -1.0703 -3.8398 -28.2422 -3.9297 -28.8516 c -0.6797 -4.5508 -0.7813 -8.1523 1.6484 -12.3594 c 0.8984 -1.5508 2.3164 -2.5547 3.0117 -2.4219 c 0.1563 0.0273 0.3086 0.082 0.4297 0.207 c 1.8633 1.8711 2.4336 6.0313 2.2305 8.418 c -0.207 2.4453 -0.3242 4.9766 -2.8164 7.9258 c -0.9648 1.1445 -3.9063 3.6602 -5.5938 5.1055 c -2.3711 2.0313 -4.0898 3.8047 -5.0234 5.9453 c -1.043 2.4063 -1.2227 5.4336 1.1406 8.1211 c 1.3594 1.5156 3.6133 2.5938 5.5078 2.6172 c 5.2773 0.0625 6.8164 -2.4727 6.8633 -5.3438 c 0.082 -4.7305 -5.7695 -6.5195 -8.1758 -3.2695 c -1.3945 1.8867 -0.7813 3.8711 0.1563 4.8164 c 0.3203 0.3242 0.6797 0.5703 1.0195 0.707 c 0.1211 0.0508 0.4141 0.1836 0.3281 0.375 c -0.0664 0.1602 -0.1992 0.168 -0.3203 0.1563 c -1.5195 -0.1797 -3.1992 -1.5938 -3.6094 -4.0273 c -0.6055 -3.5469 2.6055 -7.7578 7.1875 -7.0664 c 2.9961 0.4492 5.7813 2.9648 5.5391 7.6563 c -0.2109 4.0156 -3.625 7.1602 -8.75 6.8711 z m 0 0'
          x={adjustedX()}
          y={adjustedY()}
          scale={1.5}
        />
      </Svg>
      {/* <TrebleClef/> */}
    </View>
  )
}

export default PlayPage_3

import {useState, useEffect, useRef}from 'react'

import { ImageBackground, Dimensions , StyleSheet, View, PanResponder, Pressable} from 'react-native'
import Svg, { Path, Text } from 'react-native-svg'
import { useHeaderHeight } from '@react-navigation/elements'
import CustomPath from '../../components/CustomPath'
import { COLOR, SPACING } from '../../../theme/theme'
import CustomDrawingPage from '../../components/CustomDrawingPage'

import { DASH, SCALE_WIDTH,SCALE_HEIGHT } from '../../../constants/constants'
import { screenSize } from '../../../utils/screenFunctions'
import { generatePathPattern_1,generatePathPattern_2 } from '../../../utils/pathPattern/patterns'


const PlayPage_2 = () => {
  const {screenHeight, screenWidth} = screenSize()

  // scaler according to screen size
  const scaleWidth = screenWidth / 8// Adjust the reference width as needed
  const scaleHeight = screenHeight / 8 // Adjust the reference width as needed
  console.log(scaleHeight)
  const renderPaths = () =>{
    return {
      fill:"none",
      stroke:COLOR.grey200,
      strokeWidth:2,
      strokeLinecap:"round",
      strokeLinejoin:"round",
      strokeDasharray:DASH,
      x:scaleWidth,
      y:scaleHeight,
      scale:screenWidth/500
    }
  }
  // console.log(generatePathPattern_1())
  return (
    <>
    <CustomDrawingPage>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Svg height="100" width="300">
            <Path
             d={`M 0 0 `+generatePathPattern_1()}
              {...renderPaths()}/>
          </Svg>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Svg height="100" width="300">
            <Path
             d={`M 0 0 `+generatePathPattern_2()}
              {...renderPaths()}/>
          </Svg>
        </View>

      {/* <Path
        d={'M'+generatePathPattern_1()}
        {...renderPaths()}
      />
      <Path
        d={'M'+generatePathPattern_1()}
        {...renderPaths()}
      /> */}
    </CustomDrawingPage>
    </>
  )
}

export default PlayPage_2

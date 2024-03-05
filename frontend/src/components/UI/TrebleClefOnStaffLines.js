import React from 'react'

import {
  DASH,
  NUMBER_OF_LINE,
  PATH_FOR_TREBLE_CLEF,
  SCALE_HEIGHT,
  SCALE_WIDTH,
} from '../../../constants/constants'
import { screenSize } from '../../../utils/screenFunctions'
import StaffLines from './StaffLines'
import { Path } from 'react-native-svg'

const TrebleClefOnStaffLines = (props) => {
  const { screenHeight, screenWidth } = screenSize()

  return (
    <>
      <StaffLines scaleHeight={props.scaleHeight} lineGap={props.lineGap} />
      {/* svg path of treble clef */}
      <Path
        // scale={props.scaleTrebleClef}
        opacity={0.1}
        x={props.trebleclefStartingPointX}
        y={props.trebleclefStartingPointY}
        strokeWidth='1'
        d={'M' + PATH_FOR_TREBLE_CLEF}
        stroke='#131516'
        fill='#131516'
      />
      {/* <Path
        scale={props.scaleTrebleClef}
        opacity={0.05}
        // x={props.trebleclefStartingPointX}
        // y={props.trebleclefStartingPointY}
        strokeWidth='50'
        d={'M' + PATH_FOR_TREBLE_CLEF}
        stroke='#131516'
        fill='#131516'
      /> */}
    </>
  )
}

export default TrebleClefOnStaffLines


import Svg, { G, Defs, Use, Path, Line, Circle} from 'react-native-svg'
import React from 'react'
import { DASH, NUMBER_OF_LINE, PATH_FOR_TREBLE_CLEF, SCALE_HEIGHT, SCALE_WIDTH } from '../../../constants/constants'
import { screenSize } from '../../../utils/functions'

const StaffLines = () => {
  const {screenHeight, screenWidth} = screenSize()

  const scaleWidth = screenWidth / SCALE_WIDTH // Adjust the reference width as needed
  
  const scaleHeight = screenHeight / SCALE_HEIGHT // Adjust the reference width as needed
  // set the line gap to screen height
  const lineGap = scaleHeight * 0.6
  // to scale the treble clef with the line gap of staff lines
  const scaleTrebleClef = lineGap *0.0017
  // treble clef's starting point of nth staff line
  const lineIdx = 3
  // place the treble clef in the correct position of Y on staff lines 
  const trebleclefStartingPointY = scaleHeight+lineIdx*lineGap* 0.775
  // place the treble clef in the center of screenwidth
  const trebleclefStartingPointX = screenWidth/2
 
  return (
    <>
      {/* <Defs> */}
        <G id="staffLines" y = {0}>
          {Array.from({length: NUMBER_OF_LINE}, (_, idx)=>{
            return <Line key={`staffLines-${idx}`} x1="0" y1={scaleHeight+idx*lineGap} x2={screenWidth} y2={scaleHeight+idx*lineGap} stroke="black" strokeWidth="1"/>
          })}
          <Path scale={scaleTrebleClef} opacity={0.05} x={trebleclefStartingPointX} y={trebleclefStartingPointY} strokeWidth='50' d={PATH_FOR_TREBLE_CLEF} stroke="#131516" fill="#131516" />
        </G>
      {/* </Defs>
      <Use href="#staffLines" x="0" y="0" /> */}
    </>
  )
}

export default StaffLines
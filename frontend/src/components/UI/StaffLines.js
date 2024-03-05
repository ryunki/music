
import Svg, { G, Defs, Use, Path, Line, Circle} from 'react-native-svg'
import React from 'react'
import { DASH, NUMBER_OF_LINE, PATH_FOR_TREBLE_CLEF, SCALE_HEIGHT, SCALE_WIDTH } from '../../../constants/constants'
import { screenSize } from '../../../utils/screenFunctions'

const StaffLines = ({scaleHeight,lineGap}) => {
  
  const {screenWidth, screenHeight} = screenSize()
 
  return (
    <>
      {/* <Defs> */}
        <>
          {Array.from({length: NUMBER_OF_LINE}, (_, idx)=>{
            return <Line key={`staffLines-${idx}`} x1="0" y1={scaleHeight+idx*lineGap} x2={screenWidth} y2={scaleHeight+idx*lineGap} stroke="black" strokeWidth="1"/>
          })}
        </>
      {/* </Defs>
      <Use href="#staffLines" x="0" y="0" /> */}
    </>
  )
}

export default StaffLines
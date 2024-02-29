import React from 'react'

import Svg, { Path, Line, Circle} from 'react-native-svg'
import { COLOR, SPACING } from '../../../../../theme/theme'
import {DASH, SCALE_HEIGHT, SCALE_WIDTH} from '../../../../../constants/constants'
import { screenSize } from '../../../../../utils/functions'

const CircleOnLine = ({numberOfset}) => {
  const {screenHeight, screenWidth} = screenSize()

  // scaler according to screen size
  const scaleWidth = screenWidth / SCALE_WIDTH // Adjust the reference width as needed
  const scaleHeight = screenHeight / SCALE_HEIGHT // Adjust the reference width as needed
  const circleRadius = 40 * scaleWidth // Adjust the initial radius as needed
  const numCircles = 3
  const gapBetweenCircles = 30 * scaleWidth; // Adjust the gap size as needed
  const totalWidth = numCircles * (2 * circleRadius + gapBetweenCircles) - gapBetweenCircles;
  const startX = (screenWidth - totalWidth) / 2
  
  // set the gap between the set of each circleOnLine 
  const gapBetweenSets = 1.5 * scaleHeight

  const renderCircles = (offsetY) => {
    return Array.from({ length: numCircles }, (_, idx) => ({
    cx: startX + circleRadius + idx * (2 * circleRadius + gapBetweenCircles),
    // cy: scaleHeight,
    cy: scaleHeight+offsetY,
    r: circleRadius,
    fill: 'none', stroke:COLOR.grey200, strokeDasharray: DASH
  }))
}

  return (
    <>
    {/* display set of circleOnLine */}
    {Array.from({length: numberOfset},(_, rowIdx)=>(
      <React.Fragment key={rowIdx}>
        <Line x1="0" y1={scaleHeight+rowIdx*gapBetweenSets} x2={screenWidth} y2={scaleHeight+rowIdx*gapBetweenSets} stroke="black" strokeWidth="1"/>
        {renderCircles(rowIdx*gapBetweenSets).map((circle, idx) => (
          <Circle key={`circleOnline-${rowIdx}-${idx}`} {...circle} />
          ))}
      </React.Fragment>
    ))}
    </>
  )
}

export default CircleOnLine

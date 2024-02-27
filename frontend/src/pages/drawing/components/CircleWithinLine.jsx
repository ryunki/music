import React from 'react'
import { useHeaderHeight } from '@react-navigation/elements'
import {Dimensions} from 'react-native'
import Svg, { Path, Line, Circle} from 'react-native-svg'
import { COLOR, SPACING } from '../../../../theme/theme'

const CircleWithinLine = ({numberOfset}) => {
  const headerHeight = useHeaderHeight();

  const {height, width} = Dimensions.get('window')
  const screenHeight = height - headerHeight
  const screenWidth = width

  const dashArray = '5 5'

  // scaler according to screen size
  const scaleWidth = screenWidth / 375 // Adjust the reference width as needed
  const scaleHeight = screenHeight / 8 // Adjust the reference height as needed
  const circleRadius = 40 * scaleWidth // Adjust the initial radius as needed
  const numCircles = 3
  const gapBetweenCircles = 30 * scaleWidth; // Adjust the gap size as needed
  const totalWidth = numCircles * (2 * circleRadius + gapBetweenCircles) - gapBetweenCircles;
  const startX = (screenWidth - totalWidth) / 2

  // starting point of display on Y-axis
  const startY = (screenHeight / 2) - (scaleHeight/2)
  // console.log('screenHeight: ',screenHeight, ' startY: ',startY, ' scaleHeight:',scaleHeight)
  // gap between the set of each circleOnLine display
  const gapBetweenSets = 1.5 * scaleHeight

  const renderCircles = (offsetY) => {
    return Array.from({ length: numCircles }, (_, idx) => ({
    cx: startX + circleRadius + idx * (2 * circleRadius + gapBetweenCircles),
    // cy: scaleHeight,
    cy: scaleHeight+offsetY,
    r: circleRadius,
    fill: 'none', stroke:COLOR.grey200, strokeDasharray:dashArray
  }))
}

  return (
    <>
    {/* display set of circleOnLine */}
    {Array.from({length: numberOfset},(_, rowIdx)=>(
      <>
        {/* the top line */}
        <Line x1="0" y1={rowIdx*gapBetweenSets+startY+scaleHeight-circleRadius} x2={screenWidth} y2={rowIdx*gapBetweenSets+startY+scaleHeight-circleRadius} stroke="black" strokeWidth="1"/>
        {renderCircles(rowIdx*gapBetweenSets+startY).map((circle, idx) => (
          <Circle key={`circleWithinLine-${rowIdx}-${idx}`} {...circle} />
          ))}
        {/* the bottom line */}
        <Line x1="0" y1={rowIdx*gapBetweenSets+startY+scaleHeight+circleRadius} x2={screenWidth} y2={rowIdx*gapBetweenSets+startY+scaleHeight+circleRadius} stroke="black" strokeWidth="1"/>
      </>
    ))}
    </>
  )
}

export default CircleWithinLine

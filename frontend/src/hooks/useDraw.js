import React, { useEffect, useState } from 'react'
import { PanResponder } from 'react-native'

const useDraw = () => {
  const [paths, setPaths] = useState([])
  const [currentPath, setCurrentPath] = useState('')
  
  const handleFirstTouch = (event, gestureState) => {
    const { x0, y0 } = gestureState
    // this allows user to create a dot when just touched 
    setCurrentPath(`${x0} ${y0} ${x0} ${y0}`)
    // removes all the paths whenever user touches the screen
    setPaths([])
    const currPath = [x0, y0]
    // console.log('handleFirstTouch: ',x0, y0 )
  }

  // this function runs whenever user touches and move along the screen
  const handleDraw = (event, gestureState) => {
    const { moveX, moveY } = gestureState
    // const newPathSegment = ` ${moveX} ${moveY-headerHeight}`;
    // setCurrentPath((prevPath) => (prevPath ? prevPath + newPathSegment : `${moveX} ${moveY-headerHeight}`))
    const newPathSegment = ` ${moveX} ${moveY}`
    setCurrentPath((prevPath) => (prevPath ? prevPath + newPathSegment : `${moveX} ${moveY}`))
    // calculates how much a user completed the drawing 
    const currPath = currentPath.split(' ')
    // console.log('handleDraw: ',currentPath )
  }
  
  // this function runs whenever user release touch from the screen
  const handlePanResponderRelease = () => {
    setPaths((prevPaths) => [...prevPaths, currentPath])
    // setCurrentPath('')
}
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: handleFirstTouch,
    onPanResponderMove: handleDraw,
    onPanResponderRelease: handlePanResponderRelease,
  })

  return {paths,setPaths, currentPath, panResponder, handleFirstTouch, handleDraw, handlePanResponderRelease}
}

export default useDraw
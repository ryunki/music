import { screenSize } from "../screenFunctions"

const { screenHeight, screenWidth } = screenSize()
// convert ["123","234","234","345"]
// into [{x:123, y:234}, {x:234, y:345}]
// convert the actual paths of the answer path to the scaled version. 
// user drawn path will be compared to this
export const convertPathToObjectArray = (pathArray) =>{
  let convertedPath = []
  let j = 1
  for (let i = 0; i < pathArray.length; i += 2){
    let x,y = ''
    x = (pathArray[i] * adjustedScale() + adjustedCoordsForPath(i,adjustedX)).toFixed(1)
    y = (pathArray[j] * adjustedScale() + adjustedCoordsForPath(j,adjustedX)).toFixed(1)
    convertedPath = [...convertedPath, {x, y}]
    j+=2
  }
  return convertedPath
}

const adjustedCoordsForPath = (idx,adjustedX) =>{
  if(idx % 2 === 0){
    return adjustedX()
  }else{
    return screenHeight/2 - scaleHeight
  }
}
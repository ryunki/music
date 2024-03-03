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
import Svg, { Path, G, Defs, Use } from 'react-native-svg'
import { useHeaderHeight } from '@react-navigation/elements'
import CustomPath from '../../components/CustomPath'
import { COLOR, SPACING } from '../../../theme/theme'
import CustomDrawingPage from '../../components/CustomDrawingPage'
import TrebleClefOnStaffLines from '../../components/UI/TrebleClefOnStaffLines'

import drawing_3 from '../../../assets/drawing/drawing_3.jpg'
import {
  PATH_FOR_TREBLE_CLEF,
  CORRECT_PATH_TREBLE_CLEF,
  SCALE_HEIGHT,
  SCALE_WIDTH,
} from '../../../constants/constants'
import { screenSize } from '../../../utils/screenFunctions'
import { calculateDistance } from '../../../utils/functions/calculateDistance'

import { useDispatch, useSelector } from 'react-redux'
import { pathDataProgress } from '../../../store/features/drawing/drawingSlice'

const image = drawing_3

// phone
const SMALLEST_MOBILE = 3.2
const SMALL_MOBILE = 3.7
// Tablet
const MEDIUM_MOBILE = 4.8
const LARGE_MOBILE = 5.2

const DrawingPage_3 = () => {
  const [isPathCorrect, setIsPathCorrect] = useState({isCompleted:false, progress:0})
  // const [answerPathData, setAnswerPathData] = useState([])
  const { screenHeight, screenWidth } = screenSize()
  
  const pathData = useSelector((state) => state.pathDataProgress.path)
  const dispatch = useDispatch()
  //  to get the total length of the answerpath for indicating progress
  const ANSWER_PATH = convertPathToObjectArray(CORRECT_PATH_TREBLE_CLEF.split(' '))

  const headerHeight = useHeaderHeight()
  const scaleHeight = screenHeight / SCALE_HEIGHT
  // console.log('screenHeight, scaleHeight: ',screenHeight, scaleHeight)
  const lineGap = scaleHeight * 0.6
  // console.log('lineGap: ',lineGap)
  const scaleTrebleClef = lineGap * 0.0017
  // console.log('scaleTrebleClef: ', scaleTrebleClef)
  // treble clef's starting point of nth staff line
  const lineIdx = 3
  // place the treble clef in the correct position of Y on staff lines
  const trebleclefStartingPointY = scaleHeight + lineIdx * lineGap * 0.775
  // place the treble clef in the center of screenwidth
  const trebleclefStartingPointX = screenWidth / 2
  const trebleCorrectPathStartingPointY = scaleHeight + lineIdx * lineGap * 0.775 + headerHeight
  // console.log(trebleclefStartingPointX, trebleclefStartingPointY, headerHeight)
  
  const calculateAccuracy = (currPath) =>{
    const accuracy = 0
    const convertedAnswerPath = pathData
    // const convertedAnswerPath = convertPathToObjectArray(CORRECT_PATH_TREBLE_CLEF.split(' '))
    // console.log('convertAnswerPath: ',convertAnswerPath())
    let convertedUserPath = []
    let j = 1
    for (let i = 0; i < currPath.length; i += 2){
      let x,y = ''
      x = currPath[i] 
      y = currPath[j] 
      convertedUserPath = [...convertedUserPath, {x, y}]
      j+=2
    }
    const firstAnswerCoord = convertedAnswerPath[0]
    const recentUserCoord = convertedUserPath[convertedUserPath.length-1]
    // calculateDistance() takes {x:0, y:0} as parameter
    let distance
    if(firstAnswerCoord){
      distance = calculateDistance(firstAnswerCoord, recentUserCoord)
      if(distance < 10){
        console.log('correct')  
        const path = convertedAnswerPath.slice(1)
        const progressPercentage = Math.abs((path.length/ANSWER_PATH.length * 100).toFixed(0)- 100)
        setIsPathCorrect({isCompleted:false, progress:progressPercentage})
        dispatch(pathDataProgress(path))
      }
    }else{
      console.log('completed')
      setIsPathCorrect({isCompleted:true, progress:100})
    }
    return distance
  }
  
  function adjustedCoordsForPath(idx){
    if(idx % 2 === 0){
      return adjustedX()
    }else{
      return screenHeight/2 - scaleHeight
    }
  }
  // convert string path to an object array
  // [{x:123,y:123},{...}]
  function convertPathToObjectArray (pathArray) {
    let convertedPath = []
    let j = 1
    for (let i = 0; i < pathArray.length; i += 2){
      let x,y = ''
      x = (pathArray[i] * adjustedScale() + adjustedCoordsForPath(i)).toFixed(1)
      y = (pathArray[j] * adjustedScale() + adjustedCoordsForPath(j)).toFixed(1)
      convertedPath = [...convertedPath, {x, y}]
      j+=2
    }
    return convertedPath
  }

  const totalDistanceOfPath = (currPath = null) => {
    let convertedPath = []
    if(currPath){
      convertedPath = convertPathToObjectArray(currPath)
    }else{
      CORRECT_PATH_TREBLE_CLEF.split(' ')
      convertedPath = convertPathToObjectArray(CORRECT_PATH_TREBLE_CLEF.split(' '))
    }
    // console.log('answerPath: ',answerPath)
    let totalDistance = 0;
    for (let i = 0; i < convertedPath.length - 1; i++) {
      const point1 = convertedPath[i];
      const point2 = convertedPath[i + 1];
      totalDistance += calculateDistance(point1, point2)
    }
    return totalDistance.toFixed(0)
  }
  
// change the size of SVG graphic according to width
function adjustedScale () {
  if(screenWidth < 375){
    return SMALLEST_MOBILE
  }else if(screenWidth >= 375 && screenWidth < 414){
    return SMALL_MOBILE
  }else if(screenWidth >= 414 && screenWidth < 600){
    return MEDIUM_MOBILE
  }else if(screenWidth >= 600){
    return LARGE_MOBILE
  }
}
function adjustedX () {
  if(screenWidth < 375){
    // the width of the SVG used for this page is 100 pixels
    // when it is scaled to 2.7 SVG's width scales to 270 pixels. half of it would be 135
    // this would center the SVG in the screen width
    return screenWidth / 2 - (SMALLEST_MOBILE * 100 / 2)
  }else if(screenWidth >= 375 && screenWidth < 414){
    return screenWidth / 2 - (SMALL_MOBILE * 100 / 2)
  }else if(screenWidth >= 414 && screenWidth < 600){
    return screenWidth / 2 - (MEDIUM_MOBILE * 100 / 2)
  }else if(screenWidth >= 600){
    return screenWidth / 2 - (LARGE_MOBILE * 100 / 2)
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
console.log(screenWidth, screenHeight)
  const originalScreenWidth = 360; // Replace with the original width of your design
  const xOffset = (screenWidth - originalScreenWidth) / 2

  console.log('totalDistance: ',totalDistanceOfPath())

  return (
    <CustomDrawingPage thickness={14} dispatch={dispatch} calculateAccuracy={calculateAccuracy} totalDistanceOfPath={totalDistanceOfPath} convertPathToObjectArray={convertPathToObjectArray}>
      {/* <TrebleClefOnStaffLines scaleHeight={scaleHeight} lineGap={lineGap} scaleTrebleClef={scaleTrebleClef} lineIdx={lineIdx} trebleclefStartingPointY={trebleclefStartingPointY} trebleclefStartingPointX={trebleclefStartingPointX}/>
      <G scale={1}> 
        <Path scale={1} d={'M'+adjustCoords()}  fill="none" 
          stroke='black'
          strokeWidth={5} 
          strokeLinecap="round"
          strokeLinejoin="round"
          />
      </G> */}
      <Defs>
        <G id='treble-clef-on-staff-line' scale={adjustedScale()}>
          <Path d='M6.25,51.25h22.933c1.612,0,1.612-2.5,0-2.5H6.25C4.638,48.75,4.638,51.25,6.25,51.25z' />
          <Path d='M93.75,48.75H66.549c-1.612,0-1.612,2.5,0,2.5H93.75C95.362,51.25,95.362,48.75,93.75,48.75z' />
          <Path d='M93.75,33.75H61.791c-1.612,0-1.612,2.5,0,2.5H93.75C95.362,36.25,95.362,33.75,93.75,33.75z' />
          <Path d='M6.25,36.25h33.863c1.612,0,1.612-2.5,0-2.5H6.25C4.638,33.75,4.638,36.25,6.25,36.25z' />
          <Path d='M93.75,18.75h-27.5c-1.612,0-1.612,2.5,0,2.5h27.5C95.362,21.25,95.362,18.75,93.75,18.75z' />
          <Path d='M6.25,21.25h35c1.612,0,1.612-2.5,0-2.5h-35C4.638,18.75,4.638,21.25,6.25,21.25z' />
          <Path d='M93.75,63.75H71.962c-1.612,0-1.612,2.5,0,2.5H93.75C95.362,66.25,95.362,63.75,93.75,63.75z' />
          <Path d='M6.25,66.25h21.729c1.612,0,1.612-2.5,0-2.5H6.25C4.638,63.75,4.638,66.25,6.25,66.25z' />
          <Path d='M6.25,81.25h30.023c1.612,0,1.612-2.5,0-2.5H6.25C4.638,78.75,4.638,81.25,6.25,81.25z' />
          <Path d='M93.75,78.75H65.125c-1.612,0-1.612,2.5,0,2.5H93.75C95.362,81.25,95.362,78.75,93.75,78.75z' />
          <Path d='M35.932,48.399c-4.004,5.975-4.502,13.816-1.327,20.264c3.58,7.271,11.538,12.078,19.697,10.29  c0.423,3.5,1.491,8.62-3.187,9.638c0.849-3.811-2.974-7.16-6.641-5.769c-3.656,1.387-4.17,6.156-1.33,8.612  c2.868,2.48,7.25,2.939,10.712,1.548c3.627-1.457,5.929-5.145,5.929-9.018c0-2.291-0.376-4.588-0.671-6.855  c5.41-3.111,8.817-9.2,7.632-15.467c-1.108-5.859-5.972-10.573-12.015-10.893c-0.678-3.995-1.402-8.321-2.137-12.861  c4.58-4.896,8.593-10.707,8.655-17.867c0.035-4.017-0.441-8.82-4.233-13.999c-0.736-1.003-2.097-1.312-3.193-0.729  c-7.03,3.749-9.125,13.59-6.555,30.908c-1.208,1.206-2.447,2.374-3.652,3.511C40.274,42.863,37.379,45.593,35.932,48.399   M35.932,48.399 M35.932,48.399 M58.115,56.89c2.319,1.581,3.763,4.209,3.869,7.013c0.115,3.033-1.412,5.789-3.698,7.705  c-0.509-3.132-2.425-14.254-2.677-15.72C56.524,56.062,57.385,56.392,58.115,56.89C60.073,58.225,57.385,56.392,58.115,56.89z   M54.359,11.147c1.572,2.929,1.918,5.71,1.891,8.831c-0.036,4.181-1.928,7.914-4.575,11.326  C50.562,21.144,51.461,14.391,54.359,11.147z M47.046,43.351c0.392-0.369,0.789-0.744,1.19-1.124c0.525,3.192,1.04,6.258,1.53,9.149  c-3.787,1.187-7.01,4.095-7.775,8.101c-0.724,3.791,0.916,7.744,4.1,9.916c1.141,0.778,2.696,0.483,3.474-0.657  s0.484-2.695-0.657-3.474c-1.531-1.043-2.333-2.93-2.019-4.758c0.342-1.992,1.923-3.402,3.731-4.123  c0.274,1.594,0.536,3.118,0.785,4.563c0.889,5.161,1.659,9.628,2.196,13.041c-7.741,1.914-14.699-4.492-15.896-11.858  c-0.532-3.273,0.021-6.681,1.579-9.609C41.223,48.877,44.073,46.154,47.046,43.351z' />
        </G>
      </Defs>
      {/* <Use
        href='#treble-clef-on-staff-line'
        x={adjustedX()}
        y={0}
      /> */}
      <Use
        href='#treble-clef-on-staff-line'
        // transform='scale(2.5) translate(-100, -0)'
        x={adjustedX()}
        y={adjustedY()}
        opacity={0.1}
      />
      {/* path for checking answer */}
      {/* <Path
        scale={adjustedScale()}
        // scale={1}
        // d={'M' + adjustCoords()}
        d={'M' + CORRECT_PATH_TREBLE_CLEF}
        fill='none'
        stroke='black'
        strokeWidth={5}
        strokeLinecap='round'
        strokeLinejoin='round'
        x={adjustedX()}
        y={adjustedY()}
        opacity={0.1}
      /> */}
      <View style={styles.progression}>
        {isPathCorrect.isCompleted ? 
          <Text style={styles.text}>Correct!!</Text>
          :
          <Text style={styles.text}>{isPathCorrect.progress}</Text>
        }
      </View>
    </CustomDrawingPage>
  )
}

export default DrawingPage_3

const styles = StyleSheet.create({
  progression:{
    // flex:1,
    backgroundColor:COLOR.blue300,
    justifyContent:'center',
    alignItems:'center',
    position:'absolute',
    width:'100%',
    height:30,
  },
  text:{
    color:COLOR.white300,
    
  }
})
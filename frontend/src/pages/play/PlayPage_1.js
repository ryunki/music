import { useState, useEffect, useRef } from 'react'

import {
  ImageBackground,
  Dimensions,
  StyleSheet,
  View,
  PanResponder,
  Pressable,
  Text,
  Animated,
  Platform
} from 'react-native'
import Svg, { Path, G, Defs, Use, Stop,Mask,Rect, TSpan, Text as TextSVG, LinearGradient as LinearGradientSVG} from 'react-native-svg'
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
import { answerPath } from '../../../store/features/drawing/drawingSlice'
import TrebleClefWithStaffLines from './components/TrebleClefWithStaffLines'
import { convertArrayToObject, convertObjectToArray } from '../../../utils/functions/convert'
import { LinearGradient } from 'expo-linear-gradient'
import LinearGradientBackground from './components/LinearGradientBackground'
import StrokedText from '../../components/StrokedText'

// import AppLoading from 'expo-app-loading';
import {
  useFonts,
  PalanquinDark_400Regular,
  PalanquinDark_500Medium,
  PalanquinDark_600SemiBold,
  PalanquinDark_700Bold,
} from '@expo-google-fonts/palanquin-dark';

// phone
const SMALLEST_MOBILE = 3.2
const SMALL_MOBILE = 3.7
// Tablet
const MEDIUM_MOBILE = 4.8
const LARGE_MOBILE = 5.2

const PlayPage_1 = () => {
  const [isPathCorrect, setIsPathCorrect] = useState({isCompleted:false, progress:0})
  // const [answerPathData, setAnswerPathData] = useState([])
  const { screenHeight, screenWidth } = screenSize()

  const fadeAnim = useRef(new Animated.Value(isPathCorrect.progress)).current; // Initial value for opacity: 0

  const answerPathRedux = useSelector((state) => state.answerPath.path)
  const dispatch = useDispatch()

  let [fontsLoaded, fontError] = useFonts({
    PalanquinDark_400Regular,
    PalanquinDark_500Medium,
    PalanquinDark_600SemiBold,
    PalanquinDark_700Bold,
  });

  let fontSize = 24;
  let paddingVertical = 6;

  //  to get the total length of the answerpath for indicating progress
  // const ANSWER_PATH = changeAnswerPathPosition()
  // const ANSWER_PATH = convertPathToObjectArray(CORRECT_PATH_TREBLE_CLEF.split(' '))
  const ANSWER_PATH_ADJUST = { scale:1.1, x:-5, y:-7 }
  const headerHeight = useHeaderHeight()

  // takes ["123","234","345","456"... ] as parameter
  const ANSWER_TREBLE_CLEF = convertArrayToObject(CORRECT_PATH_TREBLE_CLEF.split(' '))
  // from [{x:"123",y:"123"},{...}] to ["123","234","345","456"....]
  const SCALED_TREBLE_CLEF_OBJECT = scaleObjectArrayPath(ANSWER_TREBLE_CLEF)
  const SCALED_TREBLE_CLEF_STRING_ARRAY = convertObjectToArray(SCALED_TREBLE_CLEF_OBJECT)

  
  // takes current path as parameter
  const calculateAccuracy = (currPath) =>{
    // from ["123","234","345"...]  to [{x:"123",y:"234"}...]
    const convertedCurrentPath = convertArrayToObject(currPath)
    // get the latest coord of user path
    const recentUserCoord = convertedCurrentPath[convertedCurrentPath.length-1]
    // get the first coord of the answer path
    const firstAnswerCoord = answerPathRedux[0]
    let distance = []
    // if the progress is not finished
    if(firstAnswerCoord){
      // calculateDistance() takes {x:0, y:0} as parameter
      distance = calculateDistance(firstAnswerCoord, recentUserCoord)
      // if user's touch has reached the point, remove the check point
      if(distance <= adjustedAllowance()){
        const trimmedAnswerPath = answerPathRedux.slice(1)
        const progressPercentage = Math.abs((trimmedAnswerPath.length/(SCALED_TREBLE_CLEF_OBJECT.length) * 100).toFixed(0) - 100)
        // update progress
        setIsPathCorrect({isCompleted:false, progress:progressPercentage})
        // update answerPath in redux
        dispatch(answerPath(trimmedAnswerPath))
      }
    }else{
      setIsPathCorrect({isCompleted:true, progress:100})
    }
    return distance
  }
  
  // convert string path to an object array
  // [{x:123,y:123},{...}]
  // this function also takes the asnwer path as well as the displayed path as parameter
  // and convert each coords to the specified scale
  function scaleObjectArrayPath(pathObjectArray) {
    // console.log('pathObjectArray: ',pathObjectArray)
    let convertedPath = []
    for (let i = 0; i < pathObjectArray.length; i ++){
      let x = (parseInt(pathObjectArray[i].x) * adjustedScale() + adjustedX()).toFixed(1) 
      let y = (parseInt(pathObjectArray[i].y) * adjustedScale() + adjustedY()).toFixed(1) 
      // let y = (parseInt(pathObjectArray[i].y) * adjustedScale()).toFixed(1) 
      convertedPath = [...convertedPath, {x, y}]
    }
    return convertedPath
  }
  
// change the size of SVG graphic according to width
function adjustedAllowance () {
  if(screenWidth < 375){
    return 10
  }else if(screenWidth >= 375 && screenWidth < 414){
    return 15
  }else if(screenWidth >= 414 && screenWidth < 600){
    return 20
  }else if(screenWidth >= 600){
    return 25
  }
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

useEffect(() => {
  Animated.timing(fadeAnim, {
    toValue: 100,
    duration: 1,
    useNativeDriver: true,
  }).start();
  console.log('fade anim')
}, [fadeAnim]);


if (!fontsLoaded && !fontError) {
  console.log('no loaded')
  return null;
}

  return (<>
    <LinearGradientBackground>
    <CustomDrawingPage 
      thickness={adjustedAllowance()} 
      // thickness={1} 
      dispatch={dispatch} calculateAccuracy={calculateAccuracy} SCALED_TREBLE_CLEF_OBJECT={SCALED_TREBLE_CLEF_OBJECT} 
    >
      <View style={styles.textContainer}>
        <Text style={styles.progessTitle}>Progress</Text>
        <View style={{width:'100%', alignItems:'center', justifyContent:'center'}}>
          <LinearGradient colors={['#391D8A','#7B4CFF',]} start={{ x: 0.5, y: 1 }} end={{ x: 0.5, y: 0 }} locations={[0, 1]}
            style={styles.linearGradientProgressionBar}
            >
            {/* <Animated.View // Special animatable View
              style={{
                  width: `${isPathCorrect.progress}%`,
                  height: 50,
                  backgroundColor: 'powderblue',
                  opacity: fadeAnim, // Bind opacity to animated value
              }}>
            </Animated.View> */}
            <LinearGradient colors={['#CE8313','#FFC165',]} start={{ x: 0.5, y: 1 }} end={{ x: 0.5, y: 0 }} locations={[0, 1]}
              style={[styles.percentageBar,{width: `${isPathCorrect.progress}%`,
              }]}/>
          </LinearGradient>
          
          <Text style={styles.progressionText}>
              {
                isPathCorrect.isCompleted ? 'Correct!': isPathCorrect.progress+'%'
              }
          </Text>
        </View>
        </View>

      <Defs>
        <G id='treble-clef-on-staff-line' scale={adjustedScale()} x={adjustedX()} 
        y={adjustedY()}
        >
          <TrebleClefWithStaffLines opacityTrebleClef={0.1} opacityStaffLines={1}/>
        </G>
      </Defs>
      <Use
        href='#treble-clef-on-staff-line'
        // opacity={0.1}
      />
      {/* path for checking answer */}
      {/* <Path
        d={'M' + SCALED_TREBLE_CLEF_STRING_ARRAY.join(' ')}
        fill='none'
        stroke='#fd6f6f'
        strokeWidth={1}
        strokeLinecap='round'
        strokeLinejoin='round'
        opacity={0.5}
      /> */}
    </CustomDrawingPage>
    
    </LinearGradientBackground>
    </>
  )
}

export default PlayPage_1

const styles = StyleSheet.create({
  linearGradientBackground:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  textContainer:{
    alignItems:'center',
  },
  progessTitle:{
    marginTop: 20,
    textAlign:'center',
    width:'100%',
    fontSize:60,
    fontFamily:"PalanquinDark_400Regular",
    color:'#FFF500',
    textShadowColor:'black',
    textShadowRadius:10,
  },
  progressionText:{
    textAlign:'center',
    color:'#FFF500',
    fontSize: 35,
    fontWeight:'bold',
    zIndex:1,
    position:'absolute',
    textShadowColor:'black',
    textShadowRadius:5,
  },
  text:{
    color:COLOR.white300,
  },
  linearGradientProgressionBar:{
    // this background color is for the component that fill in the gap caused by lineargradient effect
    backgroundColor:'#5931CD',
    borderRadius:SPACING.space_10,
    shadowOpacity:1,
    elevation: 10,
    shadowColor:'black',
    
    height:60,
    width:'80%',

    // this fill in the gap border of the component and the background color with borderRadius
    borderColor:'black',
    borderWidth:4,
    borderBottomStartRadius:15,
    borderBottomEndRadius:15,
    borderTopStartRadius:15,
    borderTopEndRadius:15,

    overflow: 'hidden'
  },
  percentageBar:{
    backgroundColor: '#FF6B00',
    height:60,
    position:'absolute',
  }
})
import { useState, useEffect, useRef } from 'react'

import {ImageBackground,Dimensions, StyleSheet,View, PanResponder,Pressable,Text,Animated,Platform,} from 'react-native'
import Svg, {Path,G,Defs,Use,Stop,Mask,Rect,TSpan,
  Text as TextSVG,
  LinearGradient as LinearGradientSVG,
} from 'react-native-svg'
import { Audio } from 'expo-av'
import { useHeaderHeight } from '@react-navigation/elements'
import { useIsFocused, useNavigation } from '@react-navigation/native';

import CustomPath from '../../components/CustomPath'
import { COLOR, SPACING } from '../../../theme/theme'
import CustomDrawingPage from '../../components/CustomDrawingPage'
import CustomDrawingPage2 from '../../components/CustomDrawingPage2'
import TrebleClefOnStaffLines from '../../components/UI/TrebleClefOnStaffLines'

import drawing_3 from '../../../assets/drawing/drawing_3.jpg'
import {
  PATH_FOR_TREBLE_CLEF,
  CORRECT_PATH_TREBLE_CLEF,
  SCALE_HEIGHT,
  SCALE_WIDTH,
  SMALL_MOBILE_WIDTH,
  MOBILE_WIDTH,
  TABLET_WIDTH,
} from '../../../constants/constants'
import { screenSize } from '../../../utils/screenFunctions'
import { calculateDistance, calculateDistanceOfCoords } from '../../../utils/functions/calculateDistance'

import { useDispatch, useSelector } from 'react-redux'
// import { answerPath } from '../../../store/features/drawing/drawingSlice'
import TrebleClefWithStaffLines from './components/TrebleClefWithStaffLines'
import {
  convertArrayToObject,
  convertObjectToArray,
} from '../../../utils/functions/convert'
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
} from '@expo-google-fonts/palanquin-dark'
// import Modal from '../../components/UI/CustomModal'
import CustomModal from '../../components/UI/CustomModal'
import LinearGradientUI from '../../components/UI/LinearGradientUI'
import StartingPoint from '../../components/UI/StartingPoint'
import CustomButton from '../../components/UI/CustomButton';
import CongratsSVG from '../../components/SVG/CongratsSVG';
import useSound from '../../hooks/useSound'
import useDraw from '../../hooks/useDraw'
import { adjustedAllowance, setThickness, adjustedScale,adjustedX,adjustedY } from '../../../utils/functions/playPage_1'

// let user allow to continue drawing within 3 times the certain distance
const GRAY_AREA = 3
// user shouldn't be drawing 50 pixels more than the answer path for every check point
const ACCURACY_LIMIT = 50

const PlayPage_1 = () => {
  const {buttonSound, failSound, congratsSound} = useSound()
  const [currentPath, setCurrentPath] = useState('')
  const [answerPath, setAnswerPath] = useState([])
  const [isPathCorrect, setIsPathCorrect] = useState({
    isCompleted: false,
    progress: 0,
  })
  const [alertMessage, setAlertMessage] = useState('Try again!')
  const [modalVisible, setModalVisible] = useState(false)
  // for buttons
  const [difficulty, setDifficulty] = useState('Easy')
  // for congrats animation
  const translateY = useRef(new Animated.Value(-100)).current
  const animatedFn = Animated.spring(translateY, {
    toValue: 0,
    bounciness:30,
    useNativeDriver: true, // set to true if possible
  })

  const { screenHeight, screenWidth } = screenSize()
  
  // to detect if current page is focused or not
  const isFocused = useIsFocused()

  // const answerPathRedux = useSelector((state) => state.answerPath.path)
  // const dispatch = useDispatch()

  let [fontsLoaded, fontError] = useFonts({
    PalanquinDark_400Regular,
    PalanquinDark_500Medium,
    PalanquinDark_600SemiBold,
    PalanquinDark_700Bold,
  })

  const headerHeight = useHeaderHeight()

  // takes ["123","234","345","456"... ] as parameter
  const ANSWER_TREBLE_CLEF = convertArrayToObject(CORRECT_PATH_TREBLE_CLEF.split(' '))
  // from [{x:"123",y:"123"},{...}] to ["123","234","345","456"....]
  const SCALED_TREBLE_CLEF_OBJECT = scaleObjectArrayPath(ANSWER_TREBLE_CLEF)
  const SCALED_TREBLE_CLEF_STRING_ARRAY = convertObjectToArray(SCALED_TREBLE_CLEF_OBJECT)

  const isUserOnTrack = (answerCoord, recentUserCoord) => {
    // const LEVEL = difficulty === 'Easy' ? EASY : HARD
    const distance = calculateDistance(answerCoord[0], recentUserCoord)
    const allwowance =  adjustedAllowance(difficulty, screenWidth)
    if (distance <= allwowance) {
      console.log('distance is within the adjustedAllowance')
      return true
      // this is the point where user fails
    // } else if (distance > allwowance * LEVEL) {
    } else if (distance > allwowance * GRAY_AREA) {
      console.log('distance is over the adjustedAllowance')
      return false
    }
    // console.log('distance, allwowance* LEVEL: ',distance, allwowance* GRAY_AREA)
  }

  // convert string path to an object array
  // [{x:123,y:123},{...}]
  // this function also takes the asnwer path as well as the displayed path as parameter
  // and convert each coords to the specified scale
  function scaleObjectArrayPath(pathObjectArray) {
    let convertedPath = []
    for (let i = 0; i < pathObjectArray.length; i++) {
      let x = (
        parseFloat(pathObjectArray[i].x) * adjustedScale(screenWidth) + adjustedX(screenWidth)
      ).toFixed(1)
      let y = (
        parseFloat(pathObjectArray[i].y) * adjustedScale(screenWidth) + adjustedY(screenHeight, screenWidth)
      ).toFixed(1)
      // let y = (parseInt(pathObjectArray[i].y) * adjustedScale()).toFixed(1)
      convertedPath = [...convertedPath, { x, y }]
    }
    return convertedPath
  }

  const onPressButton = (text) => {
    console.log('button pressed!', text)
    setDifficulty(text)
    buttonSound()
  }
  function userFailed () {
    setAlertMessage('Try again!')
    setModalVisible(true)
    // reset the answer path after user failed 
    setAnswerPath(SCALED_TREBLE_CLEF_OBJECT)
    failSound()
  }
  function calculateProgress (answerCoord) {
    // if user's touch has reached the point, remove the check point
    const trimmedAnswerPath = answerCoord.slice(1)
    // this is to display progress from 0 to 100
    const progressPercentage = Math.abs(
      ((trimmedAnswerPath.length / SCALED_TREBLE_CLEF_OBJECT.length) * 100 ).toFixed(0) - 100
    )
    // update progress
    setIsPathCorrect({ isCompleted: false, progress: progressPercentage })
    // update answerPath 
    setAnswerPath(trimmedAnswerPath)
  }
  
  function handleFirstTouch (x,y) {
    // console.log('first touch',x,y)
    // prevent from getting the results by touching the screen while celebrating animation is running
    if(!isPathCorrect.isCompleted){
      setCurrentPath(`${x} ${y} ${x} ${y}`)
      // set an answerPath whenever user touches the screen for first time
      // so that the progress indicator starts from 0% 
      const answerCoord = SCALED_TREBLE_CLEF_OBJECT
      // from ["123","234","345"...]  to [{x:"123",y:"234"}...]
      // const currPath = [x,y] 
      const currPath = `${x} ${y}`
      const convertedCurrentPath = convertArrayToObject(currPath.split(' '))[0]
      
      const userOnTrack = isUserOnTrack(answerCoord, convertedCurrentPath)
      if (userOnTrack) {
        calculateProgress(answerCoord)
      }
    }
  }

  function handleDraw (x,y) {
    const newPathSegment = ` ${x} ${y}`
    setCurrentPath((prevPath) => (prevPath ? prevPath + newPathSegment : `${x} ${y}`))
    const currPath = currentPath.split(' ')
    const firstAnswerCoord = answerPath[0]
    // from ["123","234","345"...]  to [{x:"123",y:"234"}...]
    const convertedCurrentPath = convertArrayToObject(currPath)
    // get the latest coord of user path
    const recentUserCoord = convertedCurrentPath[convertedCurrentPath.length - 1]
    console.log('recentUserCoord: ',recentUserCoord)
    // if the progress is not finished
    if (firstAnswerCoord) {
      // calculateDistance() takes {x:0, y:0} as parameter
      // const distance = calculateDistance(firstAnswerCoord, recentUserCoord)
      const userOnTrack = isUserOnTrack(answerPath, recentUserCoord)
      console.log('userOnTrack: ',userOnTrack)
      if (userOnTrack) {
        console.log('is on the right track')
        calculateProgress(answerPath)
      } 
      else if (userOnTrack === undefined){
        let distanceOfAnswer,accumulatedDistanceOfUser
        // find point of index of answer path upto user has reached
        const progressedLength = SCALED_TREBLE_CLEF_OBJECT.length - answerPath.length
        if (progressedLength > 1) {
          // calculate total distance upto given index
          distanceOfAnswer = calculateDistanceOfCoords(SCALED_TREBLE_CLEF_OBJECT.slice(0,progressedLength))
        }
        // if a user has more than one coords of path drawn
        const currentProgressedLength = convertedCurrentPath.length
        if (currentProgressedLength > 1){
          accumulatedDistanceOfUser = calculateDistanceOfCoords(convertedCurrentPath)
        }
        // calcalate the difference of the total distance drawn by user and the answer path upto succeeded point
        const accuracy = accumulatedDistanceOfUser - distanceOfAnswer
        // this prevents a user to draw more than 50 pixels while staying within each check point
        if (accuracy > ACCURACY_LIMIT){
          userFailed()
        }
      }
      else if (!userOnTrack){
        userFailed()
      } 
    } else {
      setIsPathCorrect({ isCompleted: true, progress: 100 })
      setAlertMessage('Nice!')
    }
    // console.log('answerPath: ',answerPath)
  }

  function handleReleaseTouch () {
    console.log('release touch')
    if(!isPathCorrect.isCompleted){
      setAlertMessage('Try again!')
      setModalVisible(true)
    }
  }

  useEffect(function resetAnswerPath(){
    if (isFocused) {
      console.log('Component is focused');
      // Your logic when the component is focused
      // reset the answerPath
      // dispatch(answerPath(SCALED_TREBLE_CLEF_OBJECT))
      // setAnswerPath(SCALED_TREBLE_CLEF_OBJECT)
    } else {
      console.log('Component is not focused');
      // Your logic when the component is not focused
    }
  }, [isFocused])

  // whenever user press the difficulty button
  useEffect(function resetPath(){
    setCurrentPath('')
    setIsPathCorrect({isCompleted:false, progress:0})
    setAlertMessage('Try again!')
  },[difficulty])

  // whenever user has completed the progress
  useEffect(function startCongratsAnimation() {
    console.log('isPathCorrect.isCompleted: ',isPathCorrect.isCompleted)
    if(isPathCorrect.isCompleted){
      congratsSound()
      animatedFn.start()
      const timeoutId = setTimeout(()=>{
        setCurrentPath('')
        setIsPathCorrect({isCompleted:false, progress:0})
        setAlertMessage('Try again!')
        animatedFn.reset()
      },2000)
      return () => {
        clearTimeout(timeoutId)
      }
    }
  }, [isPathCorrect.isCompleted])

  useEffect(() => {
    // if user closes the modal
    if(!modalVisible){
      setCurrentPath('')
      setIsPathCorrect({isCompleted: false,progress: 0,})
    }
  }, [modalVisible])

  if (!fontsLoaded && !fontError) {
    console.log('no loaded')
    return null
  }
// console.log('SCALED_TREBLE_CLEF_OBJECT: ',SCALED_TREBLE_CLEF_OBJECT[0])
  return (
    <>
      {/* an arrow indicator where to begin drawing (absolute position) */}
      <StartingPoint positionX={parseInt(SCALED_TREBLE_CLEF_OBJECT[0].x) + 5} positionY={parseInt(SCALED_TREBLE_CLEF_OBJECT[0].y) -5 }/>

      <LinearGradientBackground>
        {isPathCorrect.isCompleted && 
        <>
          <Animated.View style={[styles.congratsContainer, {left:-40,transform: [{scale:adjustedScale(screenWidth)/5},{ translateY }]}]}>
            <CongratsSVG/>
          </Animated.View>
          <Animated.View style={[styles.congratsContainer, {right:-40,transform: [{scale:adjustedScale(screenWidth)/5},{ translateY },{ scaleX: -1 }]} ]}>
            <CongratsSVG/>
          </Animated.View>
        </>
        }   
     
        {modalVisible && (
          <CustomModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            text={alertMessage}
          />
        )}

        <CustomDrawingPage2
          thickness={setThickness(screenWidth)}
          currentPath={currentPath}
          handleFirstTouch={handleFirstTouch}
          handleDraw={handleDraw}
          handleReleaseTouch={handleReleaseTouch}
          modalVisible={modalVisible}
          isCompleted={isPathCorrect.isCompleted}
          >
          <View style={[styles.textContainer, {marginTop: 0}]}>
            <Text style={styles.progessTitle}>{alertMessage === 'Nice!' ? 'Nice!': 'Progress'}</Text>
            <View style={{width: '100%',alignItems: 'center',justifyContent: 'center',}}>
              <LinearGradient
                colors={['#391D8A', '#7B4CFF']}
                start={{ x: 0.5, y: 1 }}
                end={{ x: 0.5, y: 0 }}
                locations={[0, 1]}
                style={styles.linearGradientProgressionBar}>
                <LinearGradient
                  colors={['#CE8313', '#FFC165']}
                  start={{ x: 0.5, y: 1 }}
                  end={{ x: 0.5, y: 0 }}
                  locations={[0, 1]}
                  style={[
                    styles.percentageBar,
                    { width: `${isPathCorrect.progress}%` },
                  ]}
                />
              </LinearGradient>

              {/* this displays the progression bar */}
              <Text style={styles.text}>
                {`${isPathCorrect.progress}%`}
                {/* {isPathCorrect.isCompleted ? `${isPathCorrect.progress}%`:  `${isPathCorrect.progress}%`} */}
              </Text>
            </View>
          </View>

          <Defs>
            <G
              id='treble-clef-on-staff-line'
              scale={adjustedScale(screenWidth)}
              x={adjustedX(screenWidth)}
              y={adjustedY(screenHeight, screenWidth)}
              >
              <TrebleClefWithStaffLines
                opacityTrebleClef={0.1}
                opacityStaffLines={1}
              />
            </G>
          </Defs>
          <Use href='#treble-clef-on-staff-line' />
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
   
        </CustomDrawingPage2>
        <View style={[styles.buttonContainer, {bottom:20}]}>
          <CustomButton onPress={onPressButton} text={'Easy'} fontSize={30} difficulty={difficulty}/>
          <CustomButton onPress={onPressButton} text={'Hard'} fontSize={30} difficulty={difficulty}/>
        </View>
      </LinearGradientBackground>
    </>
  )
}

export default PlayPage_1

const styles = StyleSheet.create({
  linearGradientBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    width: '80%',
    alignSelf: 'center',
    // marginTop:'10%'
  },
  progessTitle: {
    marginTop: 20,
    textAlign: 'center',
    // width:'80%',
    fontSize: 60,
    fontFamily: 'PalanquinDark_400Regular',
    color: '#FFF500',
    textShadowColor: 'black',
    textShadowRadius: 10,
  },
  text: {
    textAlign: 'center',
    color: '#FFF500',
    fontSize: 35,
    fontWeight: 'bold',
    position: 'absolute',
    textShadowColor: 'black',
    textShadowRadius: 5,
  },
  linearGradientProgressionBar: {
    // this background color is for the component that fill in the gap caused by lineargradient effect
    backgroundColor: '#5931CD',
    borderRadius: SPACING.space_10,
    shadowOpacity: 1,
    elevation: 10,
    shadowColor: 'black',

    height: 60,
    width: '100%',
    // flex:1,

    // this fill in the gap border of the component and the background color with borderRadius
    borderColor: 'black',
    borderWidth: 4,
    borderBottomStartRadius: 15,
    borderBottomEndRadius: 15,
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,

    overflow: 'hidden',
  },
  percentageBar: {
    backgroundColor: '#FF6B00',
    height: 60,
    position: 'absolute',
  },
  buttonContainer:{
    flexDirection:'row',
    position:'absolute'
  },
  congratsContainer:{
    position:'absolute', zIndex:1,
    // flexDirection:'row',
    // flex:1
  },
})

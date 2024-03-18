import { useState, useEffect, useRef } from 'react'
import {Easing, StyleSheet,View,Text,Animated,} from 'react-native'
import {G,Defs,Use} from 'react-native-svg'
import { LinearGradient } from 'expo-linear-gradient'
import { useIsFocused } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import { COLOR, SPACING, TWO_TONE_PURPLE } from '../../../theme/theme'
import { CORRECT_PATH_TREBLE_CLEF} from '../../../constants/constants'

import { calculateDistance, calculateDistanceOfCoords } from '../../../utils/functions/calculateDistance'
import {convertArrayToObject,convertObjectToArray } from '../../../utils/functions/convert'

import CustomDrawingPage from '../../components/CustomDrawingPage'
import TrebleClefWithStaffLines from './components/TrebleClefWithStaffLines'
import LinearGradientBackground from './components/LinearGradientBackground'

import {useFonts,PalanquinDark_400Regular,} from '@expo-google-fonts/palanquin-dark'

import CustomModal from '../../components/UI/CustomModal'
import StartingPoint from '../../components/UI/StartingPoint'
import CustomButton from '../../components/UI/CustomButton';
import useSound from '../../hooks/useSound'

import { adjustedAllowance, setThickness, adjustedScale, adjustedX, adjustedY } from '../../../utils/functions/playPage_1'
import { isPhone } from '../../../utils/functions/playPage_2';
import CongratsAnimation from './components/animation/CongratsAnimation';
import ProgressionBarAnimation from './components/animation/ProgressionBarAnimation';

// let user allow to continue drawing within 3 times the certain distance
const GRAY_AREA_EASY = 3
const GRAY_AREA_HARD = 2.8
// user shouldn't be drawing 50 pixels more than the answer path for every check point
const ACCURACY_LIMIT_EASY = 60
const ACCURACY_LIMIT_HARD = 35
// constant words
const EASY = 'Easy'
const HARD = 'Hard'
const SUCCEED = 'Nice!'
const FAIL = 'Try again!'
const PROGRESS = 'Progress'
const MODE = 'Mode'

const PlayPage_1 = () => {
  const ADJUSTED_SCALE = adjustedScale()
  const ADJUSTED_X = adjustedX()
  const ADJUSTED_Y = adjustedY()
  const THICKNESS = setThickness()

  const sound = useSelector((state) => state.toggleSoundAndMusic.sound)
  
  const {buttonSound, failSound, congratsSound} = useSound(sound)
  // get width of the progress bar when it's 100%. this state is used for animation
  // initial value is 1000 so that the yellow progression bar doesnt show up at the beginning (flash)
  // const [progressBarWidth, setProgressBarWidth] = useState(1000)
  const [currentPath, setCurrentPath] = useState('')
  // answer path for user to compare every coords and remove one by one until there is nothing left
  const [answerPath, setAnswerPath] = useState([])
  // this state is responsible for displaying number of the progress bar
  const [isPathCorrect, setIsPathCorrect] = useState({
    isCompleted: false,
    progress: 0,
  })
  const [alertMessage, setAlertMessage] = useState(FAIL)
  const [modalVisible, setModalVisible] = useState(false)
  // for difficulty buttons
  const [difficulty, setDifficulty] = useState(EASY)
  // mode change 
  const [modeIsTrebleClef, setModeIsTrebleClef] = useState(true)
  // trigger congrats animation 
  const [startCongratsAnimation, setStartCongratsAnimation] = useState(false)
  // trigger progress animation 
  const [startProgressAnimation, setStartProgressAnimation] = useState({isValid:false, progress:0})


  const difficultyButtonProps = {
    borderRadius:20,
    minWidth:80,
    lineHeight:50,
    fontSize: 30,
  }

  const modeButtonProps = {
    borderRadius:10,
    minWidth:40,
    lineHeight:35,  
    fontSize:20, 
    opacity:1
  }

  // to detect if current page is focused or not
  const isFocused = useIsFocused()

  let [fontsLoaded, fontError] = useFonts({PalanquinDark_400Regular,})

  // takes ["123","234","345","456"... ] as parameter
  const ANSWER_TREBLE_CLEF = convertArrayToObject(CORRECT_PATH_TREBLE_CLEF.split(' '))
  // from [{x:"123",y:"123"},{...}] to ["123","234","345","456"....]
  const SCALED_TREBLE_CLEF_OBJECT = scaleObjectArrayPath(ANSWER_TREBLE_CLEF)
  // this is for displaying answer path
  const SCALED_TREBLE_CLEF_STRING_ARRAY = convertObjectToArray(SCALED_TREBLE_CLEF_OBJECT)

  // check distance from every check point
  const isUserOnTrack = (answerCoord, recentUserCoord) => {
    const GRAY_AREA = difficulty === EASY ? GRAY_AREA_EASY : GRAY_AREA_HARD
    const distance = calculateDistance(answerCoord[0], recentUserCoord)
    const allwowance =  adjustedAllowance(difficulty)
    if (distance <= allwowance) {
      return true
      // this is the point where user fails
    } else if (distance > allwowance * GRAY_AREA) {
      return false
    }
  }

  // [{x:123,y:123},{...}]
  // this function also takes the asnwer path as well as the displayed path as parameter
  // and convert each coords to the specified scale
  function scaleObjectArrayPath(pathObjectArray) {
    let convertedPath = []
    for (let i = 0; i < pathObjectArray.length; i++) {
      const x = scaleCoord(pathObjectArray[i].x, ADJUSTED_X)
      const y = scaleCoord(pathObjectArray[i].y, ADJUSTED_Y)
      convertedPath = [...convertedPath, { x, y }]
    }
    return convertedPath
  }

  function scaleCoord(coord, axis){
    return (parseFloat(coord) * ADJUSTED_SCALE + axis).toFixed(1)
  }

  const onPressMode = () => {
    setModeIsTrebleClef(!modeIsTrebleClef)
    buttonSound()
  }

  const onPressButton = (text) => {
    setDifficulty(text)
    buttonSound()
  }
  function userFailed () {
    setAlertMessage(FAIL)
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
    setStartProgressAnimation({isValid:true, progress: progressPercentage})
    // startWidthAnimation(progressPercentage)
  }

  // this function is to calculate how close the user stayed to the answer path.
  function calculateAccuracy (convertedCurrentPath) {
    let distanceOfAnswer,accumulatedDistanceOfUser = 0
    // find point of index of answer path upto user has reached
    const progressedLength = SCALED_TREBLE_CLEF_OBJECT.length - answerPath.length
    if (progressedLength > 0) {
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
    return accuracy
  }

  function userOnTrackHandler (userOnTrack, path, convertedCurrentPath) {
    if (userOnTrack) {
      calculateProgress(path)
    } 
    else if (userOnTrack === undefined){
      const accuracy = calculateAccuracy(convertedCurrentPath)
      // this prevents a user to draw more than ACCURACY_LIMIT while staying within each check point
      const limit = difficulty === EASY ? ACCURACY_LIMIT_EASY: ACCURACY_LIMIT_HARD
      if (accuracy > limit){
        userFailed()
      }
    }
    else if (!userOnTrack){
      userFailed()
    } 
  }

  function handleFirstTouch (x,y) {
    // prevent from getting the results by touching the screen while celebrating animation is running
    if(!isPathCorrect.isCompleted){
      // setCurrentPath(`${x} ${y}`)
      setCurrentPath(`${x} ${y} ${x} ${y}`)
      // this setter is important for resetting the answerPath, this prevents user to get instant 100% progress for the next try
      setAnswerPath(SCALED_TREBLE_CLEF_OBJECT)
      // set an answerPath whenever user touches the screen for first time
      // so that the progress indicator starts from 0% 
      const answerCoord = SCALED_TREBLE_CLEF_OBJECT
      // from ["123","234","345"...]  to [{x:"123",y:"234"}...]
      // const currPath = [x,y] 
      const currPath = `${x} ${y}`
      const convertedCurrentPath = convertArrayToObject(currPath.split(' '))[0]
      const userOnTrack = isUserOnTrack(answerCoord, convertedCurrentPath)
      userOnTrackHandler(userOnTrack, answerCoord, convertedCurrentPath)
    }
  }

  function handleDraw (x,y) {
    const newPathSegment = ` ${x} ${y}`
    // setCurrentPath((prevPath) => (prevPath ? prevPath + newPathSegment : `${x} ${y}`))
    setCurrentPath((prevPath) => prevPath ? prevPath + newPathSegment : `${x} ${y}`)
    const currPath = currentPath.split(' ')
    const firstAnswerCoord = answerPath[0]
    // from ["123","234","345"...]  to [{x:"123",y:"234"}...]
    const convertedCurrentPath = convertArrayToObject(currPath)
    // get the latest coord of user path
    const recentUserCoord = convertedCurrentPath[convertedCurrentPath.length - 1]
    // if the progress is not finished
    if (firstAnswerCoord) {
      // calculateDistance() takes {x:0, y:0} as parameter
      const userOnTrack = isUserOnTrack(answerPath, recentUserCoord)
      userOnTrackHandler(userOnTrack, answerPath, convertedCurrentPath)
    } else {
      setIsPathCorrect({ isCompleted: true, progress: 100 })
      setAlertMessage(SUCCEED)
    }
  }

  function handleReleaseTouch () {
    if(!isPathCorrect.isCompleted){
      setAlertMessage(FAIL)
      setModalVisible(true)
    }
  }

  
  const failFunctions = () => {
    setCurrentPath('')
    setIsPathCorrect({isCompleted:false, progress:0})
    setStartProgressAnimation(false)
  }

  useEffect(function resetAnswerPath(){
    if (isFocused) {
      console.log('Component is focused');
      // Your logic when the component is focused
    } else {
      console.log('Component is not focused');
      // Your logic when the component is not focused
    }
  }, [isFocused])
  // whenever user press the difficulty button
  useEffect(function resetPath(){
    failFunctions()
    setAlertMessage(FAIL)
  },[difficulty])

  // whenever user has completed the progress
  useEffect(function startCongratsAnimation() {
    if(isPathCorrect.isCompleted){
      congratsSound()
      setStartCongratsAnimation(true)
      const timeoutId = setTimeout(()=>{
        failFunctions()
        setStartCongratsAnimation(false)
        setAlertMessage(FAIL)
      },2000)
      return () => {
        clearTimeout(timeoutId)
      }
    }
  }, [isPathCorrect.isCompleted])

  useEffect(() => {
    // if user closes the modal
    if(!modalVisible){
      failFunctions()
    }
  }, [modalVisible])

  if (!fontsLoaded && !fontError) {
    console.log('no loaded')
    return null
  }

  return (
    <>
      {/* an arrow indicator where to begin drawing (absolute position) */}
      <StartingPoint positionX={parseInt(SCALED_TREBLE_CLEF_OBJECT[0].x) + 5} positionY={parseInt(SCALED_TREBLE_CLEF_OBJECT[0].y) -5 }/>

      <LinearGradientBackground>
        {isPathCorrect.isCompleted && 
          <CongratsAnimation startCongratsAnimation={startCongratsAnimation}/>
        }   
     
        {modalVisible && (
          <CustomModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            text={alertMessage}
          />
        )}
        <View style={styles.changeMode}>
         <CustomButton onPress={onPressMode} text={MODE} buttonProps={modeButtonProps}/>
        </View>
        <CustomDrawingPage
          thickness={THICKNESS}
          currentPath={currentPath}
          handleFirstTouch={handleFirstTouch}
          handleDraw={handleDraw}
          handleReleaseTouch={handleReleaseTouch}
          modalVisible={modalVisible}
          isCompleted={isPathCorrect.isCompleted}
          >
          <View style={[styles.textContainer]}>
            <Text style={styles.progessTitle}>{alertMessage === SUCCEED ? SUCCEED: PROGRESS}</Text>
            <View style={{width: '100%',alignItems: 'center',justifyContent: 'center',}}>
              <LinearGradient
                colors={[TWO_TONE_PURPLE.c100, TWO_TONE_PURPLE.c200]}
                start={{ x: 0.5, y: 1 }}
                end={{ x: 0.5, y: 0 }}
                locations={[0, 1]}
                style={styles.linearGradientProgressionBar}>
                  {/* display progress bar animation */}
                  <ProgressionBarAnimation startProgressAnimation={startProgressAnimation}/>
              </LinearGradient>

              {/* this displays the progression bar */}
              <Text style={styles.text}>
                {`${isPathCorrect.progress}%`}
              </Text>
            </View>
          </View>

          <Defs>
            <G
              id='treble-clef-on-staff-line'
              scale={ADJUSTED_SCALE}
              x={ADJUSTED_X}
              y={ADJUSTED_Y}
              >
              <TrebleClefWithStaffLines
                opacityTrebleClef={modeIsTrebleClef ? 0.1: 0}
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
        </CustomDrawingPage>
        <View style={[styles.buttonContainer, {bottom:20}]}>
          <CustomButton onPress={onPressButton} text={EASY} opacity={difficulty === EASY ? 1: 0.5} buttonProps={difficultyButtonProps}/>
          <CustomButton onPress={onPressButton} text={HARD} opacity={difficulty === HARD ? 1: 0.5} buttonProps={difficultyButtonProps}/>
        </View>
      </LinearGradientBackground>
    </>
  )
}

export default PlayPage_1

const styles = StyleSheet.create({
  textContainer: {
    width: '80%',
    alignSelf: 'center',
    marginTop: isPhone() ? 40 : 20
  },
  progessTitle: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 60,
    fontFamily: 'PalanquinDark_400Regular',
    color: COLOR.yellow300,
    textShadowColor: 'black',
    textShadowRadius: 10,
  },
  text: {
    textAlign: 'center',
    color: COLOR.yellow300,
    fontSize: 35,
    fontWeight: 'bold',
    position: 'absolute',
    textShadowColor: 'black',
    textShadowRadius: 5,
  },
  linearGradientProgressionBar: {
    // this background color is for the component that fill in the gap caused by lineargradient effect
    backgroundColor: TWO_TONE_PURPLE.c100,
    borderRadius: SPACING.space_10,
    shadowOpacity: 1,
    elevation: 10,
    shadowColor: 'black',

    height: 60,
    width: '100%',

    // this fill in the gap border of the component and the background color with borderRadius
    borderColor: 'black',
    borderWidth: 4,
    borderBottomStartRadius: 15,
    borderBottomEndRadius: 15,
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,

    overflow: 'hidden',
  },

  buttonContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    width:'100%',
    position:'absolute'
  },

  changeMode:{
    position:'absolute',
    right: isPhone() ? -10: -10,
    top:10,
    zIndex:1,
    // width:200,
    // backgroundColor:'gray'
  }
})

import { useState, useEffect, useRef } from 'react'
import {Easing, StyleSheet,View,Text,Animated,} from 'react-native'
import {G,Defs,Use} from 'react-native-svg'
import { LinearGradient } from 'expo-linear-gradient'
import { useIsFocused } from '@react-navigation/native';
import { useHeaderHeight } from '@react-navigation/elements'

import { COLOR, SPACING, TWO_TONE_ORANGE, TWO_TONE_PURPLE } from '../../../theme/theme'
import { CORRECT_PATH_TREBLE_CLEF} from '../../../constants/constants'

import { screenSize } from '../../../utils/screenFunctions'
import { calculateDistance, calculateDistanceOfCoords } from '../../../utils/functions/calculateDistance'
import {convertArrayToObject,convertObjectToArray } from '../../../utils/functions/convert'

import CustomDrawingPage from '../../components/CustomDrawingPage'
import TrebleClefWithStaffLines from './components/TrebleClefWithStaffLines'
import LinearGradientBackground from './components/LinearGradientBackground'

import {
  useFonts,
  PalanquinDark_400Regular,
  PalanquinDark_500Medium,
  PalanquinDark_600SemiBold,
  PalanquinDark_700Bold,
} from '@expo-google-fonts/palanquin-dark'

import CustomModal from '../../components/UI/CustomModal'
import StartingPoint from '../../components/UI/StartingPoint'
import CustomButton from '../../components/UI/CustomButton';
import CongratsSVG from '../../components/SVG/CongratsSVG';
import useSound from '../../hooks/useSound'

import { adjustedAllowance, setThickness, adjustedScale,adjustedX,adjustedY } from '../../../utils/functions/playPage_1'

// let user allow to continue drawing within 3 times the certain distance
const GRAY_AREA = 3
// user shouldn't be drawing 50 pixels more than the answer path for every check point
const ACCURACY_LIMIT = 50

const PlayPage_1 = () => {
  const {buttonSound, failSound, congratsSound} = useSound()
  // get width of the progress bar when it's 100%. this state is used for animation
  const [progressBarWidth, setProgressBarWidth] = useState(0)
  const [currentPath, setCurrentPath] = useState('')
  // answer path for user to compare every coords and remove one by one until there is nothing left
  const [answerPath, setAnswerPath] = useState([])
  // this state is responsible for displaying number of the progress bar
  const [isPathCorrect, setIsPathCorrect] = useState({
    isCompleted: false,
    progress: 0,
  })
  const [alertMessage, setAlertMessage] = useState('Try again!')
  const [modalVisible, setModalVisible] = useState(false)
  // for difficulty buttons
  const [difficulty, setDifficulty] = useState('Easy')
  // for congrats animation
  const congratsTranslateY = useRef(new Animated.Value(-100)).current
  const congratsAnimation = Animated.spring(congratsTranslateY, {
    toValue: 0,
    bounciness:30,
    useNativeDriver: true, // set to true if possible
  })

  const animatedWidth = useRef(new Animated.Value(0)).current
  const inputRange = [0, 100]
  const outputRange = [-progressBarWidth, 0]
  const widthExpandAnimation = animatedWidth.interpolate({
    inputRange,
    outputRange,
  })
  
  const startWidthAnimation = (progress) => {
    return Animated.timing(animatedWidth, {
      toValue: progress,
      duration: 1000,
      // bounciness:10,
      easing: Easing.out(Easing.exp),
      useNativeDriver: true,
    }).start()
  }
  const resetWidthAnimation = () => {
    return Animated.timing(animatedWidth, {
      toValue: 0,
      duration: 1000,
      // bounciness:10,
      easing: Easing.out(Easing.exp),
      useNativeDriver: true,
    }).start()
  }

  const handleLayout = (event) => {
    const { width } = event.nativeEvent.layout;
    console.log('handleLayout: ',width)
    setProgressBarWidth(width)
  }
  const headerHeight = useHeaderHeight()
  const { screenHeight, screenWidth } = screenSize()
  
  // to detect if current page is focused or not
  const isFocused = useIsFocused()

  let [fontsLoaded, fontError] = useFonts({
    PalanquinDark_400Regular,
    PalanquinDark_500Medium,
    PalanquinDark_600SemiBold,
    PalanquinDark_700Bold,
  })

  // takes ["123","234","345","456"... ] as parameter
  const ANSWER_TREBLE_CLEF = convertArrayToObject(CORRECT_PATH_TREBLE_CLEF.split(' '))
  // from [{x:"123",y:"123"},{...}] to ["123","234","345","456"....]
  const SCALED_TREBLE_CLEF_OBJECT = scaleObjectArrayPath(ANSWER_TREBLE_CLEF)
  // this is for displaying answer path
  const SCALED_TREBLE_CLEF_STRING_ARRAY = convertObjectToArray(SCALED_TREBLE_CLEF_OBJECT)

  const isUserOnTrack = (answerCoord, recentUserCoord) => {
    // const LEVEL = difficulty === 'Easy' ? EASY : HARD
    const distance = calculateDistance(answerCoord[0], recentUserCoord)
    const allwowance =  adjustedAllowance(difficulty)
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
        parseFloat(pathObjectArray[i].x) * adjustedScale() + adjustedX()
      ).toFixed(1)
      let y = (
        parseFloat(pathObjectArray[i].y) * adjustedScale() + adjustedY()
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
    console.log('start animation')
    startWidthAnimation(progressPercentage)
  }

  // this function is to calculate how close the user stayed to the answer path.
  function calculateAccuracy (convertedCurrentPath) {
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
    return accuracy
  }

  function userOnTrackHandler (userOnTrack, path, convertedCurrentPath) {
    if (userOnTrack) {
      calculateProgress(path)
    } 
    else if (userOnTrack === undefined){
      const accuracy = calculateAccuracy(convertedCurrentPath)
      // this prevents a user to draw more than ACCURACY_LIMIT while staying within each check point
      if (accuracy > ACCURACY_LIMIT){
        userFailed()
      }
    }
    else if (!userOnTrack){
      userFailed()
    } 
  }

  function handleFirstTouch (x,y) {
    console.log('first touch',x,y)
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
      setAlertMessage('Nice!')
    }
    // console.log('answerPath: ',answerPath)
  }

  function handleReleaseTouch () {
    if(!isPathCorrect.isCompleted){
      setAlertMessage('Try again!')
      setModalVisible(true)
    }
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
    resetWidthAnimation()
    setCurrentPath('')
    setIsPathCorrect({isCompleted:false, progress:0})
    setAlertMessage('Try again!')
  },[difficulty])

  // whenever user has completed the progress
  useEffect(function startCongratsAnimation() {
    console.log('isPathCorrect.isCompleted: ',isPathCorrect.isCompleted)
    console.log('widthExpandAnimation: ',widthExpandAnimation)
    if(isPathCorrect.isCompleted){
      congratsSound()
      congratsAnimation.start()
      const timeoutId = setTimeout(()=>{
        resetWidthAnimation()
        setCurrentPath('')
        setIsPathCorrect({isCompleted:false, progress:0})
        setAlertMessage('Try again!')
        congratsAnimation.reset()
      },2000)
      return () => {
        clearTimeout(timeoutId)
      }
    }
  }, [isPathCorrect.isCompleted])

  useEffect(() => {
    // if user closes the modal
    if(!modalVisible){
      resetWidthAnimation()
      setCurrentPath('')
      setIsPathCorrect({isCompleted: false,progress: 0,})
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
        <>
          <Animated.View style={[styles.congratsContainer, {left:-40,transform: [{scale:adjustedScale()/5},{ translateY:congratsTranslateY }]}]}>
            <CongratsSVG/>
          </Animated.View>
          <Animated.View style={[styles.congratsContainer, {right:-40,transform: [{scale:adjustedScale()/5},{ translateY:congratsTranslateY },{ scaleX: -1 }]} ]}>
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

        <CustomDrawingPage
          thickness={setThickness()}
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
                colors={[TWO_TONE_PURPLE.c100, TWO_TONE_PURPLE.c200]}
                start={{ x: 0.5, y: 1 }}
                end={{ x: 0.5, y: 0 }}
                locations={[0, 1]}
                style={styles.linearGradientProgressionBar}>
                  <Animated.View 
                    onLayout={handleLayout}
                    style={[{transform: [{translateX: widthExpandAnimation}],}]}
                  >
                  <LinearGradient
                    colors={[TWO_TONE_ORANGE.c100, TWO_TONE_ORANGE.c200]}
                    start={{ x: 0.5, y: 1 }}
                    end={{ x: 0.5, y: 0 }}
                    locations={[0, 1]}
                    style={[styles.percentageBar,{ width: `100%` }]}
                  />
                  </Animated.View>
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
              scale={adjustedScale()}
              x={adjustedX()}
              y={adjustedY()}
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
        </CustomDrawingPage>
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
  textContainer: {
    width: '80%',
    alignSelf: 'center',
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
  percentageBar: {
    height: 60,
    position: 'absolute',
  },
  buttonContainer:{
    flexDirection:'row',
    position:'absolute'
  },
  congratsContainer:{
    position:'absolute', zIndex:1,
  },
})

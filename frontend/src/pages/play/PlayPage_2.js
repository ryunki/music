import {useState, useEffect, useRef}from 'react'

import { Text,ImageBackground, Dimensions , StyleSheet, View, PanResponder, Pressable, Animated} from 'react-native'
import Svg, { Path,Rect, G } from 'react-native-svg'
import { useHeaderHeight } from '@react-navigation/elements'
import CustomPath from '../../components/CustomPath'
import { BUTTON_COLOR, COLOR, SPACING } from '../../../theme/theme'
import CustomDrawingPage from '../../components/CustomDrawingPage'

import { DASH, SCALE_WIDTH,SCALE_HEIGHT } from '../../../constants/constants'
import { screenSize } from '../../../utils/screenFunctions'
import { generatePathPattern_1,generatePathPattern_2 } from '../../../utils/pathPattern/patterns'
import { adjustedAllowance, setThickness, adjustedScale,adjustedX,adjustedY, isPhone } from '../../../utils/functions/playPage_2'
import LinearGradientBackground from './components/LinearGradientBackground'
import { LinearGradient } from 'expo-linear-gradient'
import CustomButton from '../../components/UI/CustomButton'
import CustomButtonLetter from '../../components/UI/CustomButtonLetter'

import {useFonts,PalanquinDark_400Regular, PalanquinDark_500Medium,PalanquinDark_600SemiBold, PalanquinDark_700Bold,} from '@expo-google-fonts/palanquin-dark'
import useSound from '../../hooks/useSound'
import { useSelector } from 'react-redux'

const Y=0
const X=0
const HEIGHT=2.3
const WIDTH=200

const fontTitle = {
  color:COLOR.orange100,
  textShadowColor: 'black',
  textShadowRadius: 5,
}
const fontText = {
  color:COLOR.yellow100,
  textShadowColor: 'black',
  textShadowRadius: 5,
}
const LETTERS = ['C','D','E','F','G','A','B']    
const NOTE_COORDS = {
  'C':[24],
  'D':[12, 96],
  'E':[0, 84],
  'F':[-12, 72],
  'G':[-24, 60],
  'A':[48],
  'B':[36],
}

const PlayPage_2 = () => {
  let [fontsLoaded, fontError] = useFonts({PalanquinDark_400Regular,PalanquinDark_500Medium,PalanquinDark_600SemiBold,PalanquinDark_700Bold,})
  const sound = useSelector((state) => state.toggleSoundAndMusic.sound)
  
  const {buttonSound,failSound,congratsSound,correctNoteSound} = useSound(sound)
  const {screenHeight, screenWidth} = screenSize()

  const [renderNote, setRenderNote] = useState(0)
  const [answerNote, setAnswerNote] = useState('')
  const [isCorrect, setIsCorrect] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  
  const [time, setTime] = useState(0)
  const [displayAccuracyRate, setDisplayAccuracyRate] = useState(0)
  const [attempts, setAttempts] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  
  const [pressedLetter, setPressedLetter] = useState('')
  
  const translateY = useRef(new Animated.Value(-50)).current
  const animatedMessage = Animated.spring(translateY,{
    toValue: 0,
    bounciness:20,
    speed:50,
    useNativeDriver: true,
  })
  const opacity = useRef(new Animated.Value(1)).current
  const animatedMessageDisappear = Animated.timing(opacity,{
    toValue: 0,
    duration:300,
    useNativeDriver: true,
  })
  const animationSequence = Animated.sequence([animatedMessage,animatedMessageDisappear])
  const renderStaffLines = () =>{
    return Array.from({length:5}).map((item, idx) =>{
      return <Rect
          key={idx}
          y={24*idx}
          x={X}
          height={HEIGHT}
          width={screenWidth/adjustedScale()}
          style={styles.staffLine} />
    })
  }

  const onPressLetter = (letter) => {
    if (answerNote === letter){
      correctNoteSound()
      // console.log('correct')
      setIsCorrect(true)
      setAlertMessage('Correct')
    }else{
      // console.log('false')
      failSound()
      setIsCorrect(false)
      setAlertMessage('Wrong')
    }
    setAttempts(attempts+1)
    // setPressedLetter(letter)
  }

  const getNewLetter = () => {
    const randomNumber = Math.floor(Math.random() * 7)
    // pick any letters out of 7 notes
    const randomLetter = LETTERS[randomNumber]
    return randomLetter
  }
  const getNewNote = (randomLetter) => {
    const yCoordsOfNote = NOTE_COORDS[randomLetter]
    // select which coord of note (letter) to display
    const RANDOM_NUMBER = Math.random()
    const noteIndex = Math.floor(RANDOM_NUMBER * yCoordsOfNote.length)
    // select coord of a note using the index
    const finalNoteYcoord = NOTE_COORDS[randomLetter][noteIndex]
    return finalNoteYcoord
  }
  // this useEffect executes when a user touches answer button
  // creates a new note and display accuracy rates
  useEffect(()=>{
    const randomLetter = getNewLetter()
    const finalNoteYcoord= getNewNote(randomLetter)
    if(renderNote === finalNoteYcoord){
      // get new note until it is different to the previous one
      while(true){
        const newRandomLetter = getNewLetter()
        const newFinalNoteYcoord= getNewNote(newRandomLetter)
        if (renderNote !== newFinalNoteYcoord){
          setRenderNote(newFinalNoteYcoord)
          setAnswerNote(newRandomLetter)
          break
        }
      }
    }else{
      setRenderNote(finalNoteYcoord)
      setAnswerNote(randomLetter)
    }

    let rate = 0
    if(isCorrect){
      // if correct at first attempt
      if(attempts === 1){
        rate = 100
        setCorrectCount(1)
      }else{
        rate = (((correctCount+1) / attempts)*100).toFixed(0)
        setCorrectCount(correctCount+1)
      }
    }else{
      // when user visits first
      if(correctCount === 0){
        // set rate to 0 to avoid NaN
        rate = 0
      }else{
        rate = (((correctCount) / attempts)*100).toFixed(0)
      }
    }
    setDisplayAccuracyRate(rate)

    translateY.setValue(-10)
    opacity.setValue(1)
    // animatedMessage.start()
    animationSequence.start()
  },[attempts])

  useEffect(()=>{
    const intervalId = setInterval(()=>{
      setTime(prev => {
        return prev += 1
      })
    },1000)
    return () => {
      clearInterval(intervalId);
    }
  },[])

  function formatAndDisplayTime() {
    const second = time % 60 
    const minute = Math.floor(time / 60)
    const hour = Math.floor(time / 3600)
    return `${hour ? hour+'h ': '' }${minute ? minute+'m ' : ''}${second}s`
  }

  if (!fontsLoaded && !fontError) {
    console.log('no loaded')
    return null
  }
  return (
    <>
     <LinearGradientBackground>
      <View style={[styles.scoreBoardContainer,{flex:4}]}>
        <View style={styles.linearGradientWrapper}>
          <LinearGradient 
            colors={[BUTTON_COLOR.c100,BUTTON_COLOR.c200,BUTTON_COLOR.c300,BUTTON_COLOR.c400,BUTTON_COLOR.c500]}
            start={{ x: 0.5, y: 1 }}
            end={{ x: 0.5, y: 0 }}
            locations={[0.03, 0.15, 0.5, 0.85, 0.97]}
            style={styles.scoreContentsContainer}>
              <View style={{justifyContent:'center',flex:1}}>
                <Text style={[fontTitle, styles.ContainerTitle]}>SCORE BOARD</Text>
              </View>
              <View style={{flexDirection:'row',flex:2}}>
                <View style={styles.scoreContents}>
                  <Text style={[fontTitle, styles.contentTitle]}>Time</Text>
                  <Text style={[fontText, styles.contentText]}>{formatAndDisplayTime()}</Text>
                </View>
                <View style={styles.scoreContents}>
                  <Text style={[fontTitle, styles.contentTitle]}>Accuracy</Text>
                  <Text style={[fontText, styles.contentText]}>{displayAccuracyRate ? `${displayAccuracyRate}%` : `${0}%`}</Text>
                </View>
                <View style={styles.scoreContents}>
                  <Text style={[fontTitle, styles.contentTitle]}>Attempts</Text>
                  <Text style={[fontText, styles.contentText]}>{attempts}</Text>
                </View>
              </View>
          </LinearGradient>
        </View>
      </View>
      {/* <Svg width='100%' height='50%' viewBox="0 0 400 200"> */}
      <Svg width='100%' height='50%' viewBox={`0 0 ${screenWidth} ${screenHeight*0.5}`}>
        <G x={0} y={adjustedY()} scale={adjustedScale()}>
          {renderStaffLines()}
          {/* treble clef */}
          <Path x={0} y={-63} scale={3.3} d="M 20.6756 48.7896 C 17.9838 48.7781 15.1593 47.2794 13.4222 45.4811 C 11.408 43.3962 10.4722 40.4685 10.5434 38.02 C 10.7569 30.8232 18.5239 26.1681 21.3168 22.8846 C 23.1848 20.6862 23.5447 19.6425 23.933 18.5425 C 24.6779 16.4108 24.6865 13.9617 22.98 13.8673 C 21.3519 13.7766 20.1519 16.3311 19.6442 18.0632 C 19.1897 19.6165 18.9151 21.1681 19.3558 23.4568 C 19.5543 24.483 25.0504 53.1487 25.1439 53.5897 C 26.0493 58.0289 23.5211 60.0194 20.8623 60.4873 C 15.1223 61.5 12.9651 55.8669 15.4412 53.5545 C 17.3508 51.7763 20.3246 53.0639 20.3129 55.8261 C 20.3041 58.2713 17.8544 58.474 17.2232 58.4484 C 18.2751 60.0831 25.5729 60.5807 24.0587 53.0364 C 23.8467 51.9757 18.7461 25.0338 18.6245 24.43 C 17.7075 19.921 17.4176 16.3297 19.6238 12.0013 C 20.4399 10.4056 21.8033 9.3289 22.5046 9.4251 C 22.6621 9.4442 22.8171 9.4909 22.9446 9.6094 C 24.9032 11.3804 25.6905 15.505 25.6126 17.8991 C 25.5338 20.3519 25.5492 22.8858 23.2148 25.9614 C 22.3112 27.1548 19.5055 29.821 17.8959 31.3526 C 15.6344 33.5052 14.0108 35.3661 13.1905 37.5527 C 12.2749 40.0102 12.2539 43.0428 14.7546 45.603 C 16.1915 47.0454 18.4987 48.004 20.3919 47.9283 C 25.6652 47.7145 27.0695 45.1023 26.9661 42.2327 C 26.8004 37.5044 20.8632 36.024 18.6304 39.3955 C 17.3365 41.3526 18.0528 43.3022 19.0385 44.1971 C 19.3753 44.5042 19.7471 44.7311 20.0936 44.8498 C 20.2172 44.8942 20.5167 45.0115 20.4409 45.2072 C 20.383 45.3706 20.2508 45.3853 20.1292 45.38 C 18.6024 45.28 16.851 43.9558 16.314 41.547 C 15.5237 38.0367 18.5099 33.6635 23.1218 34.1141 C 26.1373 34.4059 29.0503 36.7724 29.054 41.47 C 29.0535 45.4912 25.8087 48.8101 20.6756 48.7896 Z M 20.6756 48.7896"/>
          {/* a note */}
          <Path x={150} y={renderNote} d="M 10.3629 24.318 C 4.8659 22.6261 0.5288 18.0286 0.5288 13.8934 C 0.5288 2.1892 25.6684 -2.4425 36.0504 7.349 C 47.2772 17.9372 28.9555 30.0405 10.3629 24.318 Z M 27.131 21.3777 C 30.1896 16.7098 27.2654 7.4613 21.9677 5.0475 C 14.1879 1.5028 9.4192 7.5434 12.6595 16.8383 C 14.9007 23.2674 24.0188 26.1276 27.131 21.3777 Z" style="fill:#000000" />

          {/* <AnimatedPath  x={150} y={noteSpring} fill='#000000' d="M 10.3629 24.318 C 4.8659 22.6261 0.5288 18.0286 0.5288 13.8934 C 0.5288 2.1892 25.6684 -2.4425 36.0504 7.349 C 47.2772 17.9372 28.9555 30.0405 10.3629 24.318 Z M 27.131 21.3777 C 30.1896 16.7098 27.2654 7.4613 21.9677 5.0475 C 14.1879 1.5028 9.4192 7.5434 12.6595 16.8383 C 14.9007 23.2674 24.0188 26.1276 27.131 21.3777 Z" /> */}
        </G>
      </Svg>
      <Animated.View style={[styles.alertMessageWrapper,{opacity:opacity, transform:[{translateY}]}]}>
          <Text style={[styles.alertMessageText]}>{alertMessage}</Text>
      </Animated.View>
      <View style={[styles.containerLetters, {flex:2}]}>
        {LETTERS.map((letter, idx)=>(
          <CustomButtonLetter key={idx} onPress={onPressLetter} text={letter} fontSize={isPhone() ? 25 : 40} pressedLetter={pressedLetter} setPressedLetter={setPressedLetter}/>
          ))
        }
      </View>
    </LinearGradientBackground>
    </>
            
  )
}

export default PlayPage_2

const styles = StyleSheet.create({
  scoreBoardContainer:{
    // backgroundColor:'gray',
    alignItems:'center',
    justifyContent:'center',
    width:'100%'
  },
  containerLetters:{
    // backgroundColor:'gray',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  },  
  staffLine:{
    opacity:1,
    fill:'#000000',
    fillOpacity:1,
    stroke:'none'
  },
  linearGradientWrapper:{
    borderRadius: 20,
    borderWidth: 2,
    overflow:'hidden',
    marginTop:50,
    borderColor: '#5E0C9E',
  },
  scoreContentsContainer: {
    paddingVertical:SPACING.space_10,
    paddingHorizontal:SPACING.space_8,
    maxWidth:400,
    alignItems:'center',
    justifyContent:'center'
  },
  scoreContents:{
    justifyContent:'center',
    alignItems:'center',
    marginHorizontal:8,
  },
  ContainerTitle:{
    fontSize:35,
    letterSpacing: 2,
    fontFamily: 'PalanquinDark_400Regular',
  },
  contentTitle:{
    fontSize:20,
    letterSpacing: 2,
    fontFamily: 'PalanquinDark_400Regular',
  },
  contentText:{
    textAlign:'center',
    fontSize:18,
  },
  alertMessageWrapper:{
    // backgroundColor:'blue',
    position:'absolute',
    bottom: isPhone() ? 80 : 100,
    alignItems:'center',
  },
  alertMessageText:{
    fontSize:40,
    fontFamily: 'PalanquinDark_400Regular',
    color:BUTTON_COLOR.c300,
    textShadowColor: 'black',
    textShadowRadius: 1,
    textAlign:'center',
    letterSpacing:1,
    // this minWidth prevent text shadow cut off. custom text is too big
    minWidth:180,
    // backgroundColor:'gray'

  }
})

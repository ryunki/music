import {useState, useEffect, useRef}from 'react'
import { Text, StyleSheet, View, Animated} from 'react-native'

import { LinearGradient } from 'expo-linear-gradient'
import {useFonts,PalanquinDark_400Regular,} from '@expo-google-fonts/palanquin-dark'

import LinearGradientBackground from './components/LinearGradientBackground'
import CustomButtonLetter from '../../components/UI/CustomButtonLetter'

import { BUTTON_COLOR, COLOR, SPACING } from '../../../theme/theme'
import { screenSize } from '../../../utils/screenFunctions'
import { adjustedScale,adjustedY, isPhone, isLargeTablet } from '../../../utils/functions/playPage_2'
import useSound from '../../hooks/useSound'

import { useSelector } from 'react-redux'
import RenderNote from './components/RenderNote'

const ANIMATION_MESSAGE_DROP = -10

const CORRECT = 'Correct'
const WRONG = 'Wrong'

const FONT_SIZE =  isPhone() ? 25 : isLargeTablet() ? 80 : 30

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
  let [fontsLoaded, fontError] = useFonts({PalanquinDark_400Regular,})
  const sound = useSelector((state) => state.toggleSoundAndMusic.sound)
  
  const {failSound, correctNoteSound} = useSound(sound)

  const [renderNote, setRenderNote] = useState(0)
  const [answerNote, setAnswerNote] = useState('')
  const [isCorrect, setIsCorrect] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  
  const [time, setTime] = useState(0)
  const [displayAccuracyRate, setDisplayAccuracyRate] = useState(0)
  const [attempts, setAttempts] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  
  const [pressedLetter, setPressedLetter] = useState('')
  
  const translateY = useRef(new Animated.Value(ANIMATION_MESSAGE_DROP)).current
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

  const onPressLetter = (letter) => {
    if (answerNote === letter){
      correctNoteSound()
      setIsCorrect(true)
      setAlertMessage(CORRECT)
    }else{
      failSound()
      setIsCorrect(false)
      setAlertMessage(WRONG)
    }
    setAttempts(attempts+1)
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
    // avoid displaying the same notes consecutively
    while(true){
      const randomLetter = getNewLetter()
      const finalNoteYcoord= getNewNote(randomLetter)
      if (renderNote !== finalNoteYcoord){
        setRenderNote(finalNoteYcoord)
        setAnswerNote(randomLetter)
        break
      }
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
    // reset values for animation
    translateY.setValue(ANIMATION_MESSAGE_DROP)
    opacity.setValue(1)
    animationSequence.start()
  },[attempts])

  useEffect(function timer(){
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
    const hour = Math.floor(minute / 60)
    return `${hour ? hour+'h ': '' }${minute ? minute % 60+'m ' : ''}${second}s`
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
            style={[styles.scoreContentsContainer, ]}>
              <View style={{justifyContent:'center',}}>
                <Text style={[fontTitle, styles.ContainerTitle]}>SCORE BOARD</Text>
              </View>
              <View style={{flexDirection:'row', marginBottom:15}}>
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
      
      {/* render random note with TrebleClef and staff lines */}
      <RenderNote renderNote={renderNote}/>

      <Animated.View style={[styles.alertMessageWrapper,{opacity:opacity, transform:[{translateY}]}]}>
          <Text style={[styles.alertMessageText]}>{alertMessage}</Text>
      </Animated.View>
      <View style={[styles.containerLetters, {flex:2}]}>
        {LETTERS.map((letter, idx)=>(
          <CustomButtonLetter key={idx} onPress={onPressLetter} text={letter} fontSize={FONT_SIZE} pressedLetter={pressedLetter} setPressedLetter={setPressedLetter}/>
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
    marginTop: 25,
    alignItems:'center',
    justifyContent:'center',
    width:'100%'
  },
  containerLetters:{
    // backgroundColor:'gray',
    paddingHorizontal:30,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    flexWrap: 'wrap',
    gap: 15,
  },  
  linearGradientWrapper:{
    borderRadius: 20,
    borderWidth: 2,
    overflow:'hidden',
    marginTop:isPhone()? '15%': '10%',
    borderColor: '#5E0C9E',
    backgroundColor: '#5E0C9E',
    // backgroundColor:'gray',
    // width: isLargeTablet() && '80%',
    // height: isLargeTablet() && '80%'
    width: isLargeTablet() && '80%',
    // height: '80%'
    
  },
  scoreContentsContainer: {
    paddingVertical:SPACING.space_10,
    paddingHorizontal:SPACING.space_8,
    // maxWidth: 600,
    height: isLargeTablet() && '100%',
    alignItems:'center',
    justifyContent:'center'
  },
  scoreContents:{
    justifyContent:'center',
    alignItems:'center',
    marginHorizontal:8,
  },
  ContainerTitle:{
    fontSize: isLargeTablet() ? 50 : 35,
    letterSpacing: 2,
    fontFamily: 'PalanquinDark_400Regular',
  },
  contentTitle:{
    fontSize: isLargeTablet() ? 40 : 20,
    letterSpacing: 2,
    fontFamily: 'PalanquinDark_400Regular',
  },
  contentText:{
    textAlign:'center',
    fontSize: isLargeTablet() ? 40 : 18,
  },
  alertMessageWrapper:{
    // backgroundColor:'blue',
    position:'absolute',
    bottom: isPhone() ? '15%' : '15%',
    alignItems:'center',
  },
  alertMessageText:{
    fontSize: isLargeTablet() ? 80: 40,
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

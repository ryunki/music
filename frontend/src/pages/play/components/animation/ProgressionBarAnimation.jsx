import React, {useState, useRef, useEffect} from 'react'
import {Easing, StyleSheet,View,Text,Animated,} from 'react-native'
import { TWO_TONE_ORANGE } from '../../../../../theme/theme'
import { LinearGradient } from 'expo-linear-gradient'

const ProgressionBarAnimation = ({startProgressAnimation}) => {
  // get width of the progress bar when it's 100%. this state is used for animation
  // initial value is 1000 so that the yellow progression bar doesnt show up at the beginning (flash)
  const [progressBarWidth, setProgressBarWidth] = useState(1000)

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

  function handleLayout(event) {
    const { width } = event.nativeEvent.layout;
    setProgressBarWidth(width)
  }

  useEffect(()=>{
    if(startProgressAnimation.isValid){
      startWidthAnimation(startProgressAnimation.progress)
    }else{
      resetWidthAnimation()
    }
  },[startProgressAnimation.progress, startProgressAnimation.isValid])
  
  return (
    <Animated.View 
      onLayout={handleLayout}
      style={[{
        transform: [{translateX: widthExpandAnimation}],
      }]}
    >
    <LinearGradient
      colors={[TWO_TONE_ORANGE.c100, TWO_TONE_ORANGE.c200]}
      start={{ x: 0.5, y: 1 }}
      end={{ x: 0.5, y: 0 }}
      locations={[0, 1]}
      style={[styles.percentageBar,{ width: `100%` }]}
    />
    </Animated.View>
  )
}
const styles = StyleSheet.create({
  percentageBar: {
    height: 60,
    position: 'absolute',
  },
})
export default ProgressionBarAnimation

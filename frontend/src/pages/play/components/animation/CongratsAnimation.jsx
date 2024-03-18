import React, {useRef, useEffect} from 'react'
import {Easing, StyleSheet,View,Text,Animated,} from 'react-native'
import { adjustedScale } from '../../../../../utils/functions/playPage_1'
import CongratsSVG from '../../../../components/SVG/CongratsSVG'

const CongratsAnimation = ({startCongratsAnimation}) => {
  const ADJUSTED_SCALE = adjustedScale()
  // for congrats animation
  const congratsTranslateY = useRef(new Animated.Value(-100)).current
  const congratsAnimation = Animated.spring(congratsTranslateY, {
    toValue: 0,
    bounciness:30,
    useNativeDriver: true, // set to true if possible
  })
  useEffect(() => {
    if(startCongratsAnimation){
      congratsAnimation.start()
    }else{
      congratsAnimation.reset()
    }
  }, [startCongratsAnimation])
  
  return (
      <>
        <Animated.View style={[styles.congratsContainer, {left:-40,transform: [{scale:ADJUSTED_SCALE/5},{ translateY:congratsTranslateY }]}]}>
          <CongratsSVG/>
        </Animated.View>
        <Animated.View style={[styles.congratsContainer, {right:-40,transform: [{scale:ADJUSTED_SCALE/5},{ translateY:congratsTranslateY },{ scaleX: -1 }]} ]}>
          <CongratsSVG/>
        </Animated.View>
      </>
  )
}

const styles = StyleSheet.create({
  congratsContainer:{
    position:'absolute', zIndex:1,
  },
})
export default CongratsAnimation
import {useState, useEffect, useRef}from 'react'

import { ScrollView, Platform, ImageBackground, Dimensions , StyleSheet, View, PanResponder, Pressable, Text} from 'react-native'
import Svg, { Path, G, Defs, Use, Circle } from 'react-native-svg'

import { COLOR, SPACING } from '../../../theme/theme'
import { LinearGradient } from 'expo-linear-gradient'
import TrebleClefWithStaffLines from './components/TrebleClefWithStaffLines'
import { screenSize } from '../../../utils/screenFunctions'
import LinearGradientBackground from './components/LinearGradientBackground'
// import { ScrollView } from 'react-native-gesture-handler'

// phone
// const SMALLEST_MOBILE = 2.5
const SMALLEST_MOBILE = 1
const SMALL_MOBILE = 1
// Tablet
const MEDIUM_MOBILE = 1
const LARGE_MOBILE = 1

const PlayStackHome = ({navigation}) => {
  const stages = [1,2,3,4]
  const {screenHeight, screenWidth} = screenSize()
  const navigateTo = (idx) =>{
    // console.log('pressed stage',idx)
    // console.log(navigation.navigate(`DrawingStage_${idx}`))\
    navigation.navigate(`PlayStage_${idx}`)
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
    // return screenWidth / 2 - (SMALLEST_MOBILE * 100 / 2)
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
  return (
    <LinearGradientBackground>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {stages.map((item,idx)=>(
            <LinearGradient  key={idx}
              colors={['#260C72','#4121A0','#7048E1','#B094FF']}
              start={{ x: 0.5, y: 1 }}
              end={{ x: 0.5, y: 0 }}
              locations={[0.02, 0.3, 0.7, 0.98]}
              style={styles.linearGradientStageButtons}
            >
              <Pressable style={[styles.pressableStages ]} onPress={()=>navigateTo(item)}>
                <Svg 
                  height="100%" width="100%" 
                  viewBox="0 0 100 100"
                  > 
                    {item === 1 && <TrebleClefWithStaffLines stroke={'black'} strokeWidth={2} fillStaffLines='#DB8686' fillTrebleClef='#F2E91C'/>}
                </Svg>
              </Pressable>
            </LinearGradient>
          ))}
         
        </ScrollView>
      </LinearGradientBackground>
   
  )
}

export default PlayStackHome

const styles = StyleSheet.create({
  linearGradientBackground:{
    flex:1,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  linearGradientStageButtons:{
    borderRadius:SPACING.space_20,
    shadowOpacity:1,
    elevation: 10,
    shadowColor:'black',
    marginTop:'10%',
    // marginHorizontal:'10%',
    // backgroundColor:'yellow'
    flex:1,
    height:300,
    width:300
  },
  pressableStages:{
    borderRadius:SPACING.space_20,
  },
  trebleClefSVG:{
    // alignSelf:'center'
    backgroundColor:'green'
  },
  stageTitle:{
    color:COLOR.white300,
    backgroundColor:'blue',
    textAlign:'center',
  },
  // this code is to apply styles accordingly
  // ...Platform.select({
  //   ios:{
  //     commonProp:{

  //     }
  //   },
  //   android:{
  //     commonProp:{

  //     }
  //   }
  // }), 
})
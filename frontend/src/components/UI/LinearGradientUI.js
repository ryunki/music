import React from 'react'
import { ScrollView, Platform, ImageBackground, Dimensions , StyleSheet, View, PanResponder, Pressable, Text} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { SPACING } from '../../../theme/theme'
const LinearGradientUI = (props) => {
  return (
    <LinearGradient 
      {...props}
      // style={props.style}
      // colors={props.colors}
      // start={props.start}
      // end={props.end}
      // locations={props.locations}
    >
      {props.children}
    </LinearGradient>
  )
}

export default LinearGradientUI


const styles = StyleSheet.create({

})

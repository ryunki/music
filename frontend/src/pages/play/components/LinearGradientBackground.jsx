import React from 'react'
import { ScrollView, Platform, ImageBackground, Dimensions , StyleSheet, View, PanResponder, Pressable, Text} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
const LinearGradientBackground = ({children}) => {
  return (
    <LinearGradient 
      colors={['#FDE07A','#C172FF']}
      start={{ x: 0.5, y: 1 }}
      end={{ x: 0.5, y: 0 }}
      locations={[0.1, 0.9]}
      style={styles.linearGradientBackground}
    >
      {children}
    </LinearGradient>

  )
}

export default LinearGradientBackground

const styles = StyleSheet.create({
  linearGradientBackground:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    width:'100%'
    // backgroundColor:'gray'
  }
})
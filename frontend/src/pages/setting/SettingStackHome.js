import {useState, useEffect, useRef}from 'react'

import { ImageBackground, Dimensions , StyleSheet, View, PanResponder, Pressable, Text} from 'react-native'
import { COLOR, SPACING } from '../../../theme/theme'

const SettingStackHome = ({navigation}) => {
  const stages = [1,2,3]

  const navigateTo = (idx) =>{
    // console.log('pressed stage',idx)
    // console.log(navigation.navigate(`DrawingStage_${idx}`))\
    navigation.navigate(`PlayStage_${idx}`)
  }

  return (
    <View style={styles.container}>
      <Text>Setting Page</Text>
    </View>
  )
}

export default SettingStackHome

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'gray'
  },
  stages:{
    flex:1,
    justifyContent:'center',
    backgroundColor:'green',
    alignItems:'center',
    margin:SPACING.space_10,
    borderRadius:SPACING.space_20,
  },
  stageTitle:{
    color:COLOR.white300,
    backgroundColor:'blue',
    textAlign:'center',
  }
})
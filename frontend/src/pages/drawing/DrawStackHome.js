import {useState, useEffect, useRef}from 'react'

import { ImageBackground, Dimensions , StyleSheet, View, PanResponder, Pressable, Text} from 'react-native'
import { COLOR, SPACING } from '../../../theme/theme'

const DrawStackHome = ({navigation}) => {
  const array = [1,2,3,4]
  const navigateTo = (idx) =>{
    console.log('pressed stage',idx)
    console.log(navigation.navigate(`DrawingStage_${idx}`))
  }
  return (
    <View style={styles.container}>
      {array.map((item,idx)=>(
        <Pressable key={idx} style={styles.stages} onPress={()=>navigateTo(item)}>
          <Text style={styles.stageTitle}>Stage {item}</Text>
        </Pressable>
      ))}
    </View>
  )
}

export default DrawStackHome

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'red'
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
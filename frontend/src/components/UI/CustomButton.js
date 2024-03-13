import { LinearGradient } from 'expo-linear-gradient'
import React, {useState} from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { SPACING } from '../../../theme/theme'

const CustomButton = ({text, fontSize, onPress, difficulty}) => {

  return (
    <View style={[styles.modalContainer, {opacity: difficulty === text ? 1 : 0.5}]}>
      <LinearGradient colors={['#2A0B81', '#6D46DA', '#7F27FF', '#7E53F7', '#A484FF']}
        start={{ x: 0.5, y: 1 }}
        end={{ x: 0.5, y: 0 }}
        locations={[0.03, 0.15, 0.5, 0.85, 0.97]}
        style={styles.wrapper}>
          <Pressable onPress={() => onPress(text)}>
            <Text style={[styles.text,{fontSize}]}>{text}</Text>
          </Pressable>
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  modalContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  wrapper: {
    paddingHorizontal:SPACING.space_20,
    zIndex: 1,
    // this background color fills the gap between the linear gradient and the border line
    backgroundColor: '#5E0C9E',
    borderColor: '#5E0C9E',
    borderRadius: 20,
    borderWidth: 1,
    width:120,
  },
  text: {
    textAlign: 'center',
    fontFamily: 'PalanquinDark_400Regular',
    color: '#FFF500',
    textShadowColor: 'black',
    textShadowRadius: 10,
    // this lineheight adjusts the text right in the center vertically 
    // because the fontsize is large.
    lineHeight: 50,
    // width:'100%'
  },
})
export default CustomButton


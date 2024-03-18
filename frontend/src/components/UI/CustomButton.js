import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { BORDER_PURPLE, BUTTON_COLOR, COLOR, SPACING } from '../../../theme/theme'
import { isPhone } from '../../../utils/functions/playPage_2'
import { useFonts,PalanquinDark_400Regular,} from '@expo-google-fonts/palanquin-dark'

const CustomButton = ({text, onPress, buttonProps, opacity}) => {
  let [fontsLoaded, fontError] = useFonts({PalanquinDark_400Regular,})
  if (!fontsLoaded && !fontError) {
    console.log('no loaded')
    return null
  }
  return (
    <View style={[styles.modalContainer, {opacity, borderRadius: buttonProps.borderRadius}]}>
      <LinearGradient colors={[BUTTON_COLOR.c100,BUTTON_COLOR.c200,BUTTON_COLOR.c300,BUTTON_COLOR.c400,BUTTON_COLOR.c500]}
        start={{ x: 0.5, y: 1 }}
        end={{ x: 0.5, y: 0 }}
        locations={[0.03, 0.15, 0.5, 0.85, 0.97]}
        style={styles.wrapper}>
          <Pressable onPress={() => onPress(text)}>
            <Text style={[styles.text,{fontSize:buttonProps.fontSize, minWidth:buttonProps.minWidth, lineHeight:buttonProps.lineHeight}]}>{text}</Text>
          </Pressable>
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  modalContainer:{
    // flex:1,
    // justifyContent:'center',
    // alignItems:'center',
    backgroundColor: BORDER_PURPLE.c100,
    borderColor: BORDER_PURPLE.c100,
    // borderRadius: 20,
    borderWidth: 2,
    overflow:'hidden',
    // minWidth:50,
    marginHorizontal: isPhone() ? 35 : 50,
  },
  wrapper: {
    // paddingHorizontal: isPhone() ? SPACING.space_10 : SPACING.space_20,
    paddingHorizontal: isPhone() ? SPACING.space_10 : SPACING.space_20,
    // marginHorizontal:SPACING.space_20,
    // zIndex: 1,
    // this background color fills the gap between the linear gradient and the border line
  },
  text: {
    textAlign: 'center',
    fontFamily: 'PalanquinDark_400Regular',
    color: COLOR.yellow300,
    textShadowColor: 'black',
    textShadowRadius: 5,
    // this lineheight adjusts the text right in the center vertically 
    // because the fontsize is large.
    // lineHeight: 50,
    // set minwidth because the custom font's default size is too large the text shadow cuts off at the edge of the text box
    // adding padding doesn't work
    // minWidth:80,
  },
})
export default CustomButton


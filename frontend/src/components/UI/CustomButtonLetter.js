import { LinearGradient } from 'expo-linear-gradient'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { BORDER_PURPLE, BORDER_RADIUS, BUTTON_COLOR, COLOR, SPACING } from '../../../theme/theme'
import { isPhone, isLargeTablet } from '../../../utils/functions/playPage_2'

const BUTTON_WIDTH = isLargeTablet() ? 80 : isPhone() ? 40 : 50

const CustomButtonLetter = ({text, fontSize, onPress, pressedLetter, setPressedLetter}) => {

  const onPressIn = () => {
    setPressedLetter(text)
    console.log('press in')
  }
  const onPressOut = () => {
    setPressedLetter('')
  }
  
  return (
    <Pressable onPress={()=>onPress(text)} onPressIn={onPressIn} onPressOut={onPressOut}>
      <View style={[styles.modalContainer, {opacity: (pressedLetter === text) ? 0.5: 1}]}>
        <LinearGradient colors={[BUTTON_COLOR.c100,BUTTON_COLOR.c200,BUTTON_COLOR.c300,BUTTON_COLOR.c400,BUTTON_COLOR.c500]}
          start={{ x: 0.5, y: 1 }}
          end={{ x: 0.5, y: 0 }}
          locations={[0.03, 0.15, 0.5, 0.85, 0.97]}
          style={styles.wrapper}>
          
              <Text style={[styles.text,{fontSize}]}>{text}</Text>
        </LinearGradient>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  modalContainer:{
    // flex:1,
    justifyContent:'center',
    alignItems:'center',
    // backgroundColor:'red'
    backgroundColor: BORDER_PURPLE.c100,
    borderColor: BORDER_PURPLE.c100,
    borderRadius: BORDER_RADIUS.radius_10,
    borderWidth: 2,
    overflow:'hidden',
    // paddingHorizontal:SPACING.space_12,
    marginHorizontal: isPhone() ? SPACING.space_4 : SPACING.space_10,
  },
  wrapper: {
    width: BUTTON_WIDTH
  },
  text: {
    textAlign: 'center',
    color: COLOR.yellow200,
    textShadowColor: 'black',
    textShadowRadius: 5,
    letterSpacing:2
  },
})
export default CustomButtonLetter
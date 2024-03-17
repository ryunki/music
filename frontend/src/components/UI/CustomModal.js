import React from 'react'
import { StyleSheet, View, Text, Modal, Pressable } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { SPACING } from '../../../theme/theme'
import LinearGradientUI from './LinearGradientUI'
import { useFonts,PalanquinDark_400Regular,} from '@expo-google-fonts/palanquin-dark'
const CustomModal = ({ text, modalVisible, setModalVisible }) => {
  
  let [fontsLoaded, fontError] = useFonts({PalanquinDark_400Regular,})
  if (!fontsLoaded && !fontError) {
    console.log('no loaded')
    return null
  }
  return (
    <>
      {/* <View style={styles.container}> */}
      <Modal
        // animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
            setModalVisible(!modalVisible)
          }}
        >
        <View style={styles.modalContainer}>
          <LinearGradient colors={['#2A0B81', '#6D46DA', '#7F27FF', '#7E53F7', '#A484FF']}
            start={{ x: 0.5, y: 1 }}
            end={{ x: 0.5, y: 0 }}
            locations={[0.03, 0.15, 0.5, 0.85, 0.97]}
            style={styles.wrapper}>
              <Pressable onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.text}>{text}</Text>
              </Pressable>
          </LinearGradient>
        </View>
      </Modal>
      {/* </View> */}
    </>
  )
}

export default CustomModal

const styles = StyleSheet.create({
  modalContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  wrapper: {
    padding:SPACING.space_20,
    zIndex: 1,
    // this background color fills the gap between the linear gradient and the border line
    backgroundColor: '#5E0C9E',
    borderColor: '#5E0C9E',
    borderRadius: 20,
    borderWidth: 1,
    width:'80%',
  },
  text: {
    textAlign: 'center',
    fontFamily: 'PalanquinDark_400Regular',
    color: '#FFF500',
    textShadowColor: 'black',
    textShadowRadius: 20,
    // this lineheight adjusts the text right in the center vertically 
    // because the fontsize is large.
    lineHeight: 75,
    fontSize: 50,
    
  },
})

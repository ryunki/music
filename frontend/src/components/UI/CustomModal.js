import React from 'react'
import { StyleSheet, View, Text, Modal, Pressable } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
const CustomModal = ({ text, modalVisible, setModalVisible }) => {
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
          <LinearGradient
            // Background Linear Gradient
            style={styles.container}
            colors={['#2A0B81', '#6D46DA', '#7F27FF', '#7E53F7', '#A484FF']}
            start={{ x: 0.5, y: 1 }}
            end={{ x: 0.5, y: 0 }}
            locations={[0.03, 0.15, 0.5, 0.85, 0.97]}>
            
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
    // backgroundColor:'gray',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    
  },
  container: {
    // flex:1,
    width: 200,
    height: '11%',
    // position: 'absolute',
    zIndex: 1,
    // this background color fills the gap between the linear gradient and the border line
    // backgroundColor: 'rgba(0,0,0,0.5)',
    // backgroundColor: '#5E0C9E',
    borderRadius: 20,
    borderColor: '#5E0C9E',
    borderWidth: 1,
    justifyContent: 'center',
    

  },

  text: {
    textAlign: 'center',
    fontSize: 30,
    fontFamily: 'PalanquinDark_400Regular',
    color: '#FFF500',
    textShadowColor: 'black',
    textShadowRadius: 20,
    // position:'relative',
    elevation:5,
    // textAlignVertical:'center'
    // textAlignVertical:'top'
    lineHeight:45
  },
})

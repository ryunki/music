import {useState, useEffect, useRef}from 'react'

import { ImageBackground, Dimensions , StyleSheet, View, PanResponder, Pressable, Text} from 'react-native'
import { COLOR, SPACING } from '../../../theme/theme'
import LinearGradientBackground from '../play/components/LinearGradientBackground'
import CustomButton from '../../components/UI/CustomButton'
import { useDispatch, useSelector } from 'react-redux'
import { toggleMusic, toggleSound } from '../../../store/features/sound/soundSlice'
import useSound from '../../hooks/useSound'

const SettingStackHome = ({}) => {
  const sound = useSelector((state) => state.toggleSoundAndMusic.sound)
  const music = useSelector((state) => state.toggleSoundAndMusic.music)
  const {buttonSound} = useSound(sound)
  const dispatch = useDispatch()
  const onPressMusicButton = (text) =>{
    buttonSound()
    console.log('turn music: ',text)
    if(text === 'On'){
      dispatch(toggleMusic(true))
    }else{
      dispatch(toggleMusic(false))
    }
  }
  const onPressSoundButton = (text) =>{
    console.log('turn sound: ',text)
    buttonSound()
    if(text === 'On'){
      dispatch(toggleSound(true))
    }else{
      dispatch(toggleSound(false))
    }
  }

  return (
    <LinearGradientBackground>
      <View style={styles.musicContainer}>
        <Text style={styles.title}>Music</Text>
        <View style={styles.buttonWrapper}>
          <CustomButton text={'On'} fontSize={30} onPress={onPressMusicButton} opacity={!music ? 0.5 : 1} borderRadius={20} minWidth={80} lineHeight={50}/>
        </View>
        <View style={styles.buttonWrapper}>
          <CustomButton text={'Off'} fontSize={30} onPress={onPressMusicButton} opacity={music ? 0.5 : 1} borderRadius={20} minWidth={80} lineHeight={50}/>
        </View>
      </View>
      <View style={styles.soundContainer}>
        <Text style={styles.title}>Sound</Text>
        <View style={styles.buttonWrapper}>
          <CustomButton text={'On'} fontSize={30} onPress={onPressSoundButton} opacity={!sound ? 0.5 : 1} borderRadius={20} minWidth={80} lineHeight={50}/>
        </View>
        <View style={styles.buttonWrapper}> 
          <CustomButton text={'Off'} fontSize={30} onPress={onPressSoundButton} opacity={sound ? 0.5 : 1} borderRadius={20} minWidth={80} lineHeight={50}/>
        </View>
      </View>
    </LinearGradientBackground>
  )
}

export default SettingStackHome

const styles = StyleSheet.create({
  musicContainer:{
    flex:1,
    alignItems:'center',
  },
  soundContainer:{
    flex:1,
    alignItems:'center',
  },
  title:{
    marginTop: 20,
    textAlign: 'center',
    fontSize: 60,
    // fontFamily: 'PalanquinDark_400Regular',
    color: COLOR.yellow300,
    textShadowColor: 'black',
    textShadowRadius: 10,
  },
  text:{
    textAlign: 'center',
    color: COLOR.yellow300,
    fontSize: 35,
    fontWeight: 'bold',
    position: 'absolute',
    textShadowColor: 'black',
    textShadowRadius: 5,
  },
  buttonWrapper:{
    marginTop:SPACING.space_10,
    // backgroundColor:'red'
  }
  
})
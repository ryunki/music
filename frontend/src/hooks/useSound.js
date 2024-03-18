import React, { useState, useEffect} from 'react'
import { Audio } from 'expo-av'

// and any sounds you wish to add in this custom hook.
const useSound = (isSound) => {
  const [sound, setSound] = useState()
  
  async function turnOnSound(sound) {
    if(isSound){
      setSound(sound)
      try{
        await sound.playAsync()
      }catch(error){
        console.log(error)
      }
    }
  }

  async function stopBackgroundMusic() {
    try{
      const { sound } = await Audio.Sound.createAsync(require('../../assets/sound/backgroundMusic.mp3'))
      await sound.stopAsync()
      setSound(sound)
    }catch(error){
      console.log('error', error)
    }
    
    // sound.setIsLoopingAsync(false)
  }
  async function playBackgroundMusic() {
    try{
      const { sound } = await Audio.Sound.createAsync(require('../../assets/sound/backgroundMusic.mp3'))
      console.log('Music on')
      setSound(sound)
      await sound.playAsync()
      await sound.setVolumeAsync(0.5)
      await sound.setIsLoopingAsync(true)
    }catch(error){
      console.log('error: ',error)
    }
  }

  async function buttonSound() {
    try{
      const { sound } = await Audio.Sound.createAsync( require('../../assets/sound/buttonPress.wav'))
      turnOnSound(sound)
    }catch(error){
      console.log('error: ',error)
    }
    // setSound(sound)
    // await sound.playAsync()
  }

  async function congratsSound() {
    try{
      const randomNumberBetween1And2 = Math.floor(Math.random() * 2) + 1
      const soundFile = randomNumberBetween1And2 === 1 ? await Audio.Sound.createAsync( require('../../assets/sound/succeed_1.wav')) 
      : await Audio.Sound.createAsync( require('../../assets/sound/succeed_2.wav'))
      const { sound } = soundFile
      turnOnSound(sound)
    }catch(error){
      console.log('error: ',error)
    }
    // setSound(sound)
    // await sound.playAsync()
  }

  async function failSound() {
    try{
      const soundFile = await Audio.Sound.createAsync( require('../../assets/sound/fail.wav')) 
      const { sound } = soundFile
      turnOnSound(sound)
    }catch(error){
      console.log('error: ',error)
    }
    // setSound(sound)
    // await sound.playAsync()
  }
  async function correctNoteSound() {
    try{
      const soundFile = await Audio.Sound.createAsync( require('../../assets/sound/correct_note.wav')) 
      const { sound } = soundFile
      turnOnSound(sound)
    }catch(error){
      console.log('error: ',error)
    }
    // setSound(sound)
    // await sound.playAsync()
  }
  
  // without this clean up, the sound will not work after several times
  useEffect(function unloadSound(){
    return sound
    ? () => {
        // console.log('Unloading Sound', sound)
        sound.unloadAsync()
      }
    : undefined
  },[sound])

  return {stopBackgroundMusic, playBackgroundMusic, buttonSound, failSound, congratsSound,correctNoteSound}
}

export default useSound
import React, { useState, useEffect} from 'react'
import { Audio } from 'expo-av'

// and any sounds you wish to add in this custom hook.
const useSound = () => {
  const [sound, setSound] = useState()

  async function buttonSound() {
    const { sound } = await Audio.Sound.createAsync( require('../../assets/sound/buttonPress.wav')
    )
    setSound(sound)
    await sound.playAsync()
  }

  async function congratsSound() {
    const randomNumberBetween1And2 = Math.floor(Math.random() * 2) + 1
    const soundFile = randomNumberBetween1And2 === 1 ? await Audio.Sound.createAsync( require('../../assets/sound/succeed_1.wav')) 
        : await Audio.Sound.createAsync( require('../../assets/sound/succeed_2.wav'))
    const { sound } = soundFile
    setSound(sound)
    await sound.playAsync()
  }

  async function failSound() {
    const soundFile = await Audio.Sound.createAsync( require('../../assets/sound/fail.wav')) 
    const { sound } = soundFile
    setSound(sound)
    await sound.playAsync()
  }

  // without this clean up, the sound will not work after several times
  useEffect(function unloadSound(){
    return sound
    ? () => {
        console.log('Unloading Sound')
        sound.unloadAsync()
      }
    : undefined
  },[sound])

  return {buttonSound, failSound, congratsSound}
}

export default useSound
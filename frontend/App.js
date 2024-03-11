// import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View, StatusBar  } from 'react-native';
import MainPage from './src/MainPage';
// this is needed for native/stack to work
import 'react-native-gesture-handler'
import { Audio } from 'expo-av'
import { store } from './store/store'
import { Provider } from 'react-redux'
import { useState, useEffect } from 'react';

export default function App() {
  const [sound, setSound] = useState()
  // const [volume, setVolume] = useState(0.5)

  // async function playSound() {
  //   await sound.playAsync()
  // }
  const setVolumeLevel = async (newVolume) => {
    if (sound) {
      await sound.setVolumeAsync(newVolume);
      setVolume(newVolume);
    }
  }

  useEffect(() => {
    const loadSound = async () => {
      const { sound } = await Audio.Sound.createAsync(require('./assets/sound/backgroundMusic.mp3'))
      setSound(sound)
      await sound.playAsync()
      await sound.setVolumeAsync(0.5)
      await sound.setIsLoopingAsync(true)
    }

    loadSound()
    return () => {
      if (sound) {
        sound.unloadAsync()
      }
    }
  }, [])

  return (
    <Provider store={store}>
      <StatusBar style="auto" />
      <MainPage/>
    </Provider>
  );
}

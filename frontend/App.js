// import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View, StatusBar  } from 'react-native';
import MainPage from './src/MainPage';
// this is needed for native/stack to work
import 'react-native-gesture-handler'
import { Audio } from 'expo-av'
import { store } from './store/store'
import { Provider } from 'react-redux'
import { useState, useEffect } from 'react'

export default function App() {

  return (
    <Provider store={store}>
      <StatusBar style="auto" />
      <MainPage/>
    </Provider>
  );
}

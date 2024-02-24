import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MainPage from './src/MainPage';
// this is needed for native/stack to work
import 'react-native-gesture-handler'

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <MainPage/>
    </>
  );
}

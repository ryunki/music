import {useState, useEffect, useRef}from 'react'
import { COLOR, SPACING } from '../../theme/theme'

import { ImageBackground, Dimensions , StyleSheet, View, PanResponder, Pressable, Text} from 'react-native'

import { createStackNavigator } from '@react-navigation/stack';

import DrawingPage_1 from '../pages/drawing/DrawingPage_1'
import DrawingPage_2 from '../pages/drawing/DrawingPage_2'
import DrawingPage_3 from '../pages/drawing/DrawingPage_3'
import DrawingPage_4 from '../pages/drawing/DrawingPage_4'

import DrawStackHome from '../pages/drawing/DrawStackHome';

const Stack = createStackNavigator();

const DrawStack = () => {
  
  return (
    <Stack.Navigator
      screenOptions={{
        // headerShown: false,
        title:'Select Stages2'
      }}
      >
      <Stack.Screen name="DrawStackHome" component={DrawStackHome}/>
      <Stack.Screen name="DrawingStage_1" component={DrawingPage_1} />
      <Stack.Screen name="DrawingStage_2" component={DrawingPage_2} />
      <Stack.Screen name="DrawingStage_3" component={DrawingPage_3} />
      <Stack.Screen name="DrawingStage_4" component={DrawingPage_4} />
    </Stack.Navigator>
  );
};


export default DrawStack

// const styles = StyleSheet.create({
//   container: {
//     flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5FCFF',
//   },
// });
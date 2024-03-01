import React, {useState, useEffect, useRef} from 'react'
import { COLOR, SPACING } from '../../theme/theme'

import { Dimensions , StyleSheet, View, PanResponder, Pressable, Text} from 'react-native'

import { createStackNavigator } from '@react-navigation/stack'
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import Svg, { G, Path, Line, Circle} from 'react-native-svg'

import DrawStackHome from '../pages/drawing/DrawStackHome'
import StaffLines from '../components/UI/StaffLines'

import { useSelector, useDispatch } from 'react-redux'
import CustomDrawingPage from '../components/CustomDrawingPage';

const Stack = createStackNavigator()

const NoteStack = () => {

  return (
    <View>
      <Text>Heya</Text>
      <Svg>
        <StaffLines/>
      </Svg>
    </View>
  );
};


export default NoteStack

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'red',
  },
  headerRight:{
    flexDirection:'row',
    width:100, 
    justifyContent:'space-around', 
    gap:20
  },
});
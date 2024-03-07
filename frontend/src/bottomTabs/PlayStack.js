import React, {useState, useEffect, useRef} from 'react'
import { COLOR, SPACING } from '../../theme/theme'

import { ImageBackground, Dimensions , StyleSheet, View, PanResponder, Pressable, Text} from 'react-native'

import { createStackNavigator } from '@react-navigation/stack'
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import PlayPage_1 from '../pages/play/PlayPage_1'
import PlayPage_2 from '../pages/play/PlayPage_2'
import PlayPage_3 from '../pages/play/PlayPage_3'

import PlayStackHome from '../pages/play/PlayStackHome'

import { useSelector, useDispatch } from 'react-redux'
import { toggleDraw } from '../../store/features/drawing/toggleDrawSlice'

import { FontAwesome5, MaterialIcons  } from '@expo/vector-icons'
import { Path, Svg } from 'react-native-svg';
import { getHeaderTitle } from '@react-navigation/elements';
import { answerPath } from '../../store/features/drawing/drawingSlice';
const Stack = createStackNavigator()

const PlayStack = () => {

  const toggler = useSelector((state) => state.toggleDraw.toggle)
  const dispatch = useDispatch()
  // console.log('redux: ',toggler)
  const navigation = useNavigation();

  const toggleEraser = () =>{
    console.log('pressed erase')
    dispatch(toggleDraw(false))
  }
  const togglePen = () =>{
    console.log('pressed draw')
    dispatch(toggleDraw(true))
  }

  useFocusEffect(
    React.useCallback(() => {
      console.log('useFocusEffect')
    }, [])
  );
  // const onPressBackButton = () =>{
  //   navigation.goBack()
  // }
  return (
    <Stack.Navigator 
      screenOptions={{
        headerShown: true,
        headerTransparent: true,
        headerTitle: '',

        // headerShown: false,
        // title:'Select Stages',
        headerLeft: () =>
        { 
          return <Pressable onPress={()=>navigation.goBack()}>
          <Svg width={50} height={50} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <Path d="M6 12H18M6 12L11 7M6 12L11 17" stroke="#FFF500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </Svg>
        </Pressable>
        }
        // headerRight: () => 
        // <View style={styles.headerRight}>
        //   <Pressable onPress={togglePen}>
        //     <MaterialIcons name="draw" size={24} color="black" />
        //   </Pressable>
        //   <Pressable onPress={toggleEraser}>
        //     <FontAwesome5 name="eraser" size={24} color="black" />
        //   </Pressable>
        // </View>
      }}
      // Do something whenever screen changes
      screenListeners={{
        state: (e) => {
          // change back to drawing state
          dispatch(toggleDraw(true))
        },
      }}
    >
      <Stack.Screen name="PlayStackHome" component={PlayStackHome}
        options={({route})=>({headerShown:false})}
      />
      <Stack.Screen name="PlayStage_1" component={PlayPage_1} 
        // options={({route})=>({ headerTitle: getHeaderTitle(route)})}
      />
      <Stack.Screen name="PlayStage_2" component={PlayPage_2} 
        // options={({route})=>({ headerTitle: getHeaderTitle(route)})}
      />
      <Stack.Screen name="PlayStage_3" component={PlayPage_3} 
        // options={({route})=>({ headerTitle: getHeaderTitle(route)})}
      />
    </Stack.Navigator>
  );
};


export default PlayStack

const styles = StyleSheet.create({
  headerRight:{
    flexDirection:'row',
    width:100, 
    justifyContent:'space-around', 
    gap:20
  },
});
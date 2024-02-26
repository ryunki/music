import React, {useState, useEffect, useRef} from 'react'
import { COLOR, SPACING } from '../../theme/theme'

import { ImageBackground, Dimensions , StyleSheet, View, PanResponder, Pressable, Text} from 'react-native'

import { createStackNavigator } from '@react-navigation/stack'
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import DrawingPage_1 from '../pages/drawing/DrawingPage_1'
import DrawingPage_2 from '../pages/drawing/DrawingPage_2'
import DrawingPage_3 from '../pages/drawing/DrawingPage_3'
import DrawingPage_4 from '../pages/drawing/DrawingPage_4'
import DrawingPage_5 from '../pages/drawing/DrawingPage_5'

import DrawStackHome from '../pages/drawing/DrawStackHome'

import { useSelector, useDispatch } from 'react-redux'
import { toggleDraw } from '../../store/features/drawing/toggleDrawSlice'

import { FontAwesome5, MaterialIcons  } from '@expo/vector-icons'

const Stack = createStackNavigator()

function getHeaderTitle(route) {
  const routeName = route.name
  // console.log(routeName)
  switch (routeName) {
    case 'DrawStackHome':
      return 'Select Stages'
    case 'DrawingStage_1':
      return 'Stage 1'
    case 'DrawingStage_2':
      return 'Stage 2'
    case 'DrawingStage_3':
      return 'Stage 3'
    case 'DrawingStage_4':
      return 'Stage 4'
    case 'DrawingStage_5':
      return 'Stage '
  }
}

const DrawStack = () => {

  const toggler = useSelector((state) => state.toggleDraw.toggle)
  const dispatch = useDispatch()
  // console.log('redux: ',toggler)
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('state', (event) => {
      // Your code to handle the navigation event

      console.log('User is navigating to another screen', event.data.state);
    });

    unsubscribe();
  }, [navigation]);

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

  return (
    <Stack.Navigator 
      screenOptions={{
        // headerShown: false,
        // title:'Select Stages',
        headerRight: () => 
        <View style={styles.headerRight}>
          <Pressable onPress={togglePen}>
            <MaterialIcons name="draw" size={24} color="black" />
          </Pressable>
          <Pressable onPress={toggleEraser}>
            <FontAwesome5 name="eraser" size={24} color="black" />
          </Pressable>
        </View>
      }}
      screenListeners={{
        // Do something whenever screen changes
        state: (e) => {
          // change back to drawing state
          dispatch(toggleDraw(true))
        },
      }}
    >
      <Stack.Screen name="DrawStackHome" component={DrawStackHome}
        options={({route})=>({ headerTitle: getHeaderTitle(route),
        headerShown:false})}
      />
      <Stack.Screen name="DrawingStage_1" component={DrawingPage_1} 
        options={({route})=>({ headerTitle: getHeaderTitle(route)})}
      />
      <Stack.Screen name="DrawingStage_2" component={DrawingPage_2} 
        options={({route})=>({ headerTitle: getHeaderTitle(route)})}
      />
      <Stack.Screen name="DrawingStage_3" component={DrawingPage_3} 
        options={({route})=>({ headerTitle: getHeaderTitle(route)})}
      />
      <Stack.Screen name="DrawingStage_4" component={DrawingPage_4} 
        options={({route})=>({ headerTitle: getHeaderTitle(route)})}
      />
      <Stack.Screen name="DrawingStage_5" component={DrawingPage_5} 
        options={({route})=>({ headerTitle: getHeaderTitle(route)})}
      />
    </Stack.Navigator>
  );
};


export default DrawStack

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
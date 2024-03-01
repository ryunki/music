

import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { MaterialIcons } from '@expo/vector-icons'

import DrawStack from './bottomTabs/DrawStack'
import FingerStack from './bottomTabs/FingerStack'
import NoteStack from './bottomTabs/NoteStack'

const Tab = createBottomTabNavigator()

const MainPage = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
       screenOptions={{ headerShown: false }}>
        <Tab.Screen name="DrawStack" component={DrawStack}
          options={{ 
            tabBarLabel: 'Draw',
            tabBarIcon: ()=> <MaterialIcons name="toys" size={24} color="black" />}}
          />
        <Tab.Screen name="NoteStack" component={NoteStack}
          options={{ 
            tabBarLabel: 'Note',
            tabBarIcon: ()=> <MaterialIcons name="toys" size={24} color="black" />}}
          />
        {/* <Tab.Screen name="FingerStack" title="Finger" component={FingerStack} 
          options={{ tabBarLabel: 'Finger' }}  
        /> */}
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default MainPage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

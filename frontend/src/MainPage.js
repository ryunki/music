

import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import DrawStack from './bottomTabs/DrawStack'
import FingerStack from './bottomTabs/FingerStack'

const Tab = createBottomTabNavigator()

const MainPage = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
       screenOptions={{ headerShown: false }}>
        <Tab.Screen name="DrawStack" component={DrawStack}
          options={{ tabBarLabel: 'Draw' }}
        />
        <Tab.Screen name="FingerStack" title="Finger" component={FingerStack} 
          options={{ tabBarLabel: 'Finger' }}  
        />
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

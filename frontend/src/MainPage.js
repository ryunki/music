

import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { FontAwesomeIcon, Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'

import PlayStack from './bottomTabs/PlayStack'
import SettingStack from './bottomTabs/SettingStack'
import { COLOR } from '../theme/theme'

const Tab = createBottomTabNavigator()

const MainPage = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{ 
        headerShown: false,
        tabBarShowLabel:false,
        // this line fixes the issue of thin white line on top of the tab bar
        tabBarStyle:styles.tabBar,
        tabBarBackground: () => (
          <LinearGradient
            // Background Linear Gradient
            style={styles.linearGradient}
            colors={['#2A0B81', '#6D46DA', '#7F27FF', '#7E53F7', '#A484FF']}
            start={{ x: 0.5, y: 1 }}
            end={{ x: 0.5, y: 0 }}
            locations={[0.03, 0.15, 0.5, 0.85, 0.97]}
          />
        ), 
        tabBarActiveTintColor: COLOR.white300, // Set the active tab icon color
        tabBarInactiveTintColor: COLOR.grey100, // Set the inactive tab icon color
      }}
       >
        <Tab.Screen name="Play" component={PlayStack}
          options={{ 
            // tabBarLabel: 'Play',
            tabBarIcon: ({focused, color, size})=> {
              return <Ionicons name="musical-notes-outline" size={focused ? 40 : 30} color={color} 
            />
            }
            }}
          />
        <Tab.Screen name="Setting" component={SettingStack}
          options={{ 
            tabBarIcon: ({focused, color, size})=> {
              return <Ionicons name="settings-outline" size={focused ? 40 : 30} color={color}/>
            }
          }}
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
  linearGradient:{
    // height:'100%',
    flex:1,
  },
  tabBar:{
    borderTopWidth: 0, height:60
  }
});

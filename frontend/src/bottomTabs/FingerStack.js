import { ImageBackground, Dimensions , StyleSheet, View, PanResponder, Pressable, Text} from 'react-native'

import { createStackNavigator } from '@react-navigation/stack';

import FingerPage_1 from '../pages/fingerPositions/FingerPage_1'
import FingerPage_2 from '../pages/fingerPositions/FingerPage_2'

import FingerStackHome from '../pages/fingerPositions/FingerStackHome';

const Stack = createStackNavigator();
const FingerStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        // headerShown: false,
        title:'Select Stages2'
      }}
      >
      <Stack.Screen name="FingerStackHome" component={FingerStackHome}/>
      <Stack.Screen name="FingerStage_1" component={FingerPage_1} />
      <Stack.Screen name="FingerStage_2" component={FingerPage_2} />
    </Stack.Navigator>
  )
}

export default FingerStack
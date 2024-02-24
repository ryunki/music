import {useState, useEffect, useRef}from 'react'

import { ImageBackground, Dimensions , StyleSheet, View, PanResponder, Pressable, Text} from 'react-native'
import Svg, { Path } from 'react-native-svg'
import { useHeaderHeight } from '@react-navigation/elements'
import CustomPath from '../components/CustomPath'
import { COLOR, SPACING } from '../../theme/theme'

const CustomDrawingPage = ({image}) => {
  const [paths, setPaths] = useState([]);
  const [currentPath, setCurrentPath] = useState('');
  // without this header height. the drawing will begin from below where user touched
  const headerHeight = useHeaderHeight();
  
  const windowWidth = Dimensions.get('window').width;
  // this function runs whenever user touches the screen
  const handlePanResponderMove = (event, gestureState) => {
    const { moveX, moveY } = gestureState;
    const newPathSegment = `L${moveX},${moveY-headerHeight}`;
    setCurrentPath((prevPath) => (prevPath ? prevPath + newPathSegment : `M${moveX},${moveY-headerHeight}`))
  };
  // this function runs whenever user release touch from the screen
  const handlePanResponderRelease = () => {
    if (currentPath) {
      setPaths((prevPaths) => [...prevPaths, currentPath]);
      setCurrentPath('');
    }
  };
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: handlePanResponderMove,
    onPanResponderRelease: handlePanResponderRelease,
  });

  const eraseAllPaths = () => {
    console.log('erase')
    setPaths([]);
    setCurrentPath('');
  };
  return (
    <View style={styles.container}>
      <View {...panResponder.panHandlers}>
        <ImageBackground source={image} resizeMode="contain" style={styles.image}>
          <Svg style={styles.drawing} height="100%" width="100%">
            {/* takes coordinates of drawings to display */}
            <CustomPath paths={paths} currentPath={currentPath} color='black' thickness={5}/>
          </Svg>
        </ImageBackground>
      </View>
      <Pressable style={styles.eraseButton} onPress={eraseAllPaths}>
          <Text style={styles.text}>Erase All</Text>
      </Pressable>
    </View>
  )
}

export default CustomDrawingPage


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  eraseButton: {
    position: 'absolute',
    bottom: SPACING.space_20,
    left: Dimensions.get('window').width / 2,
    transform: [{ translateX: -35 }], // Adjust the translation based on the button width
    backgroundColor: COLOR.blue300,
    padding: SPACING.space_10,
    borderRadius: SPACING.space_10,
    alignItems: 'center',
    justifyContent: 'center',
   },
  text:{
    color:COLOR.white300,
  }
});
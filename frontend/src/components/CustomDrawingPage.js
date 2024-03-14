
import { StyleSheet, View, PanResponder} from 'react-native'

import Svg from 'react-native-svg'

import CustomPath from './CustomPath'
import { COLOR, SPACING } from '../../theme/theme'

const CustomDrawingPage = (props) => {

  const handlePanResponderFirstTouch = (event, gestureState) => {
    const { x0, y0 } = gestureState
    props.handleFirstTouch(x0, y0)
  }

  // this function runs whenever user touches the screen
  const handlePanResponderDraw = (event, gestureState) => {
    const { moveX, moveY } = gestureState
    props.handleDraw(moveX, moveY)
  }
  
  // this function runs whenever user release touch from the screen
  const handlePanResponderRelease = () => {
    props.handleReleaseTouch()  
  }

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: handlePanResponderFirstTouch,
    onPanResponderMove: handlePanResponderDraw,
    // user shouldnt be able to draw,
    // if modal is visible, and if user has completed the drawing
    onPanResponderMove: (!props.modalVisible && !props.isCompleted) && handlePanResponderDraw,
    onPanResponderRelease: handlePanResponderRelease,
  })
  return (
    <View {...panResponder.panHandlers} style={styles.container}>
      <Svg height="100%" width="100%">
        <CustomPath paths={props.paths} currentPath={props.currentPath} color='black' thickness={props.thickness}/>
        {props.children}
      </Svg>
    </View>
  )
}

export default CustomDrawingPage


const styles = StyleSheet.create({
  container: {
    width:'100%',
  },
});
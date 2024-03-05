import {useState, useEffect, useRef}from 'react'

import { ImageBackground, Dimensions , StyleSheet, View, PanResponder, Pressable, Text} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import Svg, { Path, Line, Circle} from 'react-native-svg'
import { useHeaderHeight } from '@react-navigation/elements'
import CustomPath from '../components/CustomPath'
import { COLOR, SPACING } from '../../theme/theme'
import { interpolatePath } from '../../utils/screenFunctions'

import { answerPath } from '../../store/features/drawing/drawingSlice'
import { CORRECT_PATH_TREBLE_CLEF } from '../../constants/constants'

const CustomDrawingPage = ({children, thickness=5, dispatch, calculateAccuracy, SCALED_TREBLE_CLEF_OBJECT}) => {
  const [paths, setPaths] = useState([])
  const [currentPath, setCurrentPath] = useState('')
  // without this header height. the drawing will begin from below where user touched
  const headerHeight = useHeaderHeight();

  const drawToggler = useSelector((state) => state.toggleDraw.toggle)

  // this allows user to create a dot when touched 
  const handleFirstTouch = (event, gestureState) => {
    const { x0, y0 } = gestureState
    if (drawToggler){
      // to create a dot when first touched
      setCurrentPath(`${x0} ${y0-headerHeight} ${x0} ${y0-headerHeight}`)
      // reset the answer path
      dispatch(answerPath(SCALED_TREBLE_CLEF_OBJECT))
      // console.log('FIRST TOUCH pathData: ',x0, y0-headerHeight , pathData)
    }
  }
  // this function runs whenever user touches the screen
  const handleDraw = (event, gestureState) => {
    const { moveX, moveY } = gestureState
    const newPathSegment = ` ${moveX} ${moveY-headerHeight}`;
    setCurrentPath((prevPath) => (prevPath ? prevPath + newPathSegment : `${moveX} ${moveY-headerHeight}`))
    
    // calculates how much a user completed the drawing 
    const currPath = currentPath.split(' ')
    calculateAccuracy(currPath)
  }
  
  // when user toggles to eraser mode
  const handleErase = (event, gestureState) => {
    const { moveX, moveY } = gestureState

    const eraseX = Math.round(moveX).toString()
    const eraseY = (Math.round(moveY)-headerHeight).toString()
    
    // if the touched point is less than 10 pixels from the drawing. erase it
    const tolerance = 15
    // filters the drawing to be erased. 
    // iterate through each paintings...
    const filteredPath = paths.filter((path,idx)=> {
      let coords = []
      // each path is strings of x, y coordinates -> 123 234 234 435 346 465 ....
      const eraseCoordFound = path.split(' ')
      // return true for the first coordinate that meets the condition
      const result = eraseCoordFound.some((coord, idx)=>{
        coords.push(coord)
        // for every two coordinates which is x and y
        if((idx + 1) % 2 === 0){
          // get the distance from user's touch point to the painting's coordinates
          const distance = Math.sqrt(Math.pow(Math.abs(eraseY-coords[1]),2)+Math.pow(Math.abs(eraseX-coords[0]),2))
          // stop iterating if the distance is shorter than the tolerance distance
          if(distance <= tolerance){
            return true
          }
          coords = []
        }
      })
      // if result is found, return false for the filter() so that the painting that met the condition can be filtered 
      return result ? false : true
    })
    // save the filtered path of painting
    setPaths(filteredPath)
  }
  // this function runs whenever user release touch from the screen
  const handlePanResponderRelease = () => {
      setPaths((prevPaths) => [...prevPaths, currentPath]);
      setCurrentPath('');
  }
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: handleFirstTouch,
    onPanResponderMove: drawToggler ? handleDraw : handleErase,
    onPanResponderRelease: handlePanResponderRelease,
  });

  return (
    <View style={styles.container}>
      <View {...panResponder.panHandlers}>
        <Svg height="100%" width="100%">
          <CustomPath paths={paths} currentPath={currentPath} color='black' thickness={thickness}/>
          {children}
        </Svg>
      </View>
      {/* <Text style={styles.progression}>{progression}</Text> */}
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
    // left: Dimensions.get('window').width / 2,
    left: '50%',
    // transform: [{ translateX: -45 }], // Adjust the translation based on the button width
    backgroundColor: COLOR.blue300,
    padding: SPACING.space_10,
    borderRadius: SPACING.space_10,
    alignItems: 'center',
    justifyContent: 'center',
    // width:100
   },
  text:{
    color:COLOR.white300,
  },
  backgroundPath:{
    // flex:1,
    // backgroundColor:'red',
    // justifyContent:'center',
    // alignItems:'center',
    // alignSelf:'center',
    // flexDirection:'row'
  },
  progression:{
    flex:1,
    backgroundColor:'red',
    justifyContent:'center',
    alignItems:'center',
    position:'absolute',
    width:'100%'
  }
});
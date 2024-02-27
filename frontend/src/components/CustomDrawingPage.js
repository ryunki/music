import {useState, useEffect, useRef}from 'react'

import { ImageBackground, Dimensions , StyleSheet, View, PanResponder, Pressable, Text} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import Svg, { Path, Line, Circle} from 'react-native-svg'
import { useHeaderHeight } from '@react-navigation/elements'
import CustomPath from '../components/CustomPath'
import { COLOR, SPACING } from '../../theme/theme'

const CustomDrawingPage = ({children}) => {
  const [paths, setPaths] = useState([])
  const [currentPath, setCurrentPath] = useState('')

  // without this header height. the drawing will begin from below where user touched
  const headerHeight = useHeaderHeight();

  const {height, width} = Dimensions.get('window')
  const screenHeight = height - headerHeight
  const screenWidth = width

  const drawToggler = useSelector((state) => state.toggleDraw.toggle)
  // this function runs whenever user touches the screen
  const handleDraw = (event, gestureState) => {
    const { moveX, moveY } = gestureState
    const newPathSegment = ` ${moveX} ${moveY-headerHeight}`;
    setCurrentPath((prevPath) => (prevPath ? prevPath + newPathSegment : `${moveX} ${moveY-headerHeight}`))
  };

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
    onPanResponderMove: drawToggler ? handleDraw : handleErase,
    onPanResponderRelease: handlePanResponderRelease,
  });
  
  const onImageLayout = (LayoutEvent) => {
    console.log('event: ',LayoutEvent.nativeEvent.layout)
  }

  return (
    <View style={styles.container}>
      <View {...panResponder.panHandlers}>
        {/* <ImageBackground onLayout={onImageLayout} source={image} resizeMode="contain" style={styles.image}> */}
        <Svg style={styles.drawing} height="100%" width="100%">
          {/* takes coordinates of drawings to display */}
          <CustomPath paths={paths} currentPath={currentPath} color='black' thickness={5}/>
          {children}
        </Svg>
        
        {/* </ImageBackground> */}
      </View>
      <View>
      </View>
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
});
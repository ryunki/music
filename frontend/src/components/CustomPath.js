import {useState, useEffect, useRef}from 'react'

import { ImageBackground, Dimensions , StyleSheet, View, PanResponder, Pressable, Text} from 'react-native'
import Svg, { Path } from 'react-native-svg'

const CustomPath = ({paths, currentPath, color, thickness}) => {
  return (
    <>
    {/* <Svg style={styles.drawing} height="100%" width="100%"> */}
      {paths?.map((path, index) => (
        <Path key={index} d={path ? `M${path}` : ''} 
        fill="none" 
        stroke={color}
        strokeWidth={thickness} 
        strokeLinecap="round"
        strokeLinejoin="round"/>
        ))}
      <Path d={currentPath ? `M${currentPath}` : ''} 
        fill="none" 
        stroke={color}
        strokeWidth={thickness} 
        strokeLinecap="round"
        strokeLinejoin="round"
        />
    {/* </Svg> */}
    </>
  )
}

export default CustomPath

const styles = StyleSheet.create({
  drawing: {
    flex: 1,
  },
});
import { useHeaderHeight } from '@react-navigation/elements'

import {Dimensions} from 'react-native'

// get the screen size without the header of tabbar
export const screenSize = () => {
  const headerHeight = useHeaderHeight()
  const {height, width} = Dimensions.get('window')
  const screenHeight = (height - headerHeight).toFixed(0)
  const screenWidth = width.toFixed(0)

  return {screenHeight, screenWidth}
}

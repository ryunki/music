import {
  PATH_FOR_TREBLE_CLEF,
  CORRECT_PATH_TREBLE_CLEF,
  SCALE_HEIGHT,
  SCALE_WIDTH,
  SMALL_MOBILE_WIDTH,
  MOBILE_WIDTH,
  TABLET_WIDTH,
} from '../../constants/constants'
import { screenSize } from '../screenFunctions'
// Phone scale
const SMALLEST_MOBILE = 1.5
const SMALL_MOBILE = 1.5
// Tablet scale
const TABLET = 1.8
const LARGE_TABLET = 2.8

// thickness of path
const PHONE_THICKNESS = 14
const TABLET_THICKNESS =  19
// distance allowance from answer path
const PHONE_ALLOWANCE = {easy:13, hard:9}
const TABLET_ALLOWANCE = {easy:13, hard:9}

const { screenHeight, screenWidth } = screenSize()

  // change the size of SVG graphic according to width
export function adjustedAllowance(difficulty) {
    const difficultySmall = difficulty === 'Easy' ? PHONE_ALLOWANCE.easy : PHONE_ALLOWANCE.hard
    const difficultyBig =  difficulty === 'Easy' ? TABLET_ALLOWANCE.easy : TABLET_ALLOWANCE.hard
    if (screenWidth < SMALL_MOBILE_WIDTH) {
      return difficultySmall
    } else if (screenWidth >= SMALL_MOBILE_WIDTH && screenWidth < MOBILE_WIDTH) {
      return difficultySmall 
    } else if (screenWidth >= MOBILE_WIDTH && screenWidth < TABLET_WIDTH) {
      return difficultyBig 
    } else if (screenWidth >= TABLET_WIDTH) {
      return difficultyBig
    }
  }
  // change the size of SVG graphic according to width
export function setThickness() {
    if (screenWidth < SMALL_MOBILE_WIDTH) {
      return PHONE_THICKNESS
    } else if (screenWidth >= SMALL_MOBILE_WIDTH && screenWidth < MOBILE_WIDTH) {
      return PHONE_THICKNESS
    } else if (screenWidth >= MOBILE_WIDTH && screenWidth < TABLET_WIDTH) {
      return TABLET_THICKNESS 
    } else if (screenWidth >= TABLET_WIDTH) {
      return TABLET_THICKNESS
    }
  }

  // change the size of SVG graphic according to width
  export function adjustedScale() {
    if (screenWidth < SMALL_MOBILE_WIDTH) {
      return SMALLEST_MOBILE
    } else if (screenWidth >= SMALL_MOBILE_WIDTH && screenWidth < MOBILE_WIDTH) {
      return SMALL_MOBILE
    } else if (screenWidth >= MOBILE_WIDTH && screenWidth < TABLET_WIDTH) {
      return TABLET
    } else if (screenWidth >= TABLET_WIDTH) {
      return LARGE_TABLET
    }
  }
  export function adjustedX() {
    if (screenWidth < SMALL_MOBILE_WIDTH) {
      // the width of the SVG used for this page is 100 pixels
      // when it is scaled to 2.7 SVG's width scales to 270 pixels. half of it would be 135
      // this would center the SVG in the screen width
      return screenWidth / 2 - (SMALLEST_MOBILE * 100) / 2
    } else if (screenWidth >= SMALL_MOBILE_WIDTH && screenWidth < MOBILE_WIDTH) {
      return screenWidth / 2 - (SMALL_MOBILE * 100) / 2
    } else if (screenWidth >= MOBILE_WIDTH && screenWidth < TABLET_WIDTH) {
      return screenWidth / 2 - (TABLET * 100) / 2
    } else if (screenWidth >= TABLET_WIDTH) {
      return screenWidth / 2 - (LARGE_TABLET * 100) / 2
    }
  }
  export function adjustedY() {
    if (screenWidth < SMALL_MOBILE_WIDTH) {
      return screenHeight / 7  
    } else if (screenWidth >= SMALL_MOBILE_WIDTH && screenWidth < MOBILE_WIDTH) {
      return screenHeight / 7
    } else if (screenWidth >= MOBILE_WIDTH && screenWidth < TABLET_WIDTH) {
      return screenHeight / 7
    } else if (screenWidth >= TABLET_WIDTH) {
      return screenHeight / 7
    }
  }

  export function isPhone() {
    if (screenWidth < SMALL_MOBILE_WIDTH) {
      return true
    } else if (screenWidth >= SMALL_MOBILE_WIDTH && screenWidth < MOBILE_WIDTH) {
      return true
    } else if (screenWidth >= MOBILE_WIDTH && screenWidth < TABLET_WIDTH) {
      return false
    } else if (screenWidth >= TABLET_WIDTH) {
      return false
    }
  }

  export function isLargeTablet(){
    if (screenWidth >= TABLET_WIDTH) {
      return true
    }else{
      return false
    }
  }

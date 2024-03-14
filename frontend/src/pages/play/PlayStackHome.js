
import { ScrollView,  StyleSheet, Pressable} from 'react-native'
import Svg from 'react-native-svg'

import { CARD_COLOR, COLOR, SPACING } from '../../../theme/theme'
import { LinearGradient } from 'expo-linear-gradient'
import TrebleClefWithStaffLines from './components/TrebleClefWithStaffLines'
import { screenSize } from '../../../utils/screenFunctions'
import LinearGradientBackground from './components/LinearGradientBackground'

const PlayStackHome = ({navigation}) => {
  const stages = [1,2]
  const {screenWidth} = screenSize()
  const navigateTo = (idx) =>{
    navigation.navigate(`PlayStage_${idx}`)
  }

  return (
    <LinearGradientBackground>
      <ScrollView contentContainerStyle={[styles.scrollContainer,{width:parseInt(screenWidth)}]}>
          {stages.map((item,idx)=>(
            <LinearGradient  key={idx}
              colors={[CARD_COLOR.c100,CARD_COLOR.c200,CARD_COLOR.c300,CARD_COLOR.c400]}
              start={{ x: 0.5, y: 1 }}
              end={{ x: 0.5, y: 0 }}
              locations={[0.02, 0.3, 0.7, 0.98]}
              style={styles.linearGradientStageButtons}
            >
              <Pressable style={[styles.pressableStages ]} onPress={()=>navigateTo(item)}>
                <Svg 
                  height="100%" width="100%"
                  viewBox="0 0 100 100"
                  > 
                    {item === 1 && <TrebleClefWithStaffLines stroke={'black'} strokeWidth={2} fillStaffLines={COLOR.pink100} fillTrebleClef={COLOR.yellow300}/>}
                </Svg>
              </Pressable>
            </LinearGradient>
          ))}
         
        </ScrollView>
      </LinearGradientBackground>
   
  )
}

const styles = StyleSheet.create({
  scrollContainer: {
    // flexGrow: 1,
    alignItems: 'center',
    // width:360,
    // justifyContent: 'center',
  },
  linearGradientStageButtons:{
    borderRadius:SPACING.space_20,
    shadowOpacity:1,
    elevation: 10,
    shadowColor:'black',
    marginTop:'10%',
    flex:1,
    height:300,
    width:300,
    padding:SPACING.space_20,
    // marginHorizontal:20,
  },
  pressableStages:{
    borderRadius:SPACING.space_20,
  },
  // this code is to apply styles accordingly
  // ...Platform.select({
  //   ios:{
  //     commonProp:{
  //     }
  //   },
  //   android:{
  //     commonProp:{
  //     }
  //   }
  // }), 
})

export default PlayStackHome


import { Path } from 'react-native-svg'

const CustomPath = ({paths, currentPath, color, thickness}) => {
  return (
    <>
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
    </>
  )
}

export default CustomPath

export const calculateDistance = (point1, point2) =>{
  return Math.sqrt(Math.pow(point2.x - point1.x,2) + Math.pow(point2.y-point1.y,2))
}
export const calculateDistanceOfCoords = (coords) =>{
  let distance = 0
  coords.reduce((acc,current)=>{
    distance += calculateDistance(acc, current)
    return current
  },coords[0])
  return distance
}
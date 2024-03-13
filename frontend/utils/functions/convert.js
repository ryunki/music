  // takes ["123","234","345","456"... ] as parameter
export function convertArrayToObject (splitedPath) {
  let convertedPath = []
  let j = 1
  for (let i = 0; i < splitedPath.length; i += 2){
    let x = parseFloat(splitedPath[i]).toFixed(1)
    let y = parseFloat(splitedPath[j]).toFixed(1)
    convertedPath = [...convertedPath, {x, y}]
    j+=2
  }
  return convertedPath
}

// from [{x:"123",y:"123"},{...}] to ["123","234","345","456"....]
export function convertObjectToArray(pathObjectArray){
  let convertedPath = []
  for (let i = 0; i < pathObjectArray.length; i ++){
    convertedPath = [...convertedPath, pathObjectArray[i].x, pathObjectArray[i].y]
  }
  return convertedPath
}
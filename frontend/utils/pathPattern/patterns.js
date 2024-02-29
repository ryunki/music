const repeat = 7

export const generatePathPattern_1 = () => {
  let pathData = ''
  for (let i = 1; i <= repeat*2; i++) {
    // Your condition here
    pathData += ` ${i*25} ${i % 2 === 0 ? 0 : -75}`
  }
  return pathData; // Trim to remove the trailing space
}

export const generatePathPattern_2 = () => {
  let pathData = ''
  for (let i = 0; i < repeat; i++) {
    // Your condition here
    // if(i===0){
    //   pathData = 'C 27 -1 65 -42 50 -75 C 31 -100 -9 -13 50 0 '
    // }else{
    //   pathData += `C ${27+i*50} -1 ${65+i*50} -42 ${50+i*50} -75 ${31+i*50} -100 ${-9+i*50} -13 ${50+i*50} 0 `
    // }
    pathData += `C ${27+i*50} -1 ${65+i*50} -42 ${50+i*50} -75 ${31+i*50} -100 ${-9+i*50} -13 ${50+i*50} 0 `
  }
  return pathData; // Trim to remove the trailing space
}
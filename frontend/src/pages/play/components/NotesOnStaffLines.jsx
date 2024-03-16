import React from 'react'
import Svg,{ Path, G, Defs } from 'react-native-svg'

const NotesOnStaffLines = ({stroke,strokeWidth, fillStaffLines, fillTrebleClef}) => {
  return (<>
      <G fill={fillStaffLines} stroke={stroke} strokeWidth={strokeWidth-1}>
        <Path d="M93.75,48.75H65.299c-1.612,0-1.612,2.5,0,2.5H93.75C95.362,51.25,95.362,48.75,93.75,48.75z"/>
        <Path d="M93.75,33.75H65c-1.612,0-1.612,2.5,0,2.5h28.75C95.362,36.25,95.362,33.75,93.75,33.75z"/>
        <Path d="M93.75,18.75H65c-1.612,0-1.612,2.5,0,2.5h28.75C95.362,21.25,95.362,18.75,93.75,18.75z"/>
        <Path d="M93.75,63.75H65.125c-1.612,0-1.612,2.5,0,2.5H93.75C95.362,66.25,95.362,63.75,93.75,63.75z"/>
        <Path d="M51.25,50c0-0.69-0.56-1.25-1.25-1.25H6.549c-1.612,0-1.612,2.5,0,2.5H50C50.69,51.25,51.25,50.69,51.25,50z"/>
        <Path d="M6.25,36.25H50c1.612,0,1.612-2.5,0-2.5H6.25C4.638,33.75,4.638,36.25,6.25,36.25z"/>
        <Path d="M6.25,21.25H50c1.612,0,1.612-2.5,0-2.5H6.25C4.638,18.75,4.638,21.25,6.25,21.25z"/>
        <Path d="M6.375,63.75c-1.612,0-1.612,2.5,0,2.5H35c1.612,0,1.612-2.5,0-2.5H6.375z"/>
        <Path d="M93.75,78.75H6.375c-1.612,0-1.612,2.5,0,2.5H93.75C95.362,81.25,95.362,78.75,93.75,78.75z"/>
      </G>
      <Path stroke={stroke} fill={fillTrebleClef} d="M46.057,58.091c-5.138,2.967-7.43,8.29-5.219,12.12c1.24,2.149,3.653,3.382,6.62,3.382c5.678,0,12.755-4.768,12.534-11.011  C59.993,62.554,60,62.528,60,62.5V16.25c0-3.224-5-3.224-5,0v40.326c-0.763-0.206-1.582-0.326-2.458-0.326  C50.417,56.25,48.114,56.903,46.057,58.091C40.919,61.058,48.114,56.903,46.057,58.091C40.919,61.058,48.114,56.903,46.057,58.091z"/>

    {/* <G scale={4.15}> 
      <Path d="M2 3H22" stroke={'black'} strokeWidth={strokeWidth} strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/> 
      <Path d="M2 9H11" stroke={fillStaffLines} strokeWidth={strokeWidth} strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/> 
      <Path d="M2 15H8" stroke={fillStaffLines} strokeWidth={strokeWidth} strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/> 
      <Path d="M2 21H6" stroke={fillStaffLines} strokeWidth={strokeWidth} strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/> 
      <Path fill='none' d="M11.84 21.9999C13.044 21.9999 14.02 21.0239 14.02 19.8199C14.02 18.6159 13.044 17.6399 11.84 17.6399C10.6361 17.6399 9.66003 18.6159 9.66003 19.8199C9.66003 21.0239 10.6361 21.9999 11.84 21.9999Z" stroke={fillNotes} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/> 
      <Path fill='none' d="M22 18.3699V9.85993C22 8.04993 20.86 7.79993 19.71 8.10993L15.36 9.29993C14.57 9.51993 14.02 10.1399 14.02 11.0499V12.57V13.59V19.82" stroke={fillNotes} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/> 
      <Path fill='none' d="M19.82 20.5499C21.024 20.5499 22 19.5739 22 18.3699C22 17.166 21.024 16.1899 19.82 16.1899C18.616 16.1899 17.64 17.166 17.64 18.3699C17.64 19.5739 18.616 20.5499 19.82 20.5499Z" stroke={fillNotes} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/> 
      <Path fill='none' d="M14.02 13.5999L22 11.4199" stroke={fillNotes} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/> 
    </G> */}

  </>
  )
}

export default NotesOnStaffLines
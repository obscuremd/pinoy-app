import React from 'react'
import { Image, View } from 'react-native';
import TextUi from './Text';

interface AvatarProps{
  image: string;
  size: 'lg' | 'md' | 'sm'
  primary_text ?: string
  secondary_text ?: string
  active?: boolean
  vertical?: boolean
}

const AvatarUi:React.FC<AvatarProps> = ({image, size = 'lg', primary_text, secondary_text, vertical, active}) => {

  const getImageSize = (imageSize:string) =>{
      switch(imageSize){
        case 'lg': return 'w-[39px] h-[39px]'
        case 'md': return 'w-[31px] h-[31px]'
        case 'sm': return 'w-[25px] h-[25px]'
      }
  }

  return (
    <View className={`w-fit flex gap-[8px] self-start items-center justify-center ${vertical ?'flex-row'  : 'flex-col' }`}>
      <Image 
        src={image} 
        style={{objectFit:'cover'}}
        className={`${getImageSize(size)} rounded-full border-[4px] ${active ? 'border-primary-500' : 'border-transparent'}`}/>
      <View className={`flex flex-col ${vertical ? 'items-start' : 'items-center'}`}>
        {primary_text && <TextUi fontSize='t2' fontWeight='semibold' text={primary_text}/>}
        {secondary_text && <TextUi fontSize='caption' fontWeight='semibold' text={secondary_text}/>}
      </View>
    </View>
  )
}

export default AvatarUi
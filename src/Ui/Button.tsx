import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { IconoirProvider } from 'iconoir-react-native'
import TextUi from './Text'

interface ButtonProps{
  stretch?: boolean
  position?: 'start' | 'end' | 'center' | 'between'
  size: 'lg' | 'md' | 'sm' | 'xs' | 'sm_icon',
  color: 'primary' | 'secondary' | 'default' | 'text' | 'warning' | 'danger',
  text?: string,
  rounded?: 'none' | 'medium' | 'full'
  outline?: boolean
  icon_right?: React.ReactNode
  icon_left?: React.ReactNode
  onclick?: ()=> void,
  gap?: string
  hover?: 'true' | 'false'
}

const ButtonUI:React.FC<ButtonProps> = ({size = 'lg', text, outline, color = 'primary', rounded = 'none', icon_right, icon_left, onclick, stretch, position = 'center', gap, hover = 'true'}) => {

  const getPadding = (padding: string) =>{
    switch(padding){
        case 'lg': return { paddingVertical: 10, paddingHorizontal: 20 };
        case 'md': return { paddingVertical: 10, paddingHorizontal: 20 };
        case 'sm': return { paddingVertical: 5, paddingHorizontal: 10 };
        case 'xs': return { paddingVertical: 5, paddingHorizontal: 10 };
        case 'sm_icon': return { paddingVertical: 5, paddingHorizontal: 4 };
        default: return {};
    }
  }

  const getFontSize = (size: string) =>{
    switch(size){
      case 'lg': return "h5";
      case 'md': return "t1";
      case 'sm': return "t2";
      case 'xs': return "body";
    }
  }
  
  const getIconSize = (size: string) =>{
    switch(size){
      case 'lg': return 31;
      case 'md': return 25;
      case 'sm': return 20;
      case 'xs': return 13;
      case 'sm_icon': return 13;
    }
  }

  const getColor = (color: string) =>{
    switch(color){
      case 'primary' : return (outline ? "border-primary-500 text-primary-500" : "bg-primary-500 border-transparent" )
      case 'secondary' : return (outline ? "border-secondary-500 text-secondary-500" : "bg-secondary-500 border-transparent" )
      case 'default' : return (outline ? "border-secondary-500 text-grayscale-500" : "bg-grayscale-500 text-secondary-500 border-transparent" )
      case 'text' : return (outline ? "border-grayscale-500 text-grayscale-500" : "bg-transparent border-transparent" )
      case 'danger' : return (outline ? "border-error-500 text-error-500" : "bg-error-500 border-transparent")
      case 'warning' : return (outline ? "border-warning-500 text-warning-500" : "bg-warning-500 border-transparent" )
    }
  }
  const getTextColor = (color: string) => {
    switch(color) {
      case 'primary':
        return outline ? "text-primary-500" : "text-grayscale-500";
      case 'secondary':
        return outline ? "text-secondary-500" : "text-grayscale-500";
      case 'default':
        return outline ? "text-grayscale-500" : "text-grayscale-500"; // Default case for no outline
      case 'text':
        return outline ? "text-grayscale-500" : "text-grayscale-500";
      case 'danger':
        return outline ? "text-error-500" : "text-grayscale-500";
      case 'warning':
        return outline ? "text-warning-500" : "text-grayscale-500";
      default:
        return "text-grayscale-500";  // Fallback case to grayscale text color
    }
  }

  const getIconColor = (color: string) => {
    switch (color) {
      case 'primary':
        return outline ? "#43B1A3" : "#ffff";  // border-primary-500 & bg-primary-500
      case 'secondary':
        return outline ? "#1A322F" : "#ffff";  // border-secondary-500 & bg-secondary-500
      case 'default':
        return outline ? "#FFFFFF" : "#ffff";  // border-secondary-500 & bg-grayscale-500
      case 'text':
        return outline ? "#E8E8E8" : "#ffff";  // border-grayscale-500 & bg-transparent
      case 'danger':
        return outline ? "#FF6584" : "#ffff";  // border-error-500 & bg-error-500
      case 'warning':
        return outline ? "#FFA800" : "#ffff";  // border-warning-500 & bg-warning-500
      default:
        return "#ffff";  // Default fallback color
    }
  }
  

  const round = (borderRadius: string)=>{
    switch(borderRadius){
      case 'none' : return 'rounded-none'
      case 'medium' : return 'rounded-xl'
      case 'full' : return 'rounded-full'
    }
  }

  const justify = (position: string) => {
    switch(position){
      case 'start' : return 'justify-start'
      case 'end' : return 'justify-end'
      case 'center' : return 'justify-center'
      case 'between' : return 'justify-between'
    }
  }

  return (
    <IconoirProvider
    iconProps={{
      color: getIconColor(color),
      width: getIconSize(size),
      height: getIconSize(size),
    }}
  >
    <View>
        <TouchableOpacity
        onPress={onclick}
        style={[
            getPadding(size)
        ]}
        className=
            {` border-[1px]  h-fit flex flex-row items-center 
                ${gap ? gap :'gap-[4px]'} 
                ${stretch ?'w-full':'self-start'} 
                ${round(rounded)} 
                ${justify(position)}
                ${getColor(color)}`}>
            <View className={`${getIconSize(size)} `}>{icon_left}</View>
            {text && <TextUi color={getTextColor(color)} text={text} fontSize={getFontSize(size)}/>}
            <View className={`${getIconSize(size)} `}>{icon_right}</View>
        </TouchableOpacity>
    </View>
    </IconoirProvider>

  )
}

export default ButtonUI
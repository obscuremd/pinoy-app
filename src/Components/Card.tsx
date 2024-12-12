import React from 'react'
import { Bookmark } from 'iconoir-react-native'
import { Image, View } from 'react-native';
import AvatarUi from '../Ui/Avatar';
import TextUi from '../Ui/Text';
import ButtonUI from '../Ui/Button';

interface CardProps {

    hover?: boolean,
    vertical?: boolean
    outline?: 'default' | 'primary' | 'white'
    border?: boolean
    fill?: boolean
    stretch?: boolean
    between?: boolean

    image?: string
    primary_text ?: string
    secondary_text ?: string
    
    avatar?: boolean
    avatar_image?: string
    avatar_primary_text?: string
    avatar_secondary_text?: string

    button?: boolean
    left_button?: React.ReactNode,
    right_button?: React.ReactNode
    button_text?: string

    bookmark_button?: boolean 
    bookmark_button_outline?: boolean
    bookmark_button_icon?: React.ReactNode
    bookmark_button_text?: string
    bookmark_button_type?: 'primary' | 'secondary' | 'default' | 'text' | 'warning' | 'danger'
    bookmark_button_function?:()=> void
}

const CardComponent:React.FC<CardProps> = ({
    stretch,
    between,
    fill,
    border,
    outline ='default',
    vertical,
    image, 
    avatar_image, 
    avatar_primary_text,
    avatar_secondary_text, 
    primary_text, 
    secondary_text, 
    avatar, 
    button,
    left_button,
    right_button,
    button_text='placeholder',
    
    bookmark_button ,
    bookmark_button_icon = <Bookmark/> ,
    bookmark_button_text,
    bookmark_button_outline = true,
    bookmark_button_type = 'primary',
    bookmark_button_function,
    
    hover = true
    }) => {

    const Hover = (outline: string) => {
        switch (outline) {
            case 'default' : return '#122421'
            case 'primary' : return '#4AC2B3'
            case 'white' : return '#FFF'
        }
    }
    
    const Border = (outline: string) => {
        switch (outline) {
            case 'default' : return 'border-secondary-700'
            case 'primary' : return 'border-primary-900'
            case 'white' : return 'border-grayscale-900'
        }
    }

  return (
    <View
        className={`
            flex p-[10px] border-[1px] rounded-lg
            ${between ? 'justify-between' : 'gap-[10px]'}
            ${fill &&'bg-secondary-700'} 
            ${border? Border(outline) :'border-transparent'} 
            ${vertical ? 'flex-col': 'flex-row'} 
            ${stretch ?'w-full':'self-start'}`}>
        {image && <Image src={image} alt="" style={{objectFit:'cover'}} className={`${vertical ? 'h-[100px] w-full' :'w-[100px]'} rounded-lg`} />}
        
        <View className='flex flex-col gap-2 w-fit'>
            {avatar && avatar_image && <AvatarUi vertical image={avatar_image} primary_text={avatar_primary_text} secondary_text={avatar_secondary_text} size='lg'/>}
            {primary_text && <TextUi  fontSize='t2' fontWeight='semibold' text={primary_text}/>}
            {secondary_text && <TextUi fontSize='caption' fontWeight='semibold' text={secondary_text}/>}
            {button && <ButtonUI color='primary' outline size='xs' text={button_text} icon_left={left_button} icon_right={right_button} rounded='full'/>}
        </View>
        
        {bookmark_button && 
            <ButtonUI 
                onclick={bookmark_button_function}
                color={bookmark_button_type} 
                outline = {bookmark_button_outline}
                size='xs' 
                text={bookmark_button_text} 
                icon_left={bookmark_button_icon} 
                rounded='full'/>}
        
    </View>
  )
}

export default CardComponent
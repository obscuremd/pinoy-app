import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import AvatarUi from '../Ui/Avatar';
import TextUi from '../Ui/Text';
import ButtonUI from '../Ui/Button';

interface HeroProps {
    primary_text?: string
    secondary_text?: string
    size?: 'small' | 'medium' | 'large'
    image: string
    avatar_primary_text?: string
    avatar_secondary_text?: string
    avatar_image?: string
    button_text?: string
    button_outline?: boolean
}

const HeroComponent:React.FC<HeroProps> = ({primary_text, secondary_text, size = 'small', image, avatar_primary_text,  avatar_secondary_text, avatar_image,button_text='Check it out', button_outline }) => {

    const getImageSize = (imageSize:string) =>{
        switch(imageSize){
          case 'large': return ' h-[300px]'
          case 'medium': return ' h-[225px]'
          case 'small': return ' h-[150px]'
        }
    }

    const getImageHeight = (imageSize: string) => {
        switch (imageSize) {
            case 'large':
                return 300;
            case 'medium':
                return 225;
            case 'small':
                return 150;
            default:
                return 150;
        }
    };

  return (
    <View className='w-full'>
            <View style={{ position: 'relative', height: getImageHeight(size), width: '100%' }}>
                <LinearGradient 
                    colors={['rgba(25, 28, 45, 0.00)', '#1B2323']}
                    style={[styles.gradient, { height: getImageHeight(size) }]}
                    />

                    <Image 
                        className={`w-full rounded-2xl ${getImageSize(size)}`} 
                        src={image} 
                        style={{
                        objectFit:'cover'
                        }}
                        />
            </View>
            <View className='flex flex-col gap-2 mt-[-64px] px-2 z-50'>
                {avatar_image && <AvatarUi size='lg' primary_text={avatar_primary_text} vertical secondary_text={ avatar_secondary_text} image={avatar_image}/>}
                {primary_text && <TextUi fontSize='t2' fontWeight='semibold' text={primary_text}/>}
                {secondary_text && <TextUi fontSize='caption' fontWeight='semibold' text={secondary_text}/>}
                <ButtonUI text={button_text} outline={button_outline} color='primary' size='sm' rounded='full'/>
            </View>
    </View>
  )
}

const styles = StyleSheet.create({
    gradient: {
        position: 'absolute',
        zIndex: 2,
        width: '100%',
        borderRadius: 8,
    },
})

export default HeroComponent
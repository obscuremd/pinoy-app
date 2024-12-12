import React, { useState } from 'react'
import { Href, usePathname, useRouter } from 'expo-router'
import { Image, View } from 'react-native'
import ButtonUI from '../Ui/Button'
import TextUi from '../Ui/Text'

interface menuItems {
    icon: React.ReactNode, 
    name: string, 
    link: Href
}

interface MenuProps{
    menuItems : Array<menuItems>
    collapsed?: boolean
    mode?: 'vertical' | 'horizontal'
    logo?: boolean,
    between?: boolean
}

const MenuComponent:React.FC<MenuProps> = ({
    menuItems, 
    collapsed, 
    mode = 'vertical',
    between, 
    logo = false}) => {

    const router = useRouter()
    const pathname = usePathname()

  return (
    <View className={`self-start flex ${mode==='horizontal' && 'items-center'} ${mode === 'vertical' ? 'flex-col':'gap-2'}`}>
        { logo &&
            <View className='p-5 flex-row items-center gap-2'>
                <Image source={require('../../assets/Logo.png')} className='w-6 h-6'/>
                {!collapsed && <TextUi text='Pinoy' fontSize='h5' fontWeight='bold'/>}
            </View>}

        <View className={`
            ${mode === 'vertical' ? 'flex-col': 'flex-row'} 
            ${between?'w-full justify-between':'self-start  gap-2'}`}>
            {
                menuItems.map(({icon, link, name}, index)=>(
                        <ButtonUI key={index} onclick={()=> router.push(link)} icon_left={icon} color={pathname === link ?'primary': 'text'} text={collapsed? undefined:name} size='sm' rounded='medium'  stretch position='start'/>
                ))
            }
        </View>
    </View>
  )
}

export default MenuComponent
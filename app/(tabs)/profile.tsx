import { View } from 'react-native'
import React, { useState } from 'react'
import {Button, Hero,} from '@/src/Exports/Exports'
import { CardShield } from 'iconoir-react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import SettingsSection from '@/src/Screens/ProfileScreen/SettingSection'
import HistorySection from '@/src/Screens/ProfileScreen/HistorySection'
import { cardData } from '@/src/Exports/Constants'

export default function ProfileScreen (){

  const [page, setPage] = useState(0)

  return (
   
    <SafeAreaView className='flex-1 w-full gap-8 bg-background-500'>
      <Hero 
        size='large'
        image={cardData[0].avatar_image} 
        avatar_image={cardData[0].avatar_image}
        avatar_primary_text='John Doe'
        avatar_secondary_text='Johndoe@gmail.com'
        button_outline
        button_text='Silver Rank Passanger'
        />

        <View className='gap-4'>
          <Button 
            rounded='full' 
            text='Payment Details' 
            icon_left={<CardShield/>} 
            color='primary' 
            size='xs'/>
            
            <View className='flex-row gap-2'>

              <Button 
                rounded='full' 
                text='Settings' 
                outline={page === 1}
                color='primary'
                onclick={()=>setPage(0)} 
                size='sm'/>
              
              <Button 
                rounded='full' 
                text='History' 
                outline = {page === 0}
                color='primary' 
                onclick={()=>setPage(1)}
                size='sm'/>
            </View>
        </View>

        <>
          {page === 0 && <SettingsSection/>}
          {page === 1 && <HistorySection/>}
        </>
    </SafeAreaView>
  )
}







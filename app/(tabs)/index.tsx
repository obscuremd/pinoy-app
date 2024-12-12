import { ScrollView, View } from 'react-native'
import React from 'react'
import {Avatar, Button, Card, Hero, Input, Text } from '@/src/Exports/Exports'
import { MapPin, NavArrowDown } from 'iconoir-react-native'
import { cardData, hero } from '@/src/Exports/Constants'

export default function HomeScreen () {
  return (
   
    <View className='flex-1 bg-background-500 gap-8'>
      
      <View className=' gap-4'>
        <Button 
          outline 
          icon_left={<MapPin/>}
          icon_right={<NavArrowDown/>}
          text='Warri, Delta State'
          size='xs' 
          rounded='full'
          color='text'/>
          <Input stretch color='white' placeholder="Where're you going"/>
      </View>
    
      <Hero image={hero} size='medium' primary_text='Get Uber Fast Deliveries'/>

      <View className='gap-4'>
        <Text text='Drivers' fontSize='body' fontWeight='semibold'/>
        <ScrollView horizontal contentContainerStyle={{gap:24}} >
          {cardData.map(({avatar_image, avatar_primary_text}, index)=>(
              <Avatar key={index} image={avatar_image} size='lg' secondary_text={avatar_primary_text}/>
            ))}
        </ScrollView>
      </View>

      <View className='gap-4'>
        <Text text='Recents' fontSize='body' fontWeight='semibold'/>
        <ScrollView contentContainerStyle={{gap:8}}>
          {cardData.map((item, index)=>(
            <Card key={index} image={item.image} stretch border outline='primary' primary_text={item.primary_text} secondary_text={item.secondary_text} button_text={item.button_text} button  />
          ))}
        </ScrollView>
      </View>

    </View>
  )
}




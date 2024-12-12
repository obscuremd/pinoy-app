import { Card, Text } from "@/src/Exports/Exports"
import { useAuth as ProviderAuth } from "@/src/Providers/AuthProvider"
import { useAuth as ClerkAuth } from "@clerk/clerk-expo"
import { Bin, LongArrowDownLeft } from "iconoir-react-native"
import { View } from "react-native"

export default function SettingsSection (){

  const {signOut} = ClerkAuth()
  const {userData} = ProviderAuth()

    return(
      <View className='gap-8'>
        
        <View className='gap-4'>
          <Text fontSize='body' fontWeight='semibold' text='Personal Info'/>
          <View className='gap-2'>
            <Card 
              border 
              outline='white' 
              stretch
              between 
              bookmark_button 
              primary_text='E-Mail' 
              secondary_text={userData?.email}/>
            <Card 
              border 
              outline='white' 
              stretch
              between 
              bookmark_button 
              primary_text='Username' 
              secondary_text={userData?.email}/>
            <Card 
              border 
              outline='white' 
              stretch
              between 
              bookmark_button 
              primary_text='Phone Number' 
              secondary_text={`(+234) ${userData?.phone_number}`}/>
            <Card 
              border 
              outline='white' 
              stretch
              between 
              bookmark_button 
              primary_text='Password' 
              secondary_text='xxxxxxxxxxxxxxx'/>
            <Card 
              border 
              outline='white' 
              stretch
              between 
              bookmark_button 
              primary_text='Earn By Driving'  />
          </View>
        </View>
        
        <View className='gap-4'>
          <Text fontSize='body' fontWeight='semibold' text='Authorization Settings'/>
          <View className='gap-2'>
            <Card 
              border 
              outline='white' 
              stretch
              between 
              bookmark_button 
              bookmark_button_icon
              bookmark_button_text="Register"
              bookmark_button_outline={false}
              primary_text='Google' 
              secondary_text='Connect to Login with your google account'/>
            <Card 
              border 
              outline='white' 
              stretch
              between 
              bookmark_button
              bookmark_button_icon
              bookmark_button_text="Register"
              bookmark_button_outline={false} 
              primary_text='Apple' 
              secondary_text='Connect to Login with your Apple ID'/>
            <Card 
              border 
              outline='white' 
              stretch
              between 
              bookmark_button 
              bookmark_button_icon
              bookmark_button_text="Register"
              bookmark_button_outline={false}
              primary_text='Two-Factor Authentication' 
              secondary_text='Enable 2FA for more security'/>
          </View>
        </View>
        
        <View className='gap-4'>
          <Text fontSize='body' fontWeight='semibold' text='Advanced'/>
          <View className='gap-2'>
            <Card 
              border 
              outline='white' 
              stretch
              between 
              bookmark_button 
              bookmark_button_icon={<LongArrowDownLeft/>}
              bookmark_button_outline={false}
              bookmark_button_type="warning"
              primary_text='Log Out' 
              bookmark_button_function={signOut}
              secondary_text='Use saved credentials to log back in'/>
            <Card 
              border 
              outline='white' 
              stretch
              between 
              bookmark_button
              bookmark_button_icon={<Bin/>}
              bookmark_button_outline={false} 
              bookmark_button_type="danger"
              primary_text='Delete Account' 
              secondary_text='Permanently delete your account'/>
          </View>
        </View>
      </View>
    )
  }
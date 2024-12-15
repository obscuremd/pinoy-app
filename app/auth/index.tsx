import { ActivityIndicator, Image, View} from 'react-native'
import React, { useState } from 'react'
import { Button, Input, Text } from '@/src/Exports/Exports'
import { useAuth } from '@/src/Providers/AuthProvider'
import { SafeAreaView } from 'react-native-safe-area-context';
import splash from '../../assets/Splash.svg'
import { SvgUri } from 'react-native-svg';

const auth = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [verification, setVerification] = useState(false)
  const [verificationButton, setVerificationButton] = useState(0)
  const [code, setCode] = useState('')


  const{Login, LoginVerification, loading} = useAuth()

  return (
    <SafeAreaView  style={{flex:1}} className="relative bg-background-500 items-center pt-5  text-grayscale-500 gap-5">
       <Image source={require('../../assets/Splash.png')} className='w-[300px] h-[166px]' />

        <View>
          <Text text='Pinoy' fontSize='h3' fontWeight='bold' />
          <Text text='Discover unbeatable deals on your favorite products! Shop now at Sizzles and save big!' fontSize='caption' fontWeight='semibold' />
        </View>

       <Input
        stretch
        outside_icon={false}
        InputFunction={setEmail} // Directly set the value
        placeholder="E-mail"
      />
      <Input
        stretch
        outside_icon={false}
        InputFunction={setPassword} // Directly set the value
        placeholder="Password"
      />
      <Input
        stretch
        outside_icon={false}
        InputFunction={setCode} // Directly set the value
        placeholder="Code"
      />
      {
        loading 
        ?<ActivityIndicator/>
        :<Button onclick={()=>Login({email, password, setVerification, setVerificationButton})} color='primary' size='md' text='Login'/>
      }
      {verificationButton == 1 && <Button onclick={()=>LoginVerification({code})} color='primary' size='md' text='Verify'/>}
    </SafeAreaView>
  )
}

export default auth

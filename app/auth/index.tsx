import { ActivityIndicator, View } from 'react-native'
import React, { useState } from 'react'
import { Button, Input, Text } from '@/src/Exports/Exports'
import { useAuth } from '@/src/Providers/AuthProvider'

const auth = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [verification, setVerification] = useState(false)
  const [verificationButton, setVerificationButton] = useState(0)
  const [code, setCode] = useState('')


  const{Login, LoginVerification, loading} = useAuth()

  return (
    <View className=''>
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
      <Text text='pp' fontSize='h5'/>
    </View>
  )
}

export default auth
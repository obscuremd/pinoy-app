import React, { useState } from 'react'
import { Search } from 'iconoir-react-native'
import { TextInput, View } from 'react-native';
import ButtonUI from './Button';

interface InputProps {
    stretch?: boolean
    color?: 'primary' | 'white'
    outside_icon?: React.ReactNode
    inside_icon?: React.ReactNode
    InputFunction?: (value: string) => void;
    placeholder?:string
}

const InputUi: React.FC<InputProps> = ({
  stretch, 
  color='primary', 
  outside_icon=(<Search/>), 
  inside_icon=(<Search/>), 
  InputFunction,
  placeholder = 'placeholder'
}) => {

    const [active, setActive] = useState(false)


  return (
    <View className={`flex flex-row items-center justify-center gap-2 ${stretch && 'w-full'}`}>
        <View className={
            `flex flex-row items-center gap-2 p-[5px] border-[1px] rounded-[10px] 
            ${active ?(color === 'primary' ? 'border-primary-500' : 'border-grayscale-500'):'border-grayscale-700'}`}>
            {inside_icon && <ButtonUI color={active ? (color === 'primary' ? 'primary' : 'text') : 'text'} size='sm_icon' rounded='full' outline icon_left={inside_icon}/>}
            <TextInput 
                placeholder={placeholder}
                onFocus={() => setActive(true)}
                onBlur={() => setActive(false)} 
                onChangeText={InputFunction}
                className={`
                  bg-transparent outline-none px-2 
                  ${stretch && 'w-[80%]'}
                  ${active ? 'text-grayscale-500' : 'text-grayscale-700'}`}/>
        </View>
        {outside_icon && <ButtonUI color={active ? (color === 'primary' ? 'primary' : 'text') : 'text'} size='sm_icon' rounded='full' outline icon_left={outside_icon}/>}
    </View>
  )
}

export default InputUi
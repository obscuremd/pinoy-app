import { timelineData } from "@/src/Exports/Constants"
import { Button, Card, Text } from "@/src/Exports/Exports"
import { ArrowLeft, Bin, LongArrowDownLeft, NavArrowLeft, NavArrowRight } from "iconoir-react-native"
import { ScrollView, View } from "react-native"

export default function HistorySection (){
    return(
      <View className='gap-8'>
        
        <View className='gap-4'>
          <Text fontSize='body' fontWeight='semibold' text='Trip History'/>
          <View className="flex-row items-center gap-2">
            <Button 
                rounded='full' 
                text='Dec' 
                color='primary'
                outline 
                icon_left={<NavArrowLeft/>}
                size='xs'/>
            <Button 
                rounded='full' 
                text='January' 
                color='primary' 
                size='sm'/>
            <Button 
                rounded='full' 
                text='Feb' 
                color='primary'
                outline 
                icon_right={<NavArrowRight/>}
                size='xs'/>
          </View>
          
          <ScrollView horizontal contentContainerStyle={{gap:8}}>
            {
                timelineData.map(({id},index)=>(
                    <Button 
                        key={index}
                        rounded='full' 
                        text={id.toString()} 
                        color='primary'
                        outline 
                        size='xs'/>
                ))
            }
          </ScrollView>
          
          <View className='gap-2'>

            {
                    timelineData.map((item, index)=>(
                        <View key={index} className="flex-row items-center gap-2">
                            <Text text={item.time}/>
                            <Card 
                                border 
                                outline='white' 
                                between 
                                stretch
                                // width="w-[10vw]"
                                primary_text={item.primary_text} 
                                secondary_text={item.secondary_text}/>
                        </View>
                    ))
                }
                
          </View>
        </View>
        
      </View>
    )
  }
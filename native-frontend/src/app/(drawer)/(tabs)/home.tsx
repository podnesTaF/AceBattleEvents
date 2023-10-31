import React from 'react'
import { useRouter } from 'expo-router'
import { SafeAreaView  } from 'react-native-safe-area-context';
import UpcomingEventCard from '@Components/events/UpcomingEventCard';
import { HStack, Heading, VStack, Image, Box, ScrollView, Center, Pressable } from '@gluestack-ui/themed';
import { infoCards } from '@Constants/info-contents';
import StatCard from '@Components/custom/StatCard';

const Page = () => {
    const router = useRouter()

  return (
    // <SafeAreaView>
      <ScrollView bg={"#fff9ff"}>
        <VStack mx={'$3'} mb={'$4'} space='lg'>
          <Heading size={'lg'} textTransform='uppercase' fontWeight='bold'>
            Upcoming Events
          </Heading>
          <UpcomingEventCard />
        </VStack>
        <Box mt={"$10"} mb={"$6"}>
          <HStack space={'sm'} alignItems='flex-start'>
            <Box width={"$72"} height={520} position='relative' left={"-$40"}>
              <Image role="img" source={require('@Assets/images/stadium.png')} alt={'stadium'} width={280} height={500} objectFit='cover' />
            </Box>
            <VStack left={"-$40"} px={'$3'} width={"$4/6"}>
              <Heading size={'lg'} mb={"$4"} textAlign='center'>Welcome to Ace Battle Mile</Heading>
              <VStack width={'$full'} space='xl' mb={"$4"}>
                {infoCards.map((item, i) => {
                 return <StatCard key={i} {...item} />
                })}
              </VStack>
            </VStack>
          </HStack>
        </Box>
        <Box my={"$4"} p={"$3"} bg={"$coolGray900"}>
          <Heading size="lg" color="$white" mb={"$4"}>Top ABM Runners</Heading>
          <Center width={"$full"} mb={"$4"}>
             <HStack>
                <Pressable>
                {({pressed}: {pressed: boolean}) => (
                  <Box bg={pressed ? "$red700" : "$red500"} minWidth={"$24"} borderBottomLeftRadius={16} px={"$3"} py={'$1'}>
                    <Heading size="xl" color='$white' textAlign='center'>Men</Heading>
                  </Box>
                )}
                </Pressable>
                <Pressable>
                {({pressed}: {pressed: boolean}) => (
                <Box bg={pressed ? "$coolGray700" : "$coolGray800"} minWidth={"$24"} borderTopRightRadius={16} px={"$3"} py={'$1'}>
                    <Heading size="xl" color='$white' textAlign='center'>Women</Heading>
                </Box>
                 )}
                </Pressable>
             </HStack>
          </Center>
        </Box>
      </ScrollView>
    // </SafeAreaView>
  )
}

export default Page
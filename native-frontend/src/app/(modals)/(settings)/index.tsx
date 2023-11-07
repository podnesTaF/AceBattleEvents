import React from 'react'
import { Link, Stack } from 'expo-router'
import { Box, Button, ButtonText, Heading, Pressable, VStack } from '@gluestack-ui/themed'
import Container from '@Components/common/Container'

const SettingOptions = () => {
  return (
    <>
      <Stack.Screen options={{
        headerTitle: (props) => (
          <Box py="$2"  alignItems='center'>
            <Heading size='lg' color={props.tintColor}>Settings</Heading>
          </Box>
        )
      }} />
      <VStack space="sm" my="$4">
        <Container vertical={true}>
           <Box p={"$2"}>
           <Link href={'/change-data'} asChild>
              <Pressable py={"$3"} borderBottomColor='$coolGray300' borderBottomWidth={2}>
                {({ pressed }: {pressed: boolean}) => (
                  <Heading size='md' opacity={pressed ? 0.8 : 1}>
                      Change profile information
                  </Heading>
                )}
                </Pressable>
            </Link>
            <Link href={'/change-password'} asChild>
              <Pressable py={"$3"}>
                {({ pressed }: {pressed: boolean}) => (
                  <Heading size='md' opacity={pressed ? 0.8 : 1}>
                     Set new password
                  </Heading>
                )}
                </Pressable>
            </Link>
           </Box>
        </Container>
      </VStack>
    </>
  )
}

export default SettingOptions
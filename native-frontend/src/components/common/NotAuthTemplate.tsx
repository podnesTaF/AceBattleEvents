import React from 'react'
import Container from './Container'
import { Button, ButtonGroup, ButtonText, Heading, Text, VStack} from '@gluestack-ui/themed'

const NotAuthTemplate = ({text, title}: {text?: string, title?: string}) => {
  return (
    <Container>
        <VStack space='lg'>
        <Heading size={"lg"}>
           {title ? title : "Welcome to Ace Battle Mile!"}
        </Heading>
        <Text size={'md'}>
            {text ? text : 'Please authorize to oversee your profile and events!'}
        </Text>
        <ButtonGroup mb={"$4"} justifyContent='space-between' space='lg'>
            <Button variant="solid" action="positive">
                <ButtonText>Join Us</ButtonText>
            </Button>
            <Button variant="outline" action="positive">
                <ButtonText>Sign In</ButtonText>
            </Button>
        </ButtonGroup>
        </VStack>
    </Container>
  )
}

export default NotAuthTemplate
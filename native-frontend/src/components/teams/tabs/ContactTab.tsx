import React from 'react'
import { Box, Heading, VStack } from '@gluestack-ui/themed'
import { managers } from '@Constants/dummy-data'
import UserDetailedInfo from '@Components/common/UserDetailedInfo'
import Container from '@Components/common/Container'

const ContactTab = () => {
  return (
    <Box my={"$5"}>
        <Heading size={"lg"} m={"$2"}>Contact team</Heading>
        <Container>
            {managers.map((user, i) => (
                <UserDetailedInfo user={user} description={user.description} key={user.id} />
           ))}
        </Container>
    </Box>
  )
}

export default ContactTab
import React from 'react'
import { Box, Heading, VStack } from '@gluestack-ui/themed'
import { managers } from '@Constants/dummy-data'
import UserDetailedInfo from '@Components/common/UserDetailedInfo'

const ContactTab = () => {
  return (
    <Box my={"$5"}>
        <Heading size={"lg"} m={"$2"}>Contact team</Heading>
        <VStack
          px={"$3"}
          width={"$full"}
          borderColor="$red500"
          bgColor="$white"
          borderTopWidth={3}
          borderBottomWidth={3}
        >
            {managers.map((user, i) => (
                <UserDetailedInfo user={user} description={user.description} key={user.id} />
           ))}
        </VStack>
    </Box>
  )
}

export default ContactTab
import React from 'react'
import { Link } from 'expo-router'
import { Button, ButtonText, VStack } from '@gluestack-ui/themed'

const SettingOptions = () => {
  return (
    <VStack space="md">
      <Link href={"/change-data"} asChild>
        <Button>
            <ButtonText>
                change user data
            </ButtonText>
        </Button>
      </Link>
      <Link href={"/change-password"} asChild>
      <Button>
            <ButtonText>
        change user password
        </ButtonText>
        </Button>
      </Link>
    </VStack>
  )
}

export default SettingOptions
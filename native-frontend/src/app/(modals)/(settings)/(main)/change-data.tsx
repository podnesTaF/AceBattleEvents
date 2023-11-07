import React, { useEffect } from 'react'
import { Stack } from 'expo-router'
import { Heading, VStack, Text, Box, Button, ButtonText} from '@gluestack-ui/themed'
import Container from '@Components/common/Container'
import FormLayout from '@Components/common/forms/FormLayout'
import FormField from '@Components/common/forms/FormField'
import { updateUserDataSchema } from '@lib/utils'
import { FormProvider, useForm } from 'react-hook-form';
import {yupResolver} from "@hookform/resolvers/yup";
import FormButton from '@Components/common/forms/FormButton'

const ChangeUserData = () => {


  const form = useForm({
    mode: "onChange",
    resolver: yupResolver(updateUserDataSchema)
})

  const onSubmit = async (dto: any) => {
      console.log(dto)
  }

  return (
    <>
      <Stack.Screen options={{
        headerTitle: (props) => (
          <VStack py="$1" >
            <Text color={props.tintColor} size="md">Settings</Text>
            <Heading size='lg' color={props.tintColor}>Change Profile Data</Heading>
          </VStack>
        )
      }} />
      <Box my={"$4"}>
        <Container vertical={true}>
        <FormProvider {...form}>
            <VStack>
            <FormField
              name="name" label={'Name'} placeholder={'Enter your name'} variant={'underlined'} size={'md'}          
            />
             <FormField
              name="surname" label={'Surname'} placeholder={'Enter your surname'} variant={'underlined'} size={'md'}          
            />
             <FormField
              name="city" label={'City'} placeholder={'Enter your city'} variant={'underlined'} size={'md'}          
            />
             <FormField
              name="country" label={'Country'} placeholder={'Enter your country'} variant={'underlined'} size={'md'}          
            />
            </VStack>
            <FormButton
            isDisabled={!form.formState.isValid || form.formState.isSubmitting}
            isLoading={form.formState.isSubmitting }
            onPress={form.handleSubmit(onSubmit)} title={"Save"} />
          </FormProvider>
        </Container>
      </Box>
    </>
  )
}

export default ChangeUserData
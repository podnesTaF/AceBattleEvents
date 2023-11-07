import React from 'react'
import { Stack } from 'expo-router'
import { VStack, Text, Heading, Box } from '@gluestack-ui/themed'
import { FormProvider, useForm } from 'react-hook-form';
import {yupResolver} from "@hookform/resolvers/yup";
import { changePasswordSchema } from '@lib/utils';
import FormField from '@Components/common/forms/FormField';
import FormButton from '@Components/common/forms/FormButton';
import Container from '@Components/common/Container';

const ChangeUserPassword = () => {

  const form = useForm({
    mode: "onChange",
    resolver: yupResolver(changePasswordSchema)
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
            <Heading size='lg' color={props.tintColor}>Set New Password</Heading>
          </VStack>
        )
      }} />
      <Box my={"$4"}>
        <Container vertical={true}>
        <FormProvider {...form}>
            <VStack>
            <FormField
              name="oldPassword" label={'Old password'} placeholder={'Enter your old password'} variant={'underlined'} size={'md'}          
            />
             <FormField
              name="newPassword" label={'New Password'} placeholder={'Enter your surname'} variant={'underlined'} size={'md'}          
            />
             <FormField
              name="confirmPassword" inputProportion={1.5} label={'Confirm Password'} placeholder={'Enter your city'} variant={'underlined'} size={'md'}          
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

export default ChangeUserPassword
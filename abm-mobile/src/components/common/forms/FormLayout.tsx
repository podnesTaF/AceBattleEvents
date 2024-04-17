import { View, Text } from 'react-native'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form';
import {yupResolver} from "@hookform/resolvers/yup";

interface FormLayoutProps {
    resolver: any;
    defaultValues: any[];
    children: React.ReactNode;
}

const FormLayout: React.FC<FormLayoutProps> = ({resolver, defaultValues, children}) => {

    const form = useForm({
        mode: "onChange",
        resolver: yupResolver(resolver),
        defaultValues
    })

  return (
    <FormProvider {...form}>
        {children}
    </FormProvider>
  )
}

export default FormLayout
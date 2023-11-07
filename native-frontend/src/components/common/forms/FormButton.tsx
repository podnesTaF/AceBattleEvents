import { Button, ButtonSpinner, ButtonText } from '@gluestack-ui/themed'
import React from 'react'


const FormButton = ({title, isLoading, ...props}: any) => {
  return (
    <Button
        {...props}
        variant="solid"
        action="positive"
    >
        {isLoading && <ButtonSpinner mr="$1" />}
        <ButtonText>{title}</ButtonText>
    </Button>
  )
}

export default FormButton
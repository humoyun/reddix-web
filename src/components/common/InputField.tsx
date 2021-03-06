import React, { InputHTMLAttributes, useEffect } from 'react'
import { useField } from 'formik'
import {
  FormControl,
  // FormLabel,
  Input,
  FormErrorMessage,
  Textarea,
} from '@chakra-ui/core'

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  textarea?: boolean;
  name: string;
  type: string;
};

// '' => false
// 'error message stuff' => true

export const InputField: React.FC<InputFieldProps> = ({
  label,
  textarea,
  size: _,
  ...props
}) => {
  const [field, { error }] = useField(props)
  
  // let C = Input
  // if (textarea) {
  //   C = Textarea 
  // }
  useEffect(() => {
    console.log('error', error)
  }, [error])

  return (
    <FormControl isInvalid={!!error}>
      {/* <FormLabel htmlFor={field.name}>{label}</FormLabel> */}
      
      {textarea ? 
        (<Textarea {...field} id={field.name} color="#3a3a3a" />) : 
        (<Input {...field} {...props} id={field.name} focusBorderColor="teal.500" />)
      }
      
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  )
}

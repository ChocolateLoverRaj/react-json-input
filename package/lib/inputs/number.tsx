import React from 'react'
import { Input, InputComponent } from '../props'
import InputNumber from 'rc-input-number'

const NumberInputComponent: InputComponent<number> = props => {
  const { value, onChange, rootProps } = props
  const { readonly, disabled } = rootProps

  return (
    <InputNumber
      value={value}
      onChange={onChange}
      disabled={disabled || readonly}
    />
  )
}

const numberInput: Input = {
  name: 'number',
  Component: NumberInputComponent,
  isValid: schema => schema.type === undefined || schema.type === 'number'
}

export default numberInput

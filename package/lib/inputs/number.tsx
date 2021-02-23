import React from 'react'
import { Input, InputComponent } from '../props'
import InputNumber from 'rc-input-number'

const NumberInputComponent: InputComponent<number> = props => {
  const { value, onChange, rootProps } = props
  const { readOnly, disabled } = rootProps

  return (
    <InputNumber
      value={value}
      onChange={onChange}
      disabled={disabled || readOnly}
    />
  )
}

const numberInput: Input = {
  name: 'number',
  Component: NumberInputComponent,
  isValid: schema => schema.type === undefined || schema.type === 'number',
  isType: value => typeof value === 'number'
}

export default numberInput

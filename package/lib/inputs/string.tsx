import React, { ChangeEventHandler, useCallback } from 'react'
import { Input, InputComponent } from '../props'

const StringInputComponent: InputComponent<string> = props => {
  const { value, onChange, rootProps } = props
  const { readonly, disabled } = rootProps

  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(({ target: { value } }) => {
    onChange(value)
  }, [onChange])

  return (
    <input
      value={value}
      onChange={handleChange}
      readOnly={readonly}
      disabled={disabled}
    />
  )
}

const stringInput: Input = {
  name: 'string',
  Component: StringInputComponent,
  isValid: schema => schema.type === undefined || schema.type === 'string'
}

export default stringInput

import React, { ChangeEventHandler, useCallback } from 'react'
import { Input, InputComponent } from '../props'

const StringInputComponent: InputComponent<string> = props => {
  const { value, onChange } = props

  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(({ target: { value } }) => {
    onChange(value)
  }, [onChange])

  return <input value={value} onChange={handleChange} />
}

const stringInput: Input = {
  name: 'string',
  Component: StringInputComponent,
  isValid: schema => schema.type === undefined || schema.type === 'string'
}

export default stringInput

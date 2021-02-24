import React, { ChangeEventHandler, useCallback } from 'react'
import { Input, InputComponent } from '../props'
import rowProps from '../rowProps'

const StringInputComponent: InputComponent<string> = props => {
  const { value, onChange, rootProps } = props
  const { readOnly, disabled, Row } = rootProps

  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(({ target: { value } }) => {
    onChange(value)
  }, [onChange])

  return (
    <Row {...rowProps(props)}>
      <input
        value={value}
        onChange={handleChange}
        readOnly={readOnly}
        disabled={disabled}
      />
    </Row>
  )
}

const stringInput: Input = {
  name: 'string',
  Component: StringInputComponent,
  isValid: schema => schema.type === undefined || schema.type === 'string',
  isType: value => typeof value === 'string',
  to: String
}

export default stringInput

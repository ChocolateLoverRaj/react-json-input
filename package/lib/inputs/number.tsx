import React, { useCallback } from 'react'
import { Input, InputComponent } from '../props'
import InputNumber from 'rc-input-number'
import rowProps from '../rowProps'

const NumberInputComponent: InputComponent<number> = props => {
  const { value, onChange, rootProps } = props
  const { readOnly, disabled, Row } = rootProps

  const handleChange = useCallback((value: string | number | undefined) => {
    onChange(typeof value === 'number' ? value : 0)
  }, [onChange])

  return (
    <Row {...rowProps(props)}>
      <InputNumber
        value={value}
        onChange={handleChange}
        disabled={disabled || readOnly}
      />
    </Row>
  )
}

const numberInput: Input = {
  name: 'number',
  Component: NumberInputComponent,
  isValid: schema => schema.type === undefined || schema.type === 'number',
  isType: value => typeof value === 'number'
}

export default numberInput

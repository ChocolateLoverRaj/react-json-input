import React, { useCallback } from 'react'
import { Input, InputComponent } from '../props'
import InputNumber from 'rc-input-number'
import rowProps from '../rowProps'
import isEnum from '../isEnum'

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

const numberInput: Input<number, undefined> = {
  name: 'number',
  Component: NumberInputComponent,
  isValid: schema => !isEnum(schema) && (schema.type === undefined || schema.type === 'number'),
  isType: value => typeof value === 'number',
  to: value => {
    const n = Number(value)
    return {
      value: !Number.isNaN(n) ? n : 0,
      state: undefined
    }
  }
}

export default numberInput

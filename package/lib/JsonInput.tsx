import never from 'never'
import React, { useState } from 'react'
import defaultProps from './defaultProps'
import { OnChange, Props } from './props'

const JsonInput = <T extends any = any>(props: Partial<Props<T>>): JSX.Element => {
  const {
    value,
    onChange,
    defaultValue,
    ...restProps
  } = { ...defaultProps, ...props }
  const { Container } = restProps

  let valueToUse: T
  let onChangeToUse: OnChange<T>
  if (value !== undefined) {
    valueToUse = value
    onChangeToUse = onChange ?? never('Do not use `value` prop without an `onChange` handler. Use `readonly` prop instead.')
  } else {
    const [value, setValue] = useState<T>(defaultValue ?? '' as T) // TODO: Calculate default value based on schema
    valueToUse = value
    onChangeToUse = setValue
  }

  return (
    <Container
      rootProps={{
        value: valueToUse,
        onChange: onChangeToUse,
        ...restProps
      }}
    />
  )
}

export default JsonInput

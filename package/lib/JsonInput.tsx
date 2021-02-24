import Ajv from 'ajv'
import never from 'never'
import React, { useState } from 'react'
import defaultProps from './defaultProps'
import { OnChange, Props } from './props'

const JsonInput = <T extends any = any>(props: Partial<Props<T>>): JSX.Element => {
  const {
    value,
    onChange,
    defaultValue,
    schema,
    ...restProps
  } = { ...defaultProps, ...props }
  const { Container } = restProps

  let valueToUse: T
  let onChangeToUse: OnChange<T>
  if (value !== undefined) {
    valueToUse = value
    onChangeToUse = onChange ?? never('Do not use `value` prop without an `onChange` handler. Use `readOnly` prop instead.')
  } else {
    const [value, setValue] = useState<T>(defaultValue ?? '' as T) // TODO: Calculate default value based on schema
    valueToUse = value
    onChangeToUse = setValue
  }

  const ajv = new Ajv()
  const validate = ajv.compile(schema)
  validate(valueToUse)
  const { errors } = validate

  return (
    <Container
      rootProps={{
        value: valueToUse,
        onChange: onChangeToUse,
        schema: schema,
        ...restProps
      }}
      errors={errors ?? undefined}
    />
  )
}

export default JsonInput

import Ajv from 'ajv'
import never from 'never'
import React, { useState } from 'react'
import defaultProps from './defaultProps'
import getValidInput from './getValidInput'
import { OnChange, Props, SelectedInput } from './props'
import RootContext from './RootContext'

const JsonInput = <T extends any = any>(props: Partial<Props<T>>): JSX.Element => {
  const {
    value,
    onChange,
    defaultValue,
    ...restProps
  } = { ...defaultProps, ...props }
  const { Container, schema, inputs } = restProps

  const input = getValidInput(inputs, schema, value)
  const { value: initialValue, state } = input.to(value, undefined, schema, inputs)

  let valueToUse: T
  let onChangeToUse: OnChange<T>
  if (value !== undefined) {
    valueToUse = value
    onChangeToUse = onChange ?? never('Do not use `value` prop without an `onChange` handler. Use `readOnly` prop instead.')
  } else {
    // We use this conditionally because we expect the component to not switch between controlled and uncontrolled
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState<T>(defaultValue ?? initialValue)
    valueToUse = value
    onChangeToUse = setValue
  }

  const [selectedInput, setSelectedInput] = useState<SelectedInput>({ input, state })

  const ajv = new Ajv({ allErrors: true, strictTuples: false })
  const validate = ajv.compile(schema)
  validate(valueToUse)
  const { errors } = validate

  return (
    <RootContext.Provider
      value={{
        value: valueToUse,
        onChange: onChangeToUse,
        ...restProps
      }}
    >
      <Container
        errors={errors ?? []}
        selectedInput={selectedInput}
        onSelectedInputChange={setSelectedInput}
      />
    </RootContext.Provider>

  )
}

export default JsonInput

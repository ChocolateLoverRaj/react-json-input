import React, { useCallback } from 'react'
import { InputChooserComponent, InputSelectorPropsOnchange, OnInputStateChange } from './props'

const InputChooser: InputChooserComponent = props => {
  const {
    name,
    rootProps,
    schema,
    value,
    onChange,
    errors,
    onDelete,
    selectedInput,
    onSelectedInputChange
  } = props
  const { InputSelector, inputs } = rootProps
  const { input, state } = selectedInput
  const { Component } = input

  const filteredInputs = inputs.filter(({ isValid }) => isValid(schema))

  const handleInputChange = useCallback<InputSelectorPropsOnchange>(input => {
    const { value: newValue, state: newState } = input.to(value, state, schema, inputs)
    onSelectedInputChange({
      input: input,
      state: newState
    })
    onChange(newValue)
  }, [value, state, schema, inputs, onSelectedInputChange, onChange])

  const handleInputStateChange = useCallback<OnInputStateChange<any>>(data => {
    onSelectedInputChange({ ...selectedInput, state: data })
  }, [onSelectedInputChange, selectedInput])

  return (
    <Component
      rootProps={rootProps}
      value={value}
      onChange={onChange}
      schema={schema}
      errors={errors}
      name={name}
      onDelete={onDelete}
      inputState={state}
      onInputStateChange={handleInputStateChange}
    >
      <InputSelector
        rootProps={rootProps}
        value={input}
        onChange={handleInputChange}
        inputs={filteredInputs}
      />
    </Component>
  )
}

export default InputChooser

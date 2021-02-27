import never from 'never'
import React, { useCallback } from 'react'
import { InputChooserComponent, InputSelectorPropsOnchange, OnInputDataChange } from './props'

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
  const { name: selectedInputName, data: selectedInputData } = selectedInput

  const filteredInputs = inputs.filter(({ isValid }) => isValid(schema))

  const handleInputChange = useCallback<InputSelectorPropsOnchange>(name => {
    const {
      getInitialInputData,
      to
    } = filteredInputs.find(({ name: currentName }) => currentName === name) ?? never('No input with that name')
    onSelectedInputChange({
      name: name,
      data: getInitialInputData(schema, inputs)
    })
    onChange(to(value, schema, inputs))
  }, [filteredInputs, onSelectedInputChange, value, onChange, schema, inputs])

  const handleInputDataChange = useCallback<OnInputDataChange<any>>(data => {
    onSelectedInputChange({ ...selectedInput, data })
  }, [onSelectedInputChange, selectedInput])

  const { Component } = filteredInputs.find(({ name }) => name === selectedInputName) ?? never('No selected input with that name')

  return (
    <Component
      rootProps={rootProps}
      value={value}
      onChange={onChange}
      schema={schema}
      errors={errors}
      name={name}
      onDelete={onDelete}
      inputData={selectedInputData}
      onInputDataChange={handleInputDataChange}
    >
      <InputSelector
        rootProps={rootProps}
        value={selectedInputName}
        onChange={handleInputChange}
        inputs={filteredInputs}
      />
    </Component>
  )
}

export default InputChooser

import React, { useCallback, useState } from 'react'
import { InputChooserComponent, InputSelectorPropsOnchange } from './props'

const InputChooser: InputChooserComponent = props => {
  const { name, rootProps, schema, value, onChange, errors, onDelete } = props
  const { InputSelector, inputs } = rootProps

  const filteredInputs = inputs.filter(({ isValid }) => isValid(schema))

  const [input, setInput] = useState(filteredInputs.findIndex(({ isType }) => isType(value)))

  const handleInputChange = useCallback<InputSelectorPropsOnchange>(index => {
    setInput(index)
    onChange(filteredInputs[index].to(value))
  }, [setInput, onChange, filteredInputs, value])

  const { Component } = filteredInputs[input]

  return (
    <Component
      rootProps={rootProps}
      value={value}
      onChange={onChange}
      schema={schema}
      errors={errors}
      name={name}
      onDelete={onDelete}
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

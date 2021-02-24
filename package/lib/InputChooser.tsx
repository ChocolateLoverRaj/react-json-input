import React, { useState } from 'react'
import { InputChooserComponent } from './props'

const InputChooser: InputChooserComponent = props => {
  const { name, rootProps, schema, value, onChange, errors } = props
  const { InputSelector, inputs } = rootProps

  const filteredInputs = inputs.filter(({ isValid }) => isValid(schema))

  const [input, setInput] = useState(filteredInputs.findIndex(({ isType }) => isType(value)))

  const { Component } = filteredInputs[input]

  return (
    <Component
      rootProps={rootProps}
      value={value}
      onChange={onChange}
      schema={schema}
      errors={errors}
      name={name}
    >
      <InputSelector
        rootProps={rootProps}
        value={input}
        onChange={setInput}
        inputs={filteredInputs}
      />
    </Component>
  )
}

export default InputChooser

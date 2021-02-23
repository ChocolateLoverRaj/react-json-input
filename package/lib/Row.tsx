import Ajv from 'ajv'
import React, { useState } from 'react'
import { RowComponent } from './props'
import Validation from './Validation'

const Row: RowComponent = props => {
  const { name, rootProps, schema, value, onChange } = props
  const { InputSelector, inputs } = rootProps

  const filteredInputs = inputs.filter(({ isValid }) => isValid(schema))

  const [input, setInput] = useState(filteredInputs.findIndex(({ isType }) => isType(value)))

  const { Component } = filteredInputs[input]
  const ajv = new Ajv()
  const validate = ajv.compile(schema)
  validate(value)
  const errors = validate.errors ?? undefined

  return (
    <tr>
      <td>
        <Validation rootProps={rootProps} errors={errors} />
      </td>
      <th>{name}</th>
      <td>
        <Component
          rootProps={rootProps}
          value={value}
          onChange={onChange}
          schema={schema}
        />
      </td>
      <td>
        <InputSelector
          rootProps={rootProps}
          value={input}
          onChange={setInput}
          inputs={filteredInputs}
        />
      </td>
    </tr>
  )
}

export default Row

import React, { useState } from 'react'
import { RowComponent } from './props'

const Row: RowComponent = props => {
  const { name, rootProps, schema, value, onChange } = props
  const { InputSelector, inputs } = rootProps

  const [input, setInput] = useState(0)

  const { Component } = inputs[input]

  return (
    <tr>
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
          schema={schema}
        />
      </td>
    </tr>
  )
}

export default Row

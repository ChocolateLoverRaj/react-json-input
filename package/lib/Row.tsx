import React, { useState } from 'react'
import { RowComponent } from './props'

const Row: RowComponent = props => {
  const { name, rootProps, schema } = props
  const { InputSelector } = rootProps

  const [input, setInput] = useState(0)

  return (
    <tr>
      <th>{name}</th>
      <td>Value coming soon</td>
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

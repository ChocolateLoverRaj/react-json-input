import React from 'react'
import { RowComponent } from './props'

const Row: RowComponent = props => {
  const { name } = props
  return (
    <tr>
      <th>{name}</th>
      <td>Value coming soon</td>
      <td>
        <select>
          <option>Type Coming Soon</option>
        </select>
      </td>
    </tr>
  )
}

export default Row

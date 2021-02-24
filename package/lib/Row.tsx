import React from 'react'
import { RowComponent } from './props'

const Row: RowComponent = props => {
  const { rootProps, errors, name, children, inputSelector, onDelete } = props
  const { Validation } = rootProps

  return (
    <tr>
      <td>
        <Validation rootProps={rootProps} errors={errors} />
      </td>
      <th>{name}</th>
      <td>{children}</td>
      <td>{inputSelector}</td>
      <td>
        {onDelete !== undefined && (
          <span onClick={onDelete}>{'\u2717'}</span>
        )}
      </td>
    </tr>
  )
}

export default Row

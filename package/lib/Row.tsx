import React from 'react'
import DeleteButton from './_deleteButton'
import { RowComponent } from './props'

const Row: RowComponent = props => {
  const { rootProps, errors, name, children, inputSelector, onDelete } = props
  const { Validation, InputName } = rootProps

  return (
    <tr>
      <td>
        <Validation rootProps={rootProps} errors={errors} />
      </td>
      <InputName rootProps={rootProps} name={name} />
      <td>{children}</td>
      <td>{inputSelector}</td>
      <td>{onDelete !== undefined && <DeleteButton onClick={onDelete} />}</td>
    </tr>
  )
}

export default Row

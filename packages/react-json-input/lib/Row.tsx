import React, { useContext } from 'react'
import DeleteButton from './DeleteButton'
import { RowComponent } from './props'
import RootContext from './RootContext'

const Row: RowComponent = props => {
  const { errors, name, children, inputSelector, onDelete } = props

  const { Validation, InputName } = useContext(RootContext)

  return (
    <tr>
      <td>
        <Validation errors={errors} />
      </td>
      <InputName name={name} />
      <td>{children}</td>
      <td>{inputSelector}</td>
      <td>{onDelete !== undefined && <DeleteButton onClick={onDelete} />}</td>
    </tr>
  )
}

export default Row

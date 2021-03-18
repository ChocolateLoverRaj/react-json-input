import React, { useContext } from 'react'
import { ValidationComponent } from './props'
import RootContext from './RootContext'

const Validation: ValidationComponent = props => {
  const { errors } = props

  const { ValidationNoErrors, ValidationErrors } = useContext(RootContext)

  return errors === undefined || errors.length === 0
    ? <ValidationNoErrors />
    : (
      <ValidationErrors
        message={errors
          .map(({ message }) => message)
          .join('\n')}
      />
    )
}

export default Validation

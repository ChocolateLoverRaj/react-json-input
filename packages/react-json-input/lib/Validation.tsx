import React, { useContext } from 'react'
import { ValidationComponent } from './props'
import RootContext from './RootContext'

const Validation: ValidationComponent = props => {
  const { errors } = props

  const { ValidationNoErrors, ValidationErrors } = useContext(RootContext)

  /* eslint-disable @typescript-eslint/indent */
  return errors === undefined || errors.length === 0
    ? <ValidationNoErrors />
    : (
      <ValidationErrors
        message={errors
          .map(({ message }) => message)
          .join('\n')}
      />
    )
  /* eslint-enable @typescript-eslint/indent */
}

export default Validation

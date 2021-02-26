import React from 'react'
import { ValidationComponent } from './props'

const Validation: ValidationComponent = props => {
  const { errors, rootProps } = props
  const { ValidationNoErrors, ValidationErrors } = rootProps

  return errors === undefined || errors.length === 0
    ? <ValidationNoErrors rootProps={rootProps} />
    : (
      <ValidationErrors
        rootProps={rootProps}
        message={errors
          .map(({ message }) => message)
          .join('\n')}
      />
    )
}

export default Validation

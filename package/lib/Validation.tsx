import React from 'react'
import { ValidationComponent } from './props'

const Validation: ValidationComponent = props => {
  const { errors, rootProps } = props
  const { ValidationNoErrors } = rootProps

  return errors === undefined || errors.length === 0
    ? <ValidationNoErrors rootProps={rootProps} />
    : (
      <span
        title={errors
          .map(({ message }) => message)
          .join('\n')}
      >
        {'\u2717'}
      </span>
    )
}

export default Validation

import React from 'react'
import { ValidationComponent } from './props'

const Validation: ValidationComponent = props => {
  const { errors } = props

  return errors === undefined
    ? <span>{'\u2713'}</span>
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

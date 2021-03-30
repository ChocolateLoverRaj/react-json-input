import { createContext, Context } from 'react'
import defaultProps from './defaultProps'
import { ControlledProps } from './props'

const initialValue: ControlledProps = {
  ...defaultProps,
  onChange: () => {
    throw new Error('No initial value')
  },
  get value () {
    throw new Error('No initial value')
  }
}
const RootContext: Context<ControlledProps> = createContext(initialValue)

export default RootContext

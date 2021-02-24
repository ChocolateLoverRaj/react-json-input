import { InputProps, RowPropsWithoutChildren } from './props'

/**
 * Easily get `Row` props from `Input` props
 */
const rowProps = (inputProps: InputProps<any>): RowPropsWithoutChildren => {
  const { rootProps, children, name, errors } = inputProps
  return {
    rootProps: rootProps,
    inputSelector: children,
    name: name,
    errors: errors
  }
}

export default rowProps

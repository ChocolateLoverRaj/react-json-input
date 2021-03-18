import { InputProps, RowPropsWithoutChildren } from './props'

/**
 * Easily get `Row` props from `Input` props
 */
const rowProps = (inputProps: InputProps<any, any>): RowPropsWithoutChildren => {
  const { children, name, errors, onDelete } = inputProps
  return {
    inputSelector: children,
    name: name,
    errors: errors,
    onDelete: onDelete
  }
}

export default rowProps

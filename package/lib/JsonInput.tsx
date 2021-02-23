import React, { useCallback, useState } from 'react'
import defaultProps from './defaultProps'
import { Props } from './props'

const JsonInput = <T extends any = any>(props: Partial<Props<T>>): JSX.Element => {
  const {
    value,
    onChange,
    defaultValue,
    ...restProps
  } = { ...defaultProps, ...props }
  const { Container } = restProps

  const [fallbackValue, setFallbackValue] = useState<T>(defaultValue ?? null as T) // TODO: Calculate default value based on schema
  const handleChange = useCallback((newValue: T) => {
    onChange?.(newValue) ?? setFallbackValue(newValue)
  }, [setFallbackValue, onChange])

  const valueToUse = value ?? fallbackValue

  return (
    <Container
      value={valueToUse}
      onChange={handleChange}
      {...restProps}
    />
  )
}

export default JsonInput

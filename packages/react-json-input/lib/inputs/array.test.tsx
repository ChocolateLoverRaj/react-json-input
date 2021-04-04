import arrayInput from './array'
import { render } from '@testing-library/react'
import { JSONSchema7 } from 'json-schema'
import Ajv from 'ajv'

describe('Component', () => {
  test('can add element', () => {
    expect(render(
      <arrayInput.Component
        value={[]}
        name=''
        schema={{ type: 'array' }}
        errors={[]}
        {...{} as any}
      />
    ).baseElement).toMatchSnapshot()
  })
  test('cannot add element', () => {
    expect(render(
      <arrayInput.Component
        value={[]}
        name=''
        schema={{ type: 'array', maxItems: 0 }}
        errors={[]}
        {...{} as any}
      />
    ).baseElement).toMatchSnapshot()
  })
  test('errors', () => {
    const schema: JSONSchema7 = { type: 'array', items: { type: 'string', pattern: 'a' } }
    const validator = new Ajv({ allErrors: true }).compile(schema)
    validator(['', ''])
    expect(render(
      <arrayInput.Component
        value={[]}
        name=''
        schema={schema}
        errors={validator.errors}
        {...{} as any}
      />
    ).baseElement).toMatchSnapshot()
  })
})

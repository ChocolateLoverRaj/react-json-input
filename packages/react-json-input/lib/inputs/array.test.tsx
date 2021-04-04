import arrayInput from './array'
import { render } from '@testing-library/react'

describe('Component', () => {
  test('can add element', () => {
    expect(render(
      <arrayInput.Component
        value={[]}
        name=''
        schema={{ type: 'array' }}
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
        {...{} as any}
      />
    ).baseElement).toMatchSnapshot()
  })
})

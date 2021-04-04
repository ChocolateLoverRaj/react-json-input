import stringInput from './string'
import { render } from '@testing-library/react'

test('Component', () => {
  expect(render(
    <stringInput.Component
      value='hi'
      {...{} as any}
    />
  ).baseElement).toMatchSnapshot()
})

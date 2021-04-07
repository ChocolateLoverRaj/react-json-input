import { render } from '@testing-library/react'
import { JsonInput } from '..'

test('readOnly', () => {
  expect(render(
    <JsonInput schema={{ type: 'boolean' }} readOnly />
  ).baseElement).toMatchSnapshot()
})

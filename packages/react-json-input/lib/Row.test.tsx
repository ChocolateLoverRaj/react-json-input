import { render } from '@testing-library/react'
import { FC } from 'react'
import defaultProps from './defaultProps'
import RootContext from './RootContext'
import Row from './Row'

test('uses custom DeleteButton', async () => {
  const id = 'my delete button id'
  const DeleteButton: FC = () => <>{id}</>

  await render(
    <RootContext.Provider value={{ ...defaultProps, DeleteButton } as any}>
      <Row
        errors={[]}
        name=''
        onDelete={() => {}}
        {...{} as any}
      />
    </RootContext.Provider>
  ).findByText(id)
})

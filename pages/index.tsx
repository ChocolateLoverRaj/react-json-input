import { JSONSchema7 } from 'json-schema'
import { FC } from 'react'
import JsonInput from '../package/lib/JsonInput'

const schema: JSONSchema7 = {
  title: 'name',
  type: 'string',
  pattern: 'abc'
}

const App: FC = () => <JsonInput schema={schema} defaultValue='ab' />

export default App

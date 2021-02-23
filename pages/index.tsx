import { JSONSchema7 } from 'json-schema'
import { FC } from 'react'
import JsonInput from '../package/lib/JsonInput'

const schema: JSONSchema7 = {
  title: 'name'
}

const App: FC = () => <JsonInput schema={schema} />

export default App

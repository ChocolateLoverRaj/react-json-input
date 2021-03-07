import { JSONSchema7 } from 'json-schema'
import { FC, useState } from 'react'
import JsonInput from '../package/lib/JsonInput'
import JsonPretty from 'react-json-pretty'
import 'react-json-pretty/themes/acai.css'
import valueFromSchema from '../package/lib/valueFromSchema'
import defaultInputs from '../package/lib/defaultInputs'

const schema: JSONSchema7 = {
  type: 'array',
  items: [
    { type: 'string' },
    { type: 'number' },
    { type: 'boolean' },
    { type: 'null' },
    { type: 'array' },
    { type: 'array' }
  ],
  minItems: 2,
  additionalItems: true
}

const App: FC = () => {
  const [value, setValue] = useState(valueFromSchema(undefined, defaultInputs, schema))

  return (
    <>
      <h1>Json Input</h1>
      <JsonInput schema={schema} value={value} onChange={setValue} />
      <h2>Pretty Printed Json</h2>
      <JsonPretty json={value} />
    </>
  )
}

export default App

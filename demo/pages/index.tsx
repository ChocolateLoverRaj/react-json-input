import { JSONSchema7 } from 'json-schema'
import { ChangeEventHandler, FC, useCallback, useState } from 'react'
import { JsonInput } from '@chocolateloverraj/react-json-input'
import JsonPretty from 'react-json-pretty'
import 'react-json-pretty/themes/acai.css'

const schema: JSONSchema7 = {
  anyOf: [{
    type: 'string'
  }, {
    type: 'array',
    items: [{
      type: 'string'
    }],
    minItems: 1,
    maxItems: 1
  }]
}

const App: FC = () => {
  const [disabled, setDisabled] = useState(false)
  const [pathStyle, setPathStyle] = useState(false)
  const [value, setValue] = useState(['An element'])

  const handleDisabledChange = useCallback<ChangeEventHandler<HTMLInputElement>>(e => {
    setDisabled(e.target.checked)
  }, [setDisabled])

  const handleChangePathStyle = useCallback<ChangeEventHandler<HTMLInputElement>>(e => {
    setPathStyle(e.target.checked)
  }, [setPathStyle])

  return (
    <>
      <h1>React Json Input</h1>
      <h2>Options</h2>
      <label>
        <input type='checkbox' checked={disabled} onChange={handleDisabledChange} />
        Toggle disabled
      </label>
      <label>
        <input type='checkbox' checked={pathStyle} onChange={handleChangePathStyle} />
        Toggle path name style
      </label>
      <h2>Json Input</h2>
      <JsonInput
        schema={schema}
        value={value}
        onChange={setValue}
        disabled={disabled}
        nameStyle={pathStyle
          ? { style: 'path' }
          : { style: 'indent', spaces: 4 }}
      />
      <h2>Pretty Printed Json</h2>
      <JsonPretty json={value} />
    </>
  )
}

export default App

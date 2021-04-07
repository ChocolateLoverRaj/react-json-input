import { JSONSchema7 } from 'json-schema'
import { ChangeEventHandler, FC, useCallback, useState } from 'react'
import { JsonInput as JsonInputNone } from '@chocolateloverraj/react-json-input'
import JsonInputAntd from '@chocolateloverraj/react-json-input-antd'
import JsonPretty from 'react-json-pretty'
import 'react-json-pretty/themes/acai.css'
import never from 'never'

const schema: JSONSchema7 = {}

interface Theme {
  name: string
  Component: typeof JsonInputNone
}

const themes: Theme[] = [{
  name: 'None',
  Component: JsonInputNone
}, {
  name: 'Ant Design',
  Component: JsonInputAntd
}]

const App: FC = () => {
  const [disabled, setDisabled] = useState(false)
  const [readOnly, setReadOnly] = useState(false)
  const [pathStyle, setPathStyle] = useState(false)
  const [value, setValue] = useState([])
  const [theme, setTheme] = useState<Theme>(themes[0])

  const handleDisabledChange = useCallback<ChangeEventHandler<HTMLInputElement>>(e => {
    setDisabled(e.target.checked)
  }, [setDisabled])

  const handleChangeReadOnly = useCallback<ChangeEventHandler<HTMLInputElement>>(e => {
    setReadOnly(e.target.checked)
  }, [setReadOnly])

  const handleChangePathStyle = useCallback<ChangeEventHandler<HTMLInputElement>>(e => {
    setPathStyle(e.target.checked)
  }, [setPathStyle])

  const { Component, name } = theme

  const handleChangeTheme = useCallback<ChangeEventHandler<HTMLSelectElement>>(e => {
    setTheme(themes.find(({ name }) => name === e.target.value) ?? never('No theme with that name'))
  }, [])

  return (
    <>
      <h1>React Json Input</h1>
      <h2>Options</h2>
      <label>
        <input type='checkbox' checked={disabled} onChange={handleDisabledChange} />
        Toggle disabled
      </label>
      <label>
        <input type='checkbox' checked={readOnly} onChange={handleChangeReadOnly} />
        Toggle readOnly
      </label>
      <label>
        <input type='checkbox' checked={pathStyle} onChange={handleChangePathStyle} />
        Toggle path name style
      </label>
      <label>
        <select value={name} onChange={handleChangeTheme}>
          {themes.map(({ name }) => <option key={name} value={name}>{name}</option>)}
        </select>
        Theme
      </label>
      <h2>Json Input</h2>
      <Component
        schema={schema}
        value={value}
        onChange={setValue}
        disabled={disabled}
        readOnly={readOnly}
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

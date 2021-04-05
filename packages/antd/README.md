[![License](https://badgen.net/github/license/ChocolateLoverRaj/react-json-input)](https://github.com/ChocolateLoverRaj/react-json-input/blob/main/LICENSE)
[![TS-Standard - Typescript Standard Style Guide](https://badgen.net/badge/code%20style/ts-standard/blue?icon=typescript)](https://github.com/standard/ts-standard)
[![Test](https://github.com/ChocolateLoverRaj/react-json-input/actions/workflows/test.yml/badge.svg)](https://github.com/ChocolateLoverRaj/react-json-input/actions/workflows/test.yml)
[![Lint](https://github.com/ChocolateLoverRaj/react-json-input/actions/workflows/lint.yml/badge.svg)](https://github.com/ChocolateLoverRaj/react-json-input/actions/workflows/lint.yml)
[![Netlify Status](https://api.netlify.com/api/v1/badges/5a958436-bfb6-4440-ab15-fc6e1512172f/deploy-status)](https://app.netlify.com/sites/react-json-input/deploys)

# react-json-input-antd
Ant design style react json input.

## Installing
This project uses [GitHub Packages](https://docs.github.com/en/packages/guides/configuring-npm-for-use-with-github-packages#installing-a-package).

Create a `.npmrc` file with the contents:
```
@chocolateloverraj:registry=https://npm.pkg.github.com
```
Then do
```bash
npm i @chocolateloverraj/react-json-input @chocolateloverraj/react-json-input-antd
```
to install the package.

## Usage
```js
import JsonInput  from '@chocolateloverraj/react-json-input-antd'

// Include the react-json-input and antd css
import '@chocolateloverraj/react-json-input/dist/index.css'
import 'antd/dist/antd.css'

// Use the JsonInput component like the normal one
// Props will be modified to use antd components
<JsonInput />
```
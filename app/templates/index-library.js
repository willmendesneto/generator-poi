import React from 'react'
import { render } from 'react-dom'

import <%= componentCC %> from './src/js/export'

render(
  <Demo
    title={name}
    description={description}
    repositoryUrl={homepage}
  />,
  document.getElementById('app')
)
import React from 'react'
import { render } from 'react-dom'
import { Demo } from 'generator-poi-boilerplate-demo'

import <%= componentCC %> from './src/js/components/<%= component %>'

import { homepage, name, description } from './package.json'

render(
  <Demo
    title={name}
    description={description}
    repositoryUrl={homepage}
  >
    <<%= componentCC %> type={'1-column'} />
  </ Demo>,
  document.getElementById('app')
)

import React from 'react'
import { render } from 'react-dom'
import Demo from 'generator-poi-boilerplate-demo'

import <%= componentCC %> from './src/js/components/<%= component %>'

render(
  <Demo>
    <<%= componentCC %>>
      <p>Hello world! This is the children inside my component</p>
    </<%= componentCC %>>
  </ Demo>,
  document.getElementById('app')
)

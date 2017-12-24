import React from 'react';
import { HowToStart } from 'generator-poi-boilerplate-demo'

import '../../scss/styles.scss'

// This component is generated automatically
// As your first step, please remove `HowToStart` component reference

const <%= componentCC %> = ({ type }) => (
  <section className={`<%= component %>-wrapper is-${type}`}>
    <h1 className="<%= component %>-heading">
      <p>This is your `<code className="<%= component %>-code">fe-co-<%= component %></code>` component</p>
    </h1>
    <HowToStart />
  </section>
)

export default <%= componentCC %>

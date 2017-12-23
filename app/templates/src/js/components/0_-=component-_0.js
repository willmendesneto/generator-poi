import React from 'react';

import '../../scss/styles.scss'

const <%= componentCC %> = ({ type }) => (
  <section className={`<%= component %>-wrapper is-${type}`}>
    <h1 className="<%= component %>-heading">
      <code className="<%= component %>-code">fe-co-<%= component %></code>
    </h1>
  </section>
)

export default <%= componentCC %>

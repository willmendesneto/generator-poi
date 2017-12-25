import { storiesOf } from 'storybook-react'
import { action } from '@storybook/addon-actions'

import <%= componentCC %> from './src/js/export'

storiesOf('<%= componentCC %>', module)
  .add('1 Column', () => <<%= componentCC %> type={'1-column'} />)
  .add('2 Columns', () => <<%= componentCC %> type={'2-columns'} />)

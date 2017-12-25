import { storiesOf, setAddon } from 'storybook-react'
import JSXAddon from 'storybook-addon-jsx';

import <%= componentCC %> from './src/js/export'

setAddon(JSXAddon)

storiesOf('<%= componentCC %>', module)
  .addWithJSX('1 Column', () => <<%= componentCC %> type={'1-column'} />)
  .addWithJSX('2 Columns', () => <<%= componentCC %> type={'2-columns'} />)

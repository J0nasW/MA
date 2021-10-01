import Page from 'material-ui-shell/lib/containers/Page'
import React from 'react'
import { useIntl } from 'react-intl'

const AddContainer = () => {
  const intl = useIntl()

  return (
    <Page pageTitle={intl.formatMessage({ id: 'locales_documents' })}>
      <Scrollbar
        style={{ height: '100%', width: '100%', display: 'flex', flex: 1 }}
      >
        {intl.formatMessage({ id: 'locales_documents' })}
      </Scrollbar>
    </Page>
  )
}
export default AddContainer

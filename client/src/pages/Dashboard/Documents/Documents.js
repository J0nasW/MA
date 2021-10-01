import Page from 'material-ui-shell/lib/containers/Page'
import React from 'react'
import Scrollbar from 'material-ui-shell/lib/components/Scrollbar/Scrollbar'
import { useIntl } from 'react-intl'

import Typography from '@material-ui/core/Typography';

const DocumentsPage = () => {
  const intl = useIntl()

  return (
    <Page pageTitle={intl.formatMessage({ id: 'locales_documents' })}>
      <Scrollbar
        style={{ height: '100%', width: '100%', display: 'flex', flex: 1 }}
      >
        <Typography variant="h3" component="h2" color="primary" style={{ marginTop: 30, marginLeft: 30 }}>
          {intl.formatMessage({ id: 'locales_documents_header' })}
        </Typography>

        <Typography variant="h6" color="textSecondary" style={{ marginLeft: 30, marginBottom: 20 }}>
          {intl.formatMessage({ id: 'locales_documents_subtitle' })}
        </Typography>
      </Scrollbar>
    </Page>
  )
}
export default DocumentsPage

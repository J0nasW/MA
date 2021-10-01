import Page from 'material-ui-shell/lib/containers/Page'
import React from 'react'
import Scrollbar from 'material-ui-shell/lib/components/Scrollbar/Scrollbar'
import { useIntl } from 'react-intl'

import Alert from '@mui/material/Alert';

import Typography from '@material-ui/core/Typography';

const EventsPage = () => {
  const intl = useIntl()

  return (
    <Page pageTitle={intl.formatMessage({ id: 'locales_events' })}>
      <Scrollbar
        style={{ height: '100%', width: '100%', display: 'flex', flex: 1 }}
      >
        <Alert severity="warning">This Page is still under construction and will be updated later on.</Alert>

        <Typography variant="h3" component="h2" color="primary" style={{ marginTop: 30, marginLeft: 30 }}>
          {intl.formatMessage({ id: 'locales_events_header' })}
        </Typography>

        <Typography variant="h6" color="textSecondary" style={{ marginLeft: 30, marginBottom: 20 }}>
          {intl.formatMessage({ id: 'locales_events_subtitle' })}
        </Typography>
      </Scrollbar>
    </Page>
  )
}
export default EventsPage

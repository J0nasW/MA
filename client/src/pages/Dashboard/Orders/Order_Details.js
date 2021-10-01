import Page from 'material-ui-shell/lib/containers/Page';
import React, { useRef, PureComponent } from 'react';
import clsx from 'clsx';
import Scrollbar from 'material-ui-shell/lib/components/Scrollbar/Scrollbar';
import { useIntl } from 'react-intl';

import { useParams } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';


import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ClearIcon from '@material-ui/icons/Clear';

import { blue, green } from '@material-ui/core/colors';

import TextField from '@material-ui/core/TextField';

import Card from '@material-ui/core/Card';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';



// Store Things
var store = require('store');


const useStyles = makeStyles({
  root: {
    minWidth: 275,
    flexGrow: 1,
    borderRadius: 10,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    zIndex: 10
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  chip: {
    margin:5,
  },
  buttonProgress: {
    color: green[500],
    top: '50%',
    left: '50%',
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  buttonError: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },

  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },

  table: {
    minWidth: 400,
  },
});


const init = () => {}
  
const OrderDetails = () => {

  const intl = useIntl()

  const classes = useStyles();

  let id = useParams().id;

  let data_source = "order" + id;
  let data_count = store.get(data_source).count
  let data_name = store.get(data_source).name
  let data_reference = store.get(data_source).reference
  let data_assignedContainer = store.get(data_source).assignedContainer

  return (
    <Page pageTitle={intl.formatMessage({ id: 'locales_container' })}>

      <Scrollbar
        style={{ height: '100%', width: '100%', display: 'flex', flex: 1, alignItems: 'center', justify: 'center' }}
      >

        <Typography variant="h3" component="h2" color="primary" style={{ marginTop: 30, marginLeft: 30 }}>
          Order #{id}
        </Typography>

        <Typography variant="h6" color="textSecondary" style={{ marginLeft: 30, marginBottom: 20 }}>
          {intl.formatMessage({ id: 'locales_container_details_subtitle' })}
        </Typography>
        

        <Container maxWidth="xl">

          <Grid container spacing={2}>

            <Grid item xs={12} md={4}>
              <Card className={classes.root}>
                <CardContent>
                  <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                    Order with Reference:
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                    {data_reference}
                  </Typography>                  
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={8}>
              <Card className={classes.root}>
                <CardContent>
                  <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                    Order Assigned to:
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                    {data_assignedContainer}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

        </Container>

      </Scrollbar>
    </Page>
  )
}
export default OrderDetails

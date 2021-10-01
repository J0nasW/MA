import Page from 'material-ui-shell/lib/containers/Page'
import React from 'react'
import Scrollbar from 'material-ui-shell/lib/components/Scrollbar/Scrollbar'
import { useIntl } from 'react-intl'
import { makeStyles } from '@material-ui/core/styles';

import Alert from '@mui/material/Alert';

import Typography from '@material-ui/core/Typography';

import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';

import { blue, green } from '@material-ui/core/colors';

import L from 'leaflet';
import {
    Map, MapContainer, TileLayer, Marker, Popup
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow
});
L.Marker.prototype.options.icon = DefaultIcon;

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


const MapPage = () => {
  const intl = useIntl()
  const classes = useStyles();

  const container_coordinates = [0, 0]

  return (
    <Page pageTitle={intl.formatMessage({ id: 'locales_map' })}>
      <Scrollbar
        style={{ height: '100%', width: '100%', display: 'flex', flex: 1 }}
      >
        <Alert severity="warning">This Page is still under construction and contains dummy data.</Alert>
        <Typography variant="h3" component="h2" color="primary" style={{ marginTop: 30, marginLeft: 30 }}>
          {intl.formatMessage({ id: 'locales_map_header' })}
        </Typography>

        <Typography variant="h6" color="textSecondary" style={{ marginLeft: 30, marginBottom: 20 }}>
          {intl.formatMessage({ id: 'locales_map_subtitle' })}
        </Typography>

        <Container maxWidth="ml">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Card className={classes.root}>
                <CardContent>
                  <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                    Map Information for Test Container:
                  </Typography>
                  <MapContainer center={[0,0]} zoom={2.5} scrollWheelZoom={true} style={{ height: "650px" }}>
                    <TileLayer
                      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[10,10]}>
                      <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                      </Popup>
                    </Marker>
                    <Marker position={[20,20]}>
                      <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                      </Popup>
                    </Marker>
                    <Marker position={[30,30]}>
                      <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                      </Popup>
                    </Marker>
                  </MapContainer>
                  
                </CardContent>
              </Card>
            </Grid>

          </Grid>

        </Container>
      </Scrollbar>
    </Page>
  )
}
export default MapPage

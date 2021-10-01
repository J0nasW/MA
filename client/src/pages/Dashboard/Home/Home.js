import Page from 'material-ui-shell/lib/containers/Page'
import React, { useCallback }  from 'react'
import Scrollbar from 'material-ui-shell/lib/components/Scrollbar/Scrollbar'
import { useIntl } from 'react-intl'
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import { useSnackbar } from 'notistack'
import Alert from '@mui/material/Alert';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { green } from '@material-ui/core/colors';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

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

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    flexGrow: 1,
    borderRadius: 10,
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

function createData(name, time, status) {
  return { name, time, status };
}

const container_rows = [
  createData("MWB10334", "08:32h", "Online"),
  createData("MAE10244", "19:14h", "Online"),
  createData("HHA03332", "05:03h", "Online"),
];

const order_rows = [
  createData("ORDER#011", "18:22h", "In Process"),
  createData("ORDER#012", "22:58h", "Created"),
  createData("ORDER#013", "12:14h", "In Process"),
];

const device_rows = [
  createData("DEVICE#001", "01:42h", "Online"),
  createData("DEVICE#002", "02:15h", "Online"),
  createData("DEVICE#003", "15:18h", "Online"),
];

const DashboardPage = () => {
  const intl = useIntl()
  const classes = useStyles();

  const history = useHistory();

  const { enqueueSnackbar } = useSnackbar()

  const moreClickContainer = useCallback(() => history.push("/containers"), [history]);
  const moreClickOrders = useCallback(() => history.push("/orders"), [history]);
  const moreClickEvents = useCallback(() => history.push("/events"), [history]);
  const moreClickDevices = useCallback(() => history.push("/devices"), [history]);
  const moreClickMap = useCallback(() => history.push("/map"), [history]);

  return (
    <Page pageTitle={intl.formatMessage({ id: 'locales_dashboard' })}>
      <Scrollbar
        style={{ height: '100%', width: '100%', display: 'flex', flex: 1 }}
      >

        <Alert severity="warning">This Page is still under construction and contains dummy data.</Alert>

        <Typography variant="h3" component="h2" color="primary" style={{ marginTop: 30, marginLeft: 30 }}>
          {intl.formatMessage({ id: 'locales_dashboard_header' })}
        </Typography>

        <Typography variant="h6" color="textSecondary" style={{ marginLeft: 30, marginBottom: 20 }}>
          {intl.formatMessage({ id: 'locales_dashboard_subtitle' })}
        </Typography>

        

        <Container maxWidth="ml">

          <Grid container spacing={3}>

            <Grid item xs>
              <Card className={classes.root}>
                <CardContent>
                  <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                    Recent Containers
                  </Typography>
                  <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>ID</TableCell>
                          <TableCell align="right">Time</TableCell>
                          <TableCell align="right">Status</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {container_rows.map((row) => (
                          <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                              {row.name}
                            </TableCell>
                            <TableCell align="right">{row.time}</TableCell>
                            <TableCell align="right" style={{ color: green[500] }}>{row.status}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={moreClickContainer}>More</Button>
                </CardActions>
              </Card>
            </Grid>

            <Grid item xs>
              <Card className={classes.root}>
                <CardContent>
                  <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                    Recent Orders
                  </Typography>
                  <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>ID</TableCell>
                          <TableCell align="right">Time</TableCell>
                          <TableCell align="right">Status</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {order_rows.map((row) => (
                          <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                              {row.name}
                            </TableCell>
                            <TableCell align="right">{row.time}</TableCell>
                            <TableCell align="right" style={{ color: green[500] }}>{row.status}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={moreClickOrders}>More</Button>
                </CardActions>
              </Card>
            </Grid>


            <Grid item xs>
              <Card className={classes.root}>
                <CardContent>
                  <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                    Recent Events
                  </Typography>
                  <Calendar />
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={moreClickEvents}>More</Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>


          <Grid container spacing={3}>
            <Grid item xs>
              <Card className={classes.root}>
                <CardContent>
                  <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                    Devices
                  </Typography>
                  <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>ID</TableCell>
                          <TableCell align="right">Time</TableCell>
                          <TableCell align="right">Status</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {device_rows.map((row) => (
                          <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                              {row.name}
                            </TableCell>
                            <TableCell align="right">{row.time}</TableCell>
                            <TableCell align="right" style={{ color: green[500] }}>{row.status}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={moreClickDevices}>More</Button>
                </CardActions>
              </Card>
            </Grid>

            <Grid item xs>
              <Card className={classes.root}>
                <CardContent>
                  <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                    Map
                  </Typography>

                  <MapContainer center={[0,0]} zoom={2.5} scrollWheelZoom={true} style={{ height: "230px" }}>
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
                <CardActions>
                  <Button size="small" onClick={moreClickMap}>More</Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>

        </Container>

      </Scrollbar>
    </Page>
  )
}
export default DashboardPage

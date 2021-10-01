import Page from 'material-ui-shell/lib/containers/Page';
import React, { useRef, PureComponent } from 'react';
import clsx from 'clsx';
import Scrollbar from 'material-ui-shell/lib/components/Scrollbar/Scrollbar';
import { useIntl } from 'react-intl';

import { useParams } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';
import Link from '@mui/material/Link';

import Alert from '@mui/material/Alert';

import L from 'leaflet';
import {
    Map, MapContainer, TileLayer, Marker, Popup
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import ShareLocationIcon from '@mui/icons-material/ShareLocation';
import OutboxIcon from '@mui/icons-material/Outbox';
import AcUnitIcon from '@mui/icons-material/AcUnit';

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

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Brush,
  AreaChart,
  Area,
  ReferenceLine,
} from 'recharts';

const Moment = require('moment')

// Store Things
var store = require('store');

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


const init = (history) => {
  var data = []
  // var data = [
  //   { name: history[0].dateTime, temp: history[0].temperature, hum: history[0].humidity, },
  //   { name: history[1].dateTime, temp: history[1].temperature, hum: history[1].humidity, },
  //   { name: history[2].dateTime, temp: history[2].temperature, hum: history[2].humidity, },
  //   { name: history[3].dateTime, temp: history[3].temperature, hum: history[3].humidity, },
  //   { name: history[4].dateTime, temp: history[4].temperature, hum: history[4].humidity, },
  //   { name: history[5].dateTime, temp: history[5].temperature, hum: history[5].humidity, },
  //   { name: history[6].dateTime, temp: history[6].temperature, hum: history[6].humidity, },
  //   { name: history[7].dateTime, temp: history[7].temperature, hum: history[7].humidity, },
  //   { name: history[8].dateTime, temp: history[8].temperature, hum: history[8].humidity, },
  //   { name: history[9].dateTime, temp: history[9].temperature, hum: history[9].humidity, },
  // ];
  for (var i = 0; i < history.length; i++) {
    data[i] = { dateTime: history[i].dateTime,
      temperature: history[i].temperature,
      humidity: history[i].humidity,
      latitude: history[i].Latitude,
      longitude: history[i].Longitude,
      status_rpi: history[i].status_rpi,
      status_dht_11: history[i].status_dht_11,
      status_gps: history[i].status_gps }
  }
  return data;
}

var sortBy = (function () {
  var toString = Object.prototype.toString,
      // default parser function
      parse = function (x) { return x; },
      // gets the item to be sorted
      getItem = function (x) {
        var isObject = x != null && typeof x === "object";
        var isProp = isObject && this.prop in x;
        return this.parser(isProp ? x[this.prop] : x);
      };
      
  /**
   * Sorts an array of elements.
   *
   * @param  {Array} array: the collection to sort
   * @param  {Object} cfg: the configuration options
   * @property {String}   cfg.prop: property name (if it is an Array of objects)
   * @property {Boolean}  cfg.desc: determines whether the sort is descending
   * @property {Function} cfg.parser: function to parse the items to expected type
   * @return {Array}
   */
  return function sortby (array, cfg) {
    if (!(array instanceof Array && array.length)) return [];
    if (toString.call(cfg) !== "[object Object]") cfg = {};
    if (typeof cfg.parser !== "function") cfg.parser = parse;
    cfg.desc = !!cfg.desc ? -1 : 1;
    return array.sort(function (a, b) {
      a = getItem.call(cfg, a);
      b = getItem.call(cfg, b);
      return cfg.desc * (a < b ? -1 : +(a > b));
    });
  };
  
}());

const ContainerDetails = () => {

  const intl = useIntl()

  const classes = useStyles();

  let id = useParams().id;
  let data_source = "container" + id;
  let data_payload = store.get(data_source).payload;

  // Get Temp & Humidity History
  var data_history = store.get(data_source).history;
  var data_history_json = init(data_history)
  console.log("History Array:");
  console.log(data_history_json)
  // let data_history_json_sort = data_history_json.sort(function(a, b){
  //   return Moment(b.dateTime).format('DD/MM/YYYY hh:mm:ss').valueOf() - Moment(a.dateTime).format('DD/MM/YYYY hh:mm:ss').valueOf();
  //   //return parseFloat(b.temperature)-parseFloat(a.temperature)
  // });
  let data_history_json_sort = sortBy(data_history_json, { prop: "dateTime" });
  console.log("Sorted History Array");
  console.log(data_history_json_sort);

  const container_coordinates = [data_payload.Latitude, data_payload.Longitude]

  return (
    <Page pageTitle={intl.formatMessage({ id: 'locales_container' })}>

      <Scrollbar
        style={{ height: '100%', width: '100%', display: 'flex', flex: 1, alignItems: 'center', justify: 'center' }}
      >
        <Alert severity="info">This Page is still under construction and may contain unexpected behaviour.</Alert>
        <Typography variant="h3" component="h2" color="primary" style={{ marginTop: 30, marginLeft: 30 }}>
          Container #{id}
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
                    Container Details for {data_payload.container}:
                  </Typography>

                  <Grid container spacing={3} style={{ marginTop: 30 }}>
                    <Grid item style={{justifyContent: "center", alignItems: "center"}}>
                      <ShareLocationIcon color="primary" sx={{ fontSize: 40 }} />
                    </Grid>
                    <Grid item xs>
                      <Typography gutterBottom variant="h6">
                        Departure Details:
                      </Typography>
                      <Link href="https://www.google.de/maps/place/53%C2%B031'48.2%22N+9%C2%B055'10.5%22E/@53.5335427,9.9161086,13z/data=!4m6!3m5!1s0x0:0x0!7e2!8m2!3d53.5300583!4d9.9195947" variant="subtitle1" color="textSecondary" target="_blank">
                        {data_payload.departure}, at {data_payload.departure_time} {data_payload.timezone}
                      </Link>
                    </Grid>
                  </Grid>

                  <Divider light style={{ marginTop: 30, marginBottom: 20 }}/>

                  <Grid container spacing={3} style={{ marginTop: 30 }}>
                    <Grid item style={{justifyContent: "center", alignItems: "center"}}>
                      <ShareLocationIcon color="primary" sx={{ fontSize: 40 }} />
                    </Grid>
                    <Grid item xs>
                      <Typography gutterBottom variant="h6">
                        Arrival Details:
                      </Typography>
                      <Link href="https://www.google.de/maps/place/51%C2%B053'50.4%22N+4%C2%B025'44.8%22E/@51.9187671,4.3231057,10.62z/data=!4m6!3m5!1s0x0:0x0!7e2!8m2!3d51.8973283!4d4.4291207" variant="subtitle1" color="textSecondary" target="_blank">
                        {data_payload.arrival}, at {data_payload.arrival_time} {data_payload.timezone}
                      </Link>
                    </Grid>
                  </Grid>

                  <Divider light style={{ marginTop: 30, marginBottom: 20 }}/>

                  <Grid container spacing={3} style={{ marginTop: 30 }}>
                    <Grid item style={{justifyContent: "center", alignItems: "center"}}>
                      <OutboxIcon color="primary" sx={{ fontSize: 40 }} />
                    </Grid>
                    <Grid item xs>
                      <Typography gutterBottom variant="h6">
                        Content Details:
                      </Typography>
                      <Typography variant="subtitle1" color="textSecondary">
                        {data_payload.content}
                      </Typography>
                      <Typography variant="subtitle1" color="textSecondary">
                        {<AcUnitIcon sx={{ fontSize: 15 }} />} {data_payload.content_specifics}
                      </Typography>
                    </Grid>
                  </Grid>
                  
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={8}>
              <Card className={classes.root}>
                <CardContent>
                  <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                    Temperature and Humidity Data for {data_payload.container}:
                  </Typography>

                  <LineChart
                    width={1050}
                    height={250}
                    data={data_history_json}
                    syncId="anyId"
                    margin={{
                      top: 10,
                      right: 30,
                      left: 0,
                      bottom: 0,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="dateTime" />
                    <YAxis />
                    <Tooltip />
                    <ReferenceLine y={12} label="TEMP THRESHOLD" stroke="red" />
                    <Line type="monotone" dataKey="temperature" stroke="#8884d8" fill="#8884d8" />
                  </LineChart>

                  <LineChart
                    width={1050}
                    height={250}
                    data={data_history_json}
                    syncId="anyId"
                    margin={{
                      top: 10,
                      right: 30,
                      left: 0,
                      bottom: 0,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="dateTime" />
                    <YAxis />
                    <Tooltip />
                    <ReferenceLine y={70} label="HUMIDITY THRESHOLD" stroke="red" />
                    <Line type="monotone" dataKey="humidity" stroke="#82ca9d" fill="#82ca9d" />
                  </LineChart>

                  {/* <LineChart
                    width={1100}
                    height={350}
                    data={data_history_json}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <ReferenceLine yAxisId="left" y={12} label="TEMP THRESHOLD" stroke="#8884d8" />
                    <ReferenceLine yAxisId="right" y={70} label="HUMIDITY THRESHOLD" stroke="#82ca9d" />
                    <Line yAxisId="left" type="monotone" dataKey="temp" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line yAxisId="right" type="monotone" dataKey="hum" stroke="#82ca9d" />
                  </LineChart> */}
                  
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Grid container spacing={2}>

            <Grid item xs={12}>
              <Card className={classes.root}>
                <CardContent>
                  <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                    Current Location for {data_payload.container}:
                  </Typography>
                  <MapContainer center={container_coordinates} zoom={5} scrollWheelZoom={false} style={{ height: "300px" }}>
                    <TileLayer
                      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={container_coordinates}>
                      <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                      </Popup>
                    </Marker>
                  </MapContainer>
                  
                </CardContent>
              </Card>
            </Grid>

          </Grid>

          <Grid container spacing={2}>

            <Grid item xs={12}>
              <Card className={classes.root}>
                <CardContent>
                  <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                    Complete History of {data_payload.container}:
                  </Typography>

                  

                  <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Date and Time</TableCell>
                          <TableCell align="right">Temperature</TableCell>
                          <TableCell align="right">Humidity</TableCell>
                          <TableCell align="right">Latitude</TableCell>
                          <TableCell align="right">Longitude</TableCell>
                          <TableCell align="right">Status RPi</TableCell>
                          <TableCell align="right">Status DHT11</TableCell>
                          <TableCell align="right">Status GPS</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {data_history_json.map((data_history_json) => (
                          <TableRow key={data_history_json.dateTime}>
                            <TableCell component="th" scope="row">
                              {data_history_json.dateTime}
                            </TableCell>
                            <TableCell align="right">{data_history_json.temperature}</TableCell>
                            <TableCell align="right">{data_history_json.humidity}</TableCell>
                            <TableCell align="right">{data_history_json.latitude}</TableCell>
                            <TableCell align="right">{data_history_json.longitude}</TableCell>
                            <TableCell align="right" style={{ color: green[500] }}>{data_history_json.status_rpi}</TableCell>
                            <TableCell align="right" style={{ color: green[500] }}>{data_history_json.status_dht_11}</TableCell>
                            <TableCell align="right" style={{ color: green[500] }}>{data_history_json.status_gps}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  
                </CardContent>
              </Card>
            </Grid>

          </Grid>

        </Container>

      </Scrollbar>
    </Page>
  )
}
export default ContainerDetails

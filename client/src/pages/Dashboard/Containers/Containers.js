import Page from 'material-ui-shell/lib/containers/Page';
import React, { useRef } from 'react';
import clsx from 'clsx';
import Scrollbar from 'material-ui-shell/lib/components/Scrollbar/Scrollbar';
import { useIntl } from 'react-intl';

import { makeStyles } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';

import ContainerEntry from "./ContainerEntry";

import Grid from '@material-ui/core/Grid';

import { useSnackbar } from 'notistack'
import Alert from '@mui/material/Alert';

import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ClearIcon from '@material-ui/icons/Clear';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { useQuestions } from 'material-ui-shell/lib/providers/Dialogs/Question'

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import CircularProgress from '@material-ui/core/CircularProgress';
import { blue, green } from '@material-ui/core/colors';

import TextField from '@material-ui/core/TextField';

import Card from '@material-ui/core/Card';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

//import fetchIOTA from "../../../functions/fetchIOTA";
import fetchIOTAChrysalis from "../../../functions/fetchIOTA_Chrysalis";

// Icons and SVG Images
import ReceiptIcon from '@material-ui/icons/Receipt';
import BarChartIcon from '@material-ui/icons/BarChart';

// Store Things
var store = require('store');

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
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
});



const ContainerPage = () => {

  const intl = useIntl()

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const timer = React.useRef();

  const [containerName, setContainerName] = React.useState("");
  const containerNameRef = useRef();
  const [protocolType, setProtocolType] = React.useState("");
  const protocolTypeRef = useRef();
  const [containerTopic, setContainerTopic] = React.useState("");
  const containerTopicRef = useRef();
  const [containerTopicLength, setContainerTopicLength] = React.useState("");
  const [containerPassphrase, setContainerPassphrase] = React.useState("");
  const containerPassphraseRef = useRef();
  const [containerProtocoll, setContainerProtocoll] = React.useState("");

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  const handleClickOpen = () => {
    setOpen(true);
    setSuccess(false);
    setLoading(false);
  };

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const { enqueueSnackbar } = useSnackbar()

  const pullFAKEdata = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);

      // Random Data
      const min_temp = 3;
      const max_temp = 14;
      const min_hum = 40;
      const max_hum = 67;
      const min_lat = -90;
      const max_lat = 90;
      const min_lon = -180;
      const max_lon = 180;


      const fake_data = {
        sensorResult: "LogU_Result",
        temperature: min_temp + Math.random() * (max_temp - min_temp),
        humidity: min_hum + Math.random() * (max_hum - min_hum),
        timezone: "UTC",
        dateTime: "2021-09-17, 14:55:17",
        container: "MWBNB564534884a",
        departure: "HAM",
        departure_time: "2021-09-14, 08:33:47",
        arrival: "ROT",
        arrival_time: "2021-09-18, 18:00:54",
        content: "Lettuce",
        content_specifics: "freeze",
        Latitude: min_lat + Math.random() * (max_lat - min_lat),
        Longitude: min_lon + Math.random() * (max_lon - min_lon),
        temperature_sensor_error: "No Error"
      }

      const fake_history = []

      for (var i = 0; i < 10; i++) {
        fake_history[i] = { dateTime: i,
          temperature: min_temp + Math.random() * (max_temp - min_temp),
          humidity: min_hum + Math.random() * (max_hum - min_hum),
          Latitude: min_lat + Math.random() * (max_lat - min_lat),
          Longitude: min_lon + Math.random() * (max_lon - min_lon),
          status_rpi: "No Fake Errors",
          status_dht_11: "No Fake Errors",
          status_gps: "No Fake Errors"}
      }

      let containerCount = 0;
      try {
        containerCount = store.get("count").count;
      } catch(e) { store.set("count", { count: 0 }); }
      
      var containerID = "container" + containerCount;
      store.set(containerID, { count:containerCount, name:"Some fake Name", topic:"Some fake Topic", protocol:"Some fake Protocoll", payload:fake_data, passphrase:"none", history:fake_history})
      containerCount = containerCount + 1;
      store.set("count", { count:containerCount });

      enqueueSnackbar('Got the Data!', {
        variant: 'info',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
      })

      setSuccess(true);
      setLoading(false);
      setTimeout(() => { 
        handleClose();
      }, 5000) 
    }
    else {
      alert("This is not working somehow.");
      setSuccess(false);
      setLoading(false);
    }
  }

  const pullIOTAdata = () => {
      if (!loading) {
        setSuccess(false);
        setLoading(true);

        //setTimeout(() => {
        console.log('Doing some async stuff')

        //Do some stuff:
        // alert(containerNameRef.current.value)
        // setContainerName(containerNameRef.current.value)
        // setContainerAddress(containerAddressRef.current.value)
        // setContainerPassphrase(containerPassphraseRef.current.value)
        // setContainerAddressLength(containerAddressRef.current.value.length)
        // alert(containerAddress)

        let protocol = protocolTypeRef.current.value;
        // Set the container topic from INPUT
        let topic = containerTopicRef.current.value;
        // Get the topic length from topic INPUT for protocoll detection
        let topic_length = containerTopicRef.current.value.length;
        // Set Passphrase for the container from INPUT
        let passphrase = containerPassphraseRef.current.value;
        // Set ContainerName from INPUT
        let containerName = containerNameRef.current.value;

        if (topic_length > 5) {

          
          try {

            // Container Count one up 
            let containerCount = 0;
            try {
              containerCount = store.get("count").count;
            } catch(e) { store.set("count", { count: 0 }); }
            
    
            setContainerProtocoll("iota")
            //alert("Detected IOTA Protocoll - will fetch data.");
            store.set("container" + containerCount, { count:containerCount, name:containerName, topic:topic, protocol:protocol, payload:"none", passphrase:passphrase, history:"none" }); // Set all the important information for the current container to hand over to fetchIOTA()
            
            fetchIOTAChrysalis(); // Fetch the IOTA Payload and store it with the container information

            enqueueSnackbar('Got the IOTA Data!', {
              variant: 'info',
              anchorOrigin: {
                vertical: 'top',
                horizontal: 'center',
              },
            })
            
            containerCount = containerCount + 1;
            store.set("count", { count:containerCount }) 

            setSuccess(true);
          } catch(e) {
            setSuccess(false); 
            enqueueSnackbar(e, {
              variant: 'error',
              anchorOrigin: {
                vertical: 'top',
                horizontal: 'center',
              },
            })
          }
          
          setLoading(false);
          setTimeout(() => { 
            handleClose();
          }, 4000) 
        }
        else {
          alert("No valid Topic or Protocoll found.");
          setSuccess(false);
          setLoading(false);
        }
        //}, 500)

        // timer.current = window.setTimeout(() => {
        //   setSuccess(true);
        //   setLoading(false); 

        //   setTimeout(() => {
        //     handleClose()
        //   }, 1000)      
             
        // }, 2000);
      }
  };

  const deleteAll = () => {
    store.clearAll();
    store.set("count", { count: 0 })
    window.location.reload(false);
  };

  const deleteContainers = () => {
    let containerCount = store.get("count").count;
    for (var i = 0; i <= containerCount; i++) {
      var remove_id = "container" + i;
      store.remove(remove_id);
    }
    store.set("count", { count: 0 });
    window.location.reload(false);
  };

  const actions = [
    { icon: <ClearIcon />, name: 'Delete the Store', click: deleteAll },
    { icon: <DeleteForeverIcon />, name: 'Delete All Containers', click: deleteContainers },
    { icon: <AddIcon />, name: 'Add Container', click: handleClickOpen },
  ];

  return (
    <Page pageTitle={intl.formatMessage({ id: 'locales_container' })}>

        <SpeedDial
          ariaLabel="SpeedDial basic example"
          sx={{ position: 'absolute', bottom: 30, right: 30, }}
          icon={<SpeedDialIcon />}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={action.click}
            />
          ))}
        </SpeedDial>

        <Dialog open={open} onClose={handleClose} aria-labelledby="dialog-add-container">
          <DialogTitle id="form-add-container-title">
            {intl.formatMessage({
              id: 'locales_add_fab_title',
              defaultMessage: 'Add Container',
            })}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {intl.formatMessage({
                id: 'locales_add_fab_description',
                defaultMessage: 'Add a new Container',
              })}
            </DialogContentText>
            
            <TextField
              autoFocus
              margin="dense"
              id="containerName"
              label="Container Name"
              inputRef={containerNameRef}
              type="text"
              fullWidth
            />
            <FormControl variant="standard" fullWidth>
              <InputLabel id="protocolType-label">Blockchain Protocol</InputLabel>
              <Select
                labelId="protocolType-label"
                id="protocolType"
                inputRef={protocolTypeRef}
                label="Protocol"
                fullWidth
              >
                <MenuItem value={"https://chrysalis-nodes.iota.org"} fullWidth>IOTA Mainnet</MenuItem>
                <MenuItem value={"https://api.lb-0.testnet.chrysalis2.com"} fullWidth>IOTA Testnet</MenuItem>
              </Select>
            </FormControl>
            <TextField
              margin="dense"
              id="containerTopic"
              label="Container Topic"
              inputRef={containerTopicRef}
              type="text"
              fullWidth
            />
            <TextField
              margin="dense"
              id="containerPassphrase"
              label="Container Passphrase"
              inputRef={containerPassphraseRef}
              type="text"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={pullFAKEdata} color="error">
              {intl.formatMessage({
                id: 'locales_add_fab_dummy_data',
                defaultMessage: 'Dummy Data',
              })}
            </Button>
            <Button onClick={handleClose} color="error">
              {intl.formatMessage({
                id: 'locales_add_fab_cancel',
                defaultMessage: 'Cancel',
              })}
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={buttonClassname}
              disabled={loading}
              onClick={pullIOTAdata}
            >
              {intl.formatMessage({
                id: 'locales_add_fab_add',
                defaultMessage: 'Add',
              })}
            </Button>
            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
          </DialogActions>
        </Dialog>

      <Scrollbar
        style={{ height: '100%', width: '100%', display: 'flex', flex: 1, alignItems: 'center', justify: 'center' }}
      >
        <Alert severity="info">This Page is still under construction and may contain unexpected behaviour.</Alert>
        <Typography variant="h3" component="h2" color="primary" style={{ marginTop: 30, marginLeft: 30 }}>
          {intl.formatMessage({ id: 'locales_container_header' })}
        </Typography>

        <Typography variant="h6" color="textSecondary" style={{ marginLeft: 30, marginBottom: 20 }}>
          {intl.formatMessage({ id: 'locales_container_subtitle' })}
        </Typography>
        

        <Container maxWidth="xl">

          {store.get("container0") ? <ContainerEntry store_id="0"></ContainerEntry> :
            <Typography variant="h6" color="textSecondary" style={{ marginTop: 100, textAlign: 'center' }}>
              {intl.formatMessage({ id: 'locales_no_container_display' })}
            </Typography> }

          {store.get("container1") ? <ContainerEntry store_id="1"></ContainerEntry> : null}

          {store.get("container2") ? <ContainerEntry store_id="2"></ContainerEntry> : null}

          {store.get("container3") ? <ContainerEntry store_id="3"></ContainerEntry> : null}

        </Container>

      </Scrollbar>
    </Page>
  )
}
export default ContainerPage

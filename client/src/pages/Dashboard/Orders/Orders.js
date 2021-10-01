import Page from 'material-ui-shell/lib/containers/Page';
import React, { useRef } from 'react';
import clsx from 'clsx';
import Scrollbar from 'material-ui-shell/lib/components/Scrollbar/Scrollbar';
import { useIntl } from 'react-intl';

import { makeStyles } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';

import OrderEntry from "./OrderEntry";

import Alert from '@mui/material/Alert';

import Grid from '@material-ui/core/Grid';

import { useSnackbar } from 'notistack'

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

const OrdersPage = () => {
  const intl = useIntl()

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const timer = React.useRef();

  const [orderName, setOrderName] = React.useState("");
  const orderNameRef = useRef();
  const [orderRef, setOrderRef] = React.useState("");
  const orderRefRef = useRef();
  const [assignedContainer, setAssignedContainer] = React.useState("");
  const assignedContainerRef = useRef();

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

  const createOrder = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);

      // Get Order Data
      let orderName = orderNameRef.current.value;
      let orderRef = orderRefRef.current.value;
      let assignedContainer = assignedContainerRef.current.value;

      let orderCount = 0;
      try {
        orderCount = store.get("orderCount").count;
      } catch(e) { store.set("orderCount", { count: 0 }); }
      
      var orderID = "order" + orderCount;
      store.set(orderID, { count:orderCount, name:orderName, reference:orderRef, assignedContainer:assignedContainer })
      orderCount = orderCount + 1;
      store.set("orderCount", { count:orderCount });

      enqueueSnackbar('Order created!', {
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
      }, 1000) 
    }
    else {
      alert("This is not working somehow.");
      setSuccess(false);
      setLoading(false);
    }
    }

    const deleteAll = () => {
      store.clearAll();
      store.set("orderCount", { count: 0 })
      window.location.reload(false);
    };
  
    const deleteOrders = () => {
      let orderCount = store.get("orderCount").count;
      for (var i = 0; i <= orderCount; i++) {
        var remove_id = "order" + i;
        store.remove(remove_id);
      }
      store.set("orderCount", { count: 0 });
      window.location.reload(false);
    };
  
    const actions = [
      { icon: <ClearIcon />, name: 'Delete the Store', click: deleteAll },
      { icon: <DeleteForeverIcon />, name: 'Delete All Orders', click: deleteOrders },
      { icon: <AddIcon />, name: 'Create new Order', click: handleClickOpen },
    ];

  return (
    <Page pageTitle={intl.formatMessage({ id: 'locales_orders' })}>

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
            defaultMessage: 'Create a new Order',
          })}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {intl.formatMessage({
              id: 'locales_add_fab_description',
              defaultMessage: 'Create a new Order',
            })}
          </DialogContentText>
          
          <TextField
            autoFocus
            margin="dense"
            id="containerName"
            label="Order Name"
            inputRef={orderNameRef}
            type="text"
            fullWidth
          />
          <TextField
            margin="dense"
            id="containerTopic"
            label="Order Reference"
            inputRef={orderRefRef}
            type="text"
            fullWidth
          />

          <FormControl variant="standard" fullWidth>
            <InputLabel id="assignedContainer-label">Assigned Container</InputLabel>
            <Select
              labelId="assignedContainer-label"
              id="assignedContainer"
              inputRef={assignedContainerRef}
              label="Assigned Container"
              fullWidth
            >
              <MenuItem value={"container0"} fullWidth>Container#0</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
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
            onClick={createOrder}
          >
            {intl.formatMessage({
              id: 'locales_add_fab_add',
              defaultMessage: 'Create Order',
            })}
          </Button>
          {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
        </DialogActions>
      </Dialog>

      <Scrollbar
        style={{ height: '100%', width: '100%', display: 'flex', flex: 1 }}
      >
        <Alert severity="info">This Page is still under construction and may contain unexpected behaviour.</Alert>
        <Typography variant="h3" component="h2" color="primary" style={{ marginTop: 30, marginLeft: 30 }}>
          {intl.formatMessage({ id: 'locales_orders_header' })}
        </Typography>

        <Typography variant="h6" color="textSecondary" style={{ marginLeft: 30, marginBottom: 20 }}>
          {intl.formatMessage({ id: 'locales_orders_subtitle' })}
        </Typography>

        <Container maxWidth="xl">

          {store.get("order0") ? <OrderEntry store_id="0"></OrderEntry> :
            <Typography variant="h6" color="textSecondary" style={{ marginTop: 100, textAlign: 'center' }}>
              No Orders have been added
            </Typography> }

          {store.get("order1") ? <OrderEntry store_id="1"></OrderEntry> : null}

          {store.get("order2") ? <OrderEntry store_id="2"></OrderEntry> : null}

          {store.get("order3") ? <OrderEntry store_id="3"></OrderEntry> : null}

        </Container>
      </Scrollbar>
    </Page>
  )
}
export default OrdersPage

import React, { useCallback } from 'react'
import {useHistory} from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';

import { useSnackbar } from 'notistack'

import Grid from '@material-ui/core/Grid';

import Button from '@material-ui/core/Button';
import { blue, green } from '@material-ui/core/colors';

import Card from '@material-ui/core/Card';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

// Icons and SVG Images
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import BarChartIcon from '@material-ui/icons/BarChart';
import { VariableSizeList } from 'react-window';

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
});

function OrderEntry(props) {
  const classes = useStyles();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar()
  var data_id = 0
  var data_source = 0
  var data_count = 0
  var data_name = 0
  var data_reference = 0
  var data_assignedContainer = 0
  try {
    
    let data_id = props.store_id;
    let data_source = "order" + data_id;
    data_count = store.get(data_source).count
    data_name = store.get(data_source).name
    data_reference = store.get(data_source).reference
    data_assignedContainer = store.get(data_source).assignedContainer

  } catch(e) {
    enqueueSnackbar('No Data behind payload ' + data_source, {
      variant: 'error',
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'center',
      },
    })
    store.remove("order" + data_source);
  }

  /* const moreClick = () => {
    alert("MORE");
  }; */

  const moreClick = useCallback(() => history.push("/orders/" + data_id), [history]);

    return (
        <Card className={classes.root}>
            <CardContent>

              <Grid container spacing={2}>
                
                <Grid item style={{justifyContent: "center", alignItems: "center"}}>
                  <img
                    src={'/order.svg'}
                    alt="Order Icon"
                    style={{ height: 50, maxWidth: 50, justifySelf: 'center', justifyContent: "center" }}
                  />
                </Grid>

                <Grid item xs={12} sm container spacing={3}>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <Typography gutterBottom variant="subtitle1">
                        {"Order #" + data_count}
                      </Typography>
                      <Typography variant="h4" gutterBottom>
                      {data_name}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <Typography gutterBottom variant="subtitle1">
                        Order Reference
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {data_reference}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid item spacing={2}>
                    <Grid item xs>
                      <Typography variant="body2" gutterBottom>
                        Assigned Containers
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {data_assignedContainer}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Divider light style={{ marginTop: 30, marginBottom: 20 }}/>
              <Chip label="Container Connected" icon={<CheckBoxIcon style={{ color: green[500] }} />} className={classes.chip}/>
              <Chip label="Sensor Online" icon={<BarChartIcon style={{ color: green[500] }}/>} className={classes.chip}/>
              <Button variant="outlined" color="primary" style={{ float: "right" }} className={classes.chip} onClick={moreClick}>
                More
              </Button>
            </CardContent>
          
          </Card>
    );
}

export default OrderEntry;
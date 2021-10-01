import Page from 'material-ui-shell/lib/containers/Page'
import React from 'react'
import Scrollbar from 'material-ui-shell/lib/components/Scrollbar/Scrollbar'
import { useIntl } from 'react-intl'

import { useParams } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';

import { blue, green } from '@material-ui/core/colors';

import Container from '@material-ui/core/Container';

import Link from '@mui/material/Link';

import Card from '@material-ui/core/Card';
import Chip from '@material-ui/core/Chip';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import CodeIcon from '@mui/icons-material/Code';
import LinkIcon from '@mui/icons-material/Link';
import SubjectIcon from '@mui/icons-material/Subject';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

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

const AboutPage = () => {
  const intl = useIntl()
  const classes = useStyles();

  return (
    <Page pageTitle={intl.formatMessage({ id: 'locales_about' })}>
      <Scrollbar
        style={{ height: '100%', width: '100%', display: 'flex', flex: 1 }}
      >
        <Typography variant="h3" component="h2" color="primary" style={{ marginTop: 30, marginLeft: 30 }}>
          {intl.formatMessage({ id: 'locales_about_header' })}
        </Typography>

        <Typography variant="h6" color="textSecondary" style={{ marginLeft: 30, marginBottom: 20 }}>
          {intl.formatMessage({ id: 'locales_about_subtitle' })}
        </Typography>

        <Container maxWidth="xl">

          <Grid container spacing={2}>

            <Grid item xs={12} md={4}>
              <Card className={classes.root}>
                <CardContent>
                  <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                    About the Author:
                  </Typography> 
                  <Grid container spacing={3} style={{ marginTop: 30 }}>
                    <Grid item style={{justifyContent: "center", alignItems: "center"}}>
                      <img
                        src={'/profile.png'}
                        alt="Jonas Wilinski Profile"
                        style={{ height: 200, maxWidth: 200, justifySelf: 'center', justifyContent: "center" }}
                      />   
                    </Grid>
                    <Grid item xs>
                      <Typography gutterBottom variant="h6">
                        Jonas Wilinski, B. Sc.
                      </Typography>
                      <Divider light style={{ marginTop: 30, marginBottom: 20 }}/>
                      <Link href="mailto:jonas.wilinski@tuhh.de" variant="subtitle1" color="textSecondary">
                        jonas.wilinski@tuhh.de
                      </Link>
                    </Grid>
                  </Grid>           
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={8}>
              <Card className={classes.root}>
                <CardContent>
                  <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                  This Application "LogU Blockchain Explorer" was designed in the course of my Masters Thesis to develop an End-to-End system for tracking goods on a supply chain using public blockchain platforms. It features access to the IOTA Mainnet and Devnet Tangle and can pull data from a custom made sensor node. Moreover, it has crypto.js implemented and can decrpyt given sensor data payloads with a given passphrase. More features like deep MetaMask integration and asymmetric encryption are coming in the future.
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                    If you have any comments or found bugs in my system, please reach out to me.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Grid container spacing={2}>

            <Grid item xs={12} md={12}>
              <Card className={classes.root}>
                <CardContent>
                  <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                    Further Links:
                  </Typography>      
                  <List>
                    <ListItem disablePadding>
                      <ListItemButton component="a" href="https://collaborating.tuhh.de/ccf1228/masterthesis_jwilinski" target="_blank">
                        <ListItemIcon>
                          <CodeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Gitlab TUHH" />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton component="a" href="https://collaborating.tuhh.de/ccf1228/masterthesis_jwilinski/-/wikis/home" target="_blank">
                        <ListItemIcon>
                          <SubjectIcon />
                        </ListItemIcon>
                        <ListItemText primary="Documentations @ Gitlab TUHH (Coming Soon)" />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton component="a" href="https://www.iota.org/" target="_blank">
                        <ListItemIcon>
                          <LinkIcon />
                        </ListItemIcon>
                        <ListItemText primary="Official IOTA Website" />
                      </ListItemButton>
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

        </Container>

      </Scrollbar>
    </Page>
  )
}
export default AboutPage

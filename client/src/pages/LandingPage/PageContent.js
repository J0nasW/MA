import React from 'react'
//import { useIntl } from 'react-intl'
import {
  CheckCircleOutline as CheckCircleOutlineIcon,
  InsertChartOutlinedOutlined,
  FileCopy } from '@material-ui/icons';
import {
  Tooltip,
  Typography,
  Card,
  CardContent,
  IconButton,
  Button } from '@material-ui/core'
import {
  withStyles,
  lighten,
  darken } from '@material-ui/core/styles'

  const LightTooltip = withStyles((theme) => {
  const getBackgroundColor = theme.palette.type === 'light' ? lighten : darken;
  return {
tooltip: {
  ...theme.typography.body2,
  borderRadius: theme.shape.borderRadius,
  display: 'flex',
  padding: '6px 10px',
  backgroundColor: getBackgroundColor(theme.palette.success.main, 0.1),
}
}})(Tooltip);

const PackageCard = ({ title, command, description, icons }) => {
  //const intl = useIntl()
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false);
  };
  

  return (
    <Card elevation={4} style={{ margin: 18, maxWidth: 350 }}>
      <CardContent>
        {icons}
        <br />
        <Typography gutterBottom variant="h4" component="h2">
          {title}
        </Typography>
        <br />
        <Typography variant="body2" component="div">
          {description}
        </Typography>
      </CardContent>
    </Card>
  )
}

const PageContent = ({ setComponents }) => {
  //const intl = useIntl()
  return (
    <React.Fragment>
      <div style={{ height: 20 }} />
      <Typography
        variant="h3"
        //color="textSecondary"
        style={{ margin: 16, textAlign: 'center' }}
      >
        Choose from lots of different Blockchain Frameworks
      </Typography>
      <Typography
        variant="h5"
        component="div"
        color="textSecondary"
        style={{ margin: 16, textAlign: 'center' }}
      >
        The LogU Blockchain Explorer assists you with data analysis and difficult decisions.
      </Typography>
      <div style={{ height: 30 }} />

      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'space-around',
          flexWrap: 'wrap',
          textAlign: 'center'
        }}
      >
        <PackageCard
          title={'IOTA'}
          description={
            'IOTA serves as the standard Blockchain-Framework for IoT Devices. With the LogU Blockchain Explorer, you can easily analyze the IOTA tangle and extract your assets.'
          }
          icons={
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-around',
              }}
            >
              <img
                src="iota.svg"
                alt="iota"
                style={{ height: 140, aspectRatio: 1.11 }}
              />
            </div>
          }
        />
        <PackageCard
          title={'Ethereum'}
          description={
            'Ethereum will be the next Blockchain-Framework for the LogU Blockchain Explorer. If you have any suggestions on how to implement functions and tools, feel free to write to us.'
          }
          icons={
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-around',
              }}
            >
              <img
                src="ethereum.svg"
                alt="ethereum"
                style={{ height: 140, aspectRatio: 1.11 }}
              />
            </div>
          }
        />
        <PackageCard
          title={'More to come...'}
          description={'We are still at the beginning of development. New Blockchain-Frameworks will be added soon!'}
          icons={
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-around',
              }}
            >
              <img
                src="blockchain.svg"
                alt="blockchain"
                style={{ width: 140, aspectRatio: 1.11 }}
              />
            </div>
          }
        />
      </div>
      <div style={{ height: 30 }} />
      <div
        ref={(r) => {
          if (r) {
            setComponents(r)
          }
        }}
        style={{
          //height: 400,
          backgroundColor: '#2D2D2D',
          backgroundImage: 'radial-gradient( #4F4F4F,#242424)',
        }}
      >
        <div style={{ height: 30 }} />
        <Typography
          variant="h3"
          //color="textSecondary"
          style={{ margin: 16, textAlign: 'center', color: 'white' }}
        >
          Not just a simple Blockchain Explorer.
        </Typography>
        <Typography
          variant="h5"
          component="div"
          style={{ margin: 16, textAlign: 'center', color: 'grey' }}
        >
          The LogU Blockchain Explorer takes Business Insights onto a new level.
        </Typography>
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <InsertChartOutlinedOutlined style={{ fontSize: 150, color: 'white' }} />
        </div>
        <Typography
          variant="h5"
          component="div"
          style={{ margin: 16, textAlign: 'center', color: 'grey' }}
        >
          With advanced analytics and encryption technology, you will be able to track everything from cold chains to digital twins of rare earths. 
        </Typography>
        <div style={{ height: 50 }} />
      </div>

      <div style={{ height: 30 }} />
      <Typography
        variant="h3"
        //color="textSecondary"
        style={{ margin: 16, textAlign: 'center' }}
      >
        Still in Development
      </Typography>
      <Typography
        variant="h5"
        component="div"
        color="textSecondary"
        style={{ margin: 16, textAlign: 'center' }}
      >
        We are still figuring out some essential processes and components. So please be patient. We will inform you about any changes.
      </Typography>
      <div style={{ height: 30 }} />
    </React.Fragment>
  )
}

export default PageContent

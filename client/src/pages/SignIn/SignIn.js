import Button from '@material-ui/core/Button'
import Page from 'material-ui-shell/lib/containers/Page'
import Paper from '@material-ui/core/Paper'
import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { useAuth } from 'base-shell/lib/providers/Auth'
import { useHistory } from 'react-router-dom'
import { useIntl } from 'react-intl'
import { useMenu } from 'material-ui-shell/lib/providers/Menu'

//import MetaMaskIcon from '../../../public/metamask.svg';

//Web3 Stuff
import Web3 from 'web3';
let web3:Web3

const useStyles = makeStyles((theme) => ({
  paper: {
    width: 'auto',
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(620 + theme.spacing(6))]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(
      3
    )}px`,
  },
  avatar: {
    margin: theme.spacing(1),
    width: 192,
    height: 192,
    color: theme.palette.secondary.main,
  },
  form: {
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 1),
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: `100%`,
  },
}))

const SignIn = () => {
  const classes = useStyles()
  const intl = useIntl()
  const history = useHistory()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { toggleThis } = useMenu()
  const { setAuth } = useAuth()

  function handleSubmit(event) {
    event.preventDefault()
    authenticate({
      displayName: 'User',
      email: username,
    })
  }

  const authenticate = (user) => {
    setAuth({ isAuthenticated: true, ...user })
    toggleThis('isAuthMenuOpen', false)

    // let _location = history.location
    let _route = '/home'

    history.push(_route)

    // if (_location.state && _location.state.from) {
    //   _route = _location.state.from.pathname
    //   history.push(_route)
    // } else {
    //   history.push(_route)
    // }
  }


  // METAMASK LOGIN PART


  const [loading, setLoading] = useState(false); // Loading button state

	const handleAuthenticate = ({
		publicAddress,
		signature,
	}) =>
		fetch("http://localhost:8000/api/auth", {
			body: JSON.stringify({ publicAddress, signature }),
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'POST',
		}).then((response) => response.json())
    .then(authenticate({
      displayName: 'MetaMask User',
      email: publicAddress.substring(0, 20) + '...'
      ,
    }));

	const handleSignMessage = async ({
		publicAddress,
		nonce,
	}) => {
		try {
			const signature = await web3.eth.personal.sign(
				`I am signing my one-time nonce: ${nonce}`,
				publicAddress,
				'' // MetaMask will ignore the password argument here
			);

			return { publicAddress, signature };
		} catch (err) {
			throw new Error(
				'You need to sign the message to be able to log in.'
			);
		}
	};


  const handleSignup = (publicAddress) =>
		fetch("http://localhost:8000/api/users", {
			body: JSON.stringify({ publicAddress }),
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'POST',
		}).then((response) => response.json());


  const authenticate_metamask = async () => {
		// Check if MetaMask is installed
		if (!(window).ethereum) {
			window.alert('Please install MetaMask first.');
			return;
		}

		if (!web3) {
			try {
				// Request account access if needed
				await (window).ethereum.enable();

				// We don't know window.web3 version, so we use our own instance of Web3
				// with the injected provider given by MetaMask
				web3 = new Web3((window).ethereum);
			} catch (error) {
				window.alert('You need to allow MetaMask.');
				return;
			}
		}

    const coinbase = await web3.eth.getCoinbase();
		if (!coinbase) {
			window.alert('Please activate MetaMask first.');
			return;
		}

		const publicAddress = coinbase.toLowerCase();
		setLoading(true);

		// Look if user with current publicAddress is already present on backend
		fetch(
			`http://localhost:8000/api/users?publicAddress=${publicAddress}`
		)
			.then((response) => response.json())
			// If yes, retrieve it. If no, create it.
			.then((users) =>
				users.length ? users[0] : handleSignup(publicAddress)
			)
			// Popup MetaMask confirmation modal to sign message
			.then(handleSignMessage)
			// Send signature to backend on the /auth route
			.then(handleAuthenticate)
			// Pass accessToken back to parent component (to save it in localStorage)
			//.then(onLoggedIn)
			.catch((err) => {
				window.alert(err);
				setLoading(false);
			});

      
  }


  // END OF METAMASK LOGIN STUFF


  return (
    <Page pageTitle={intl.formatMessage({ id: 'sign_in' })}>
      <Paper className={classes.paper} elevation={6}>
        <div className={classes.container}>
          <Typography component="h1" variant="h5">
            {intl.formatMessage({ id: 'sign_in' })}
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              value={username}
              onInput={(e) => setUsername(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label={intl.formatMessage({ id: 'username' })}
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              value={password}
              onInput={(e) => setPassword(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label={intl.formatMessage({ id: 'password' })}
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {intl.formatMessage({ id: 'sign_in' })}
            </Button>
          </form>

          <Button
            type="link"
            fullWidth
            variant="contained"
            //color="#FF7000"
            startIcon={<img
              src={'/metamask.svg'}
              alt="metamask"
              style={{ height: 30, maxWidth: 30, justifySelf: 'center' }}
            />}
            onClick={authenticate_metamask}
          >
            {intl.formatMessage({ id: 'metamask_button' })}
          </Button>

          <div style={{ height: 20 }} />

          <Button
            type="link"
            fullWidth
            variant="contained"
            //color="#D9D9D9"
            onClick={() => { history.push('/') }}
          >
            {intl.formatMessage({ id: 'back_landingpage' })}
          </Button>

          <div style={{ height: 10 }} />

          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
            }}
          >
            <Link to="/password_reset">
              {intl.formatMessage({ id: 'forgot_password' })}?
            </Link>
            <Link to="/signup">
              {intl.formatMessage({ id: 'registration' })}
            </Link>
          </div>
        </div>
      </Paper>
    </Page>
  )
}

export default SignIn

import React, { useState, lazy, Suspense } from 'react'
import AppBar from '@material-ui/core/AppBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import { Helmet } from 'react-helmet'
import Paper from '@material-ui/core/Paper'
import { Scrollbars } from 'react-custom-scrollbars'
import Toolbar from '@material-ui/core/Toolbar'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'
import { useHistory } from 'react-router-dom'
import { useTheme as useAppTheme } from 'material-ui-shell/lib/providers/Theme'
// Languages
//import { useIntl } from 'react-intl'
//import { useLocale } from 'base-shell/lib/providers/Locale'
const PageContent = lazy(() => import('./PageContent'))
const Footer = lazy(() => import('./Footer'))
const ResponsiveMenu = lazy(() =>
  import('rmw-shell/lib/containers/ResponsiveMenu')
)


const theme = createMuiTheme({
  palette: {
    primary: { main: '#242424' },
    secondary: {
      main: '#c62828',
    },
  },
  typography: {
    fontFamily: [
      'Poppins',
      'sans-serif',
    ].join(','),
 }
})

const LandingPage = () => {
  const [scrollbar, setScrollbar] = useState(null)
  const [transparent, setTransparent] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const [components, setComponents] = useState(null)
  const [top, setTop] = useState(null)
  const history = useHistory()
  const { isRTL } = useAppTheme()

  //const intl = useIntl()

  const scrollTo = (e) => {
    e &&
      e.scrollIntoView({
        behavior: 'smooth',
        alignToTop: true,
      })
  }

  const sections = [
    {
      name: 'Sign-In',
      onClick: () => history.push('/home'),
    },
    {
      name: 'components',
      onClick: () => {
        setScrolled(true)
        setTimeout(() => {
          scrollTo(components)
        }, 500)
      },
    },
  ]

  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <CssBaseline />
        <Helmet>
          <meta charset="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, minimum-scale=1, minimal-ui"
          />
          <link rel="shortcut icon" href="/favicon.ico" />
          <meta
            name="keywords"
            content={
              'logu,blockchainexplorer,iota,ethereum'
            }
          />
          <meta
            name="description"
            content={
              'The LogU Blockchain Explorer. Taking Blockchain beyond Supply Chain Management'
            }
          />

          <title>LogU Blockchain Explorer</title>
        </Helmet>
        <Scrollbars
          ref={(e) => {
            if (e !== null) {
              setScrollbar(e)
            }
          }}
          renderView={props => (
            isRTL ? <div {...props} style={{
              ...props.style,
              marginLeft: props.style.marginRight,
              marginRight: 0, }} /> : <div {...props} style={{
                ...props.style,}} />
          )}
          onScroll={(e) => {
            setTransparent(scrollbar.viewScrollTop < 100)
            setScrolled(true)
          }}
          autoHide
          style={{ width: '100%', height: '100vh' }}
        > 
          <AppBar
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              backgroundColor: transparent ? 'transparent' : undefined,
              boxShadow: transparent ? 'none' : undefined,
              transition: 'background 1s',
            }}
            position="static"
          >
            <Toolbar disableGutters>
              <div
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  scrollTo(top)
                }}
              >
                <img
                  src={'/be_logo_w.svg'}
                  alt="logo"
                  style={{
                    height: 50,
                    justifySelf: 'center',
                    color: 'white',
                    marginLeft: 12,
                    display: transparent ? 'none' : undefined,
                  }}
                />
              </div>
              <div style={{ flex: 1 }} />

              <Suspense fallback={<CircularProgress />}>
                <ResponsiveMenu sections={sections} />
              </Suspense>
            </Toolbar>
          </AppBar>
          <div style={{ width: '100%', height: '100%' }}>
            <div
              ref={(r) => r && setTop(r)}
              style={{
                height: '100vh',
                width: '100%',
                //backgroundColor: 'grey',
                backgroundImage: 'url(/background_2.jpg)',
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'fixed',
                backgroundSize: 'cover',
                display: 'flex',
                justifyContent: 'center',
                minHeight: 600,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                }}
              >
                <img
                  src={'/be_logo_color.svg'}
                  alt="logo"
                  style={{ height: 300, maxWidth: 240, justifySelf: 'center' }}
                />

                <div style={{ padding: 8 }}>
                  <h3
                    style={{
                      color: 'white',
                      textAlign: 'center',
                      fontWeight: 'bold',
                      fontSize: 50,
                    }}
                  >
                    LogU Blockchain Explorer
                  </h3>

                  <h4
                    style={{
                      color: 'white',
                      textAlign: 'center',
                      fontSize: 25,
                      marginTop: -40,
                    }}
                  >
                    One Place to Track all of your Assets
                  </h4>
                </div>
              </div>
            </div>
            <div
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: -80,
              }}
            >
              <Paper
                elevation={3}
                style={{
                  width: '100%',
                  maxWidth: '90%',
                  borderRadius: 15,
                  minHeight: 400,
                }}
              >
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: -50,
                  }}
                >
                  <Button
                    size="large"
                    style={{
                      margin: 30,
                      borderRadius: '40px',
                      fontSize: 'bold',
                    }}
                    aria-label="Start button"
                    variant="contained"
                    color="secondary"
                    name={'signin'}
                    onClick={() => {
                      history.push('/home')
                    }}
                  >
                    Dashboard
                  </Button>
                </div>
                {scrolled && (
                  <Suspense fallback={<CircularProgress />}>
                    <PageContent setComponents={setComponents} />
                  </Suspense>
                )}
              </Paper>
            </div>
            <div style={{ height: 200 }}></div>
            {scrolled && (
              <Suspense fallback={<CircularProgress />}>
                <Footer />
              </Suspense>
            )}
          </div>
        </Scrollbars>
      </React.Fragment>
    </ThemeProvider>
  )
}

export default LandingPage
